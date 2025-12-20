import express from "express"
import jwt from "jsonwebtoken"
import User from "../Models/user.model.js"
import authorize from "../Middleware/auth.middleware.js"
import fillsub from "../Controller/fillsub.js"
import Subscription from "../Models/subscription.model.js"
import cron from 'cron'



const deletesub = async (req, res) => {

    try {
        const {id} = req.params
    
        const sub = await Subscription.findOneAndDelete({_id: id,user: req.user._id, })
    
        if(!sub){
            return res.status(404).json({
                message: "subscription not found"
            })
        }
    
        return res.status(200).json({message: "Deleted Successfully"})
    } catch (error) {
        console.log("Error Deleteing Subscription")
        return res.status(500).json({message: "Error Deleteing Subscription"})
    }

}

export default deletesub