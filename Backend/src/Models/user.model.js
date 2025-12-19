import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
      type: String,
      required: true  
    },
    email:{
        type: String,
        unique:true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},{timestamps:true})

userSchema.methods.comparepassword = async function (password){
  return await bcrypt.compare(password, this.password)  
}

const User = mongoose.model("User", userSchema)

export default User;