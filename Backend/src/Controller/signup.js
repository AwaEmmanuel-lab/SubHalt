import User from "../Models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import express from "express"

const gettoken = (userId) =>{
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"})
}

const signup = async (req,res) => {

    try {
        const {username, email, password} = req.body

    if(!username || !email ||!password){
        return res.status(400).json({error: "All fields required"})
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).json({error: "user already exist"})
    }

    if(password.length < 8){
        return res.status(400).json({error: "Password must be at least 8 characters"})
    }

     const hashedPassword = await bcrypt.hash(password, 10)

    const userData = {
        username: username,
        email: email,
        password: hashedPassword
    }

    const user = await User.create(userData);
    const token = gettoken(user._id)
    
    return res.status(201).json({
        message: "signup successful",
        token,
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt:user.createdAt
        }
    })
    } catch (error) {
        console.log("Error while signing up", error)
        res.status(500).json({message: "Internal server error"})
    }

    
}

export default signup