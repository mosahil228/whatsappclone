import mongoose from "mongoose";



const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
})

const user=mongoose.model("user",userSchema)
export default user;