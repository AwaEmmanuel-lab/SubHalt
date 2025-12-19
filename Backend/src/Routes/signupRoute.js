import express from "express"
import signup from "../Controller/signup.js"

//import dotenv from "dotenv"

const router = express.Router()
console.log(signup)
router.post("/signup", signup)

export default router