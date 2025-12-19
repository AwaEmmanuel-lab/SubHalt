import User from "../Models/user.model.js"
import Subscription from "../Models/subscription.model.js"

const fillsub =  async (req,res) => {
    try {
        const {name, url, startDate, endDate, amount} = req.body

        if(!url ||!startDate || !endDate || !amount || !name){
            return res.status(400).json({error: "All fields are required"})
        }

        if(amount < 0){
            res.status(201).json({
                error: "Amount cannot be less than 0"
            })
        }

        const formatedstartdate = new Date(startDate)
        const formatedenddate = new Date(endDate)

        const subdata = {
            user:req.user._id,
            name: name,
            url:url,
            startDate:formatedstartdate,
            endDate:formatedenddate,
            amount: amount
        }

        const Sub = await Subscription.create(subdata)

        return res.status(201).json({
            message: "subscription created successfully",
            Sub
        })

    } catch (error) {
        console.log("error saving subscription ", error)
        return res.status(500).json({message: "internal server error"})
    }
}


export default fillsub