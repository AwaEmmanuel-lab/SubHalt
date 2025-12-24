import mongoose, { Mongoose } from "mongoose";
import User from "../Models/user.model.js";

const subsciptionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true,
        min: 0
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required:true
    }
},{timestamps: true})

const Subscription  = mongoose.model("Subscription", subsciptionSchema)

export default Subscription