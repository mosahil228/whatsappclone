import mongoose from "mongoose";




const ConversationSchema=mongoose.Schema({
    members:{
        type:Array,
    },
    message:{
        type:String,
    }},
    {
        timestamps:true
    }
)

const conversation=mongoose.model('Conversation',ConversationSchema)
export default conversation;
