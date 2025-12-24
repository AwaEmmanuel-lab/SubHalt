import jwt from "jsonwebtoken"
import User from "../Models/user.model.js";


const authorize = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization')
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        req.user = user
        next()

    } catch (error) {
        console.log("error verifying the token", error.message)
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({message: "Invalid token"})
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({message: "Token expired"})
        }
        return res.status(500).json({message: "Error verifying token", error: error.message})
    }
}

export default authorize