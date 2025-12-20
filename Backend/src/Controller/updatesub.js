import express from "express"
import jwt from "jsonwebtoken"
import User from "../Models/user.model.js"
import authorize from "../Middleware/auth.middleware.js"
import fillsub from "../Controller/fillsub.js"
import Subscription from "../Models/subscription.model.js"
import cron from 'cron'


const updatesub = async (req, res) => {
    try {
        
        const {id} = req.params
        const {name, url, startDate, endDate, amount} = req.body

        if(!url || !name || !startDate || !endDate || amount === undefined){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if(amount < 0){
            return res.status(400).json({
                message: "Amount cannot be less that Zero"
            })
        }

        const sub = await Subscription.findOneAndUpdate({
            _id:id, user: req.user._id
        },{
            name: name,
            url: url,
            amount: amount,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        },
        { new: true, runValidators: true }
    )

    if(!sub){
        return res.status(404).json({
            message:"Subscription not found"
        })
    }

    return res.status(200).json({
        message: "Update Successful",
        sub
    })

    } catch (error) {
        console.log("Error updating subscription", error)
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

export default updatesub