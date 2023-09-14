import express from 'express'
import { addUser,getUsers} from '../controller/user_controller.js'
import { newConversation,getConversation } from '../controller/conversation-controller.js'
import { newMessage ,getMessage} from '../controller/message-controller.js'
import { uploadFile } from '../controller/image-controller.js'
import upload from '../utils/upload.js'
import { getImage } from '../controller/image-controller.js'

const route=express.Router()
route.post('/add',addUser)
route.get('/users',getUsers)
route.post('/conversation/add',newConversation)
route.post('/conversation/get',getConversation)
route.post('/message/add',newMessage)
route.get('/message/get/:id',getMessage)


route.post('/file/upload',upload.single("file"),uploadFile)
route.get('/file/:filename',getImage)

export default route

// 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