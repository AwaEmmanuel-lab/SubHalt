import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const initdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected Successfully")
    } catch (error) {
        console.log("Error connecting to database: ", error)
    }
}

export default initdb;