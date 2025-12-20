import express from "express"
import jwt from "jsonwebtoken"
import User from "../Models/user.model.js"
import authorize from "../Middleware/auth.middleware.js"
import fillsub from "../Controller/fillsub.js"
import Subscription from "../Models/subscription.model.js"
import cron from 'cron'

const getsub =  async (req, res) => {
    try {
        const userId = req.user._id

        const sub = await Subscription.find({user: userId}).sort({createdAt: -1}).populate("user", "username")

        if(sub.length === 0){
            return res.status(404).json({message: "No subscription found"})
        }
        
        return res.status(200).json({sub:sub})
        
    } catch (error) {
        console.log("Error getiing Subscription")
        return res.status(500).json({message: "Error getting Subscription"})
    }
}


export default getsub