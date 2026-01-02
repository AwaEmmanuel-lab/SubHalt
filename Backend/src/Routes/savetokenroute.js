import express from "express"

const router = express.Router()



router.post("/", authorize, async(req, res) => {
    const {pushToken} = req.body

    if (!pushToken) {
        return res.status(400).json({ message: "Push token required" })
    }

    await User.findByIdAndUpdate(req.user._id, {
        pushToken: pushToken
    })

  res.json({ message: "Push token saved" })
})



export default router