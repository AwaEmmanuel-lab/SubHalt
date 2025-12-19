import User from "../Models/user.model.js"
import jwt from "jsonwebtoken"

const gettoken = (userId) =>{
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"})
}


const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({error: "All fields must be filled"})
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const isMatch = await user.comparepassword(password)

        if(!isMatch){
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = gettoken(user._id)

        res.status(200).json({message: "Login Successful",
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            }
        })
    } catch (error) {
        console.log("Error login in ", error)
        return res.status(500).json({message: "internal server error"})
    }
}

export default login