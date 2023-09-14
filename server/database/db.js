import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const USERNAME=process.env.DB_USERNAME
const PASSWORD=process.env.DB_PASSWORD


const Connection=async()=>{
    const URL=`mongodb://${USERNAME}:${PASSWORD}@ac-xnpmzzu-shard-00-00.rdt7lrj.mongodb.net:27017,ac-xnpmzzu-shard-00-01.rdt7lrj.mongodb.net:27017,ac-xnpmzzu-shard-00-02.rdt7lrj.mongodb.net:27017/?ssl=true&replicaSet=atlas-hast36-shard-0&authSource=admin&retryWrites=true&w=majority`
    try {
       await mongoose.connect(URL,{
            useUnifiedTopology:true
        })
        console.log("Database connected succesfully");
    } catch (error) {
        console.log("Error while connecting",error);
    }
}

export default Connection;