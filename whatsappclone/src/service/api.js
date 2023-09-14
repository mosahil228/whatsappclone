import axios from 'axios'


const url='http://localhost:8000'
export const addUser=async(data)=>{
    try{
        await axios.post(`${url}/add`,data);
    }catch(error){
        console.log('Error while addUser API',error);
    }
}
export const getUsers=async(data)=>{
    try{
        let res=await axios.get(`${url}/users`);
        return res.data;
    }catch(error){
        console.log('Error while getUsers API',error.message);
    }
}
export const getUsersExists=async(data)=>{
    try{
        let res=await axios.get(`${url}/userexist`);
        return res.data;
    }catch(error){
        console.log('Error while getUsers API',error.message);
    }
}
export const setConversation=async(data)=>{
    try{
        let res=await axios.post(`${url}/conversation/add`,data);
        return res.data;
    }catch(error){
        console.log('Error while setConverstaion API',error.message);
    }
}
export const getConversation=async(data)=>{
    try{
        let res=await axios.post(`${url}/conversation/get`,data);
        return res.data;
    }catch(error){
        console.log('Error while getConverstaion API',error.message);
    }
}
export const newMessage=async(data)=>{
    try{
        await axios.post(`${url}/message/add`,data);
    }catch(error){
        console.log('Error while newMeesage API',error.message);
    }
}
export const getMessage=async(id)=>{
    try{
        let res=await axios.get(`${url}/message/get/${id}`);
        return res.data;
    }catch(error){
        console.log('Error while getMeesage API',error.message);
    }
}

export const uploadFile=async(data)=>{
    try {
        return await axios.post(`${url}/file/upload`,data);
    } catch (error) {
        console.log('Error while uploadFile API',error.message);
    }
}
