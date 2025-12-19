import express from "express";
import initdb from "./Lib/db.js";
import dotenv from "dotenv";
import signupRoute from "./Routes/signupRoute.js"
import loginRoute from "./Routes/loginRoute.js"
import subscriptionRoute from "./Routes/subscriptionRoute.js"
import cors from "cors"

dotenv.config()

const app = express();

app.listen(process.env.PORT, () => {
    console.log("Server is running")
    initdb();
})

app.get("/",(req,res) => {
    res.send("Server is working")
})

app.use(cors())
app.use(express.json())

app.use("/api/auth", signupRoute)
app.use("/api/auth", loginRoute)
app.use("/api/subscription", subscriptionRoute)
