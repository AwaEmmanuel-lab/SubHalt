import express from "express"
import jwt from "jsonwebtoken"
import User from "../Models/user.model.js"
import authorize from "../Middleware/auth.middleware.js"
import fillsub from "../Controller/fillsub.js"
import Subscription from "../Models/subscription.model.js"
import deletesub from "../Controller/deletesub.js"
import getsub from "../Controller/getsub.js"
import updatesub from "../Controller/updatesub.js"
import cron from 'cron'

const router = express.Router()


router.post("/fillsub", authorize ,fillsub)
router.put("/updatesub/:id", authorize, updatesub)
router.delete("/deletesub/:id", authorize, deletesub)
router.get("/getsub",authorize, getsub)

export default router