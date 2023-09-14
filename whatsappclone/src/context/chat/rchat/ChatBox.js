import React, { useContext, useState, useEffect, useRef } from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { BsThreeDotsVertical, BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoMdDownload } from "react-icons/io";
import { MdSend } from "react-icons/md";
import { AccountContext } from '../../AccountProvider';
import { getConversation, getMessage, newMessage, uploadFile } from '../../../service/api';
import Pdf from "../../../images/pdf.png"


// formatDate in chat 
const formatDate = (date) => {
    const hours = new Date(date).getHours()
    const minutes = new Date(date).getMinutes()
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
}

//download media
const downloadMedia = (e, originalImage) => {
    e.preventDefault()
    try {
        fetch(originalImage).then(resp => resp.blob()).then(blob => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = "none"
            a.href = url;
            const nameSplit = originalImage.split("/")
            const duplicateName = nameSplit.pop()
            a.download = "" + duplicateName + ""
            document.body.appendChild(a)
            a.click();
            window.URL.revokeObjectURL(url)
        }).catch(error => console.log("error while downloading", error.message))
    } catch (error) {
        console.log("error while downloading", error.message)
    }
}

const ChatBox = () => {
    const { person, loginDetail,setNewMessageFlag,newMessageFlag } = useContext(AccountContext)
    const [value, setValue] = useState("")
   
    const [messages, setmessages] = useState([])
    const [conversation, setConversation] = useState({})
    const [image, setImage] = useState("")
    const [file, setFile] = useState()
    const scrollRef = useRef()


    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({ senderId: loginDetail.phone, receiverId: person.phone })
            setConversation(data)
        }
        getConversationDetails()
    }, [person.phone, loginDetail.phone]);

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessage(conversation._id)
            setmessages(data)
        }
        conversation._id && getMessageDetails()
    }, [person._id, conversation._id, newMessageFlag])

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData()
                data.append("name", file.name)
                data.append("file", file)
                let res = await uploadFile(data)
                setImage(res.data)
            }

        }

        getImage()

    }, [file])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: 'smooth' })
    }, [messages])

    

    const onFileChange = (e) => {
        setFile(e.target.files[0])
        setValue(e.target.files[0].name)
    }

    //send text while pressing Enter
    const sendText = async (e) => {
        const code = e.keyCode || e.which
        if (code === 13) {
            let message = {}
            if (!file) {
                message = {
                    senderId: loginDetail.phone,
                    receiverId: person.phone,
                    conversationId: conversation._id,
                    type: "text",
                    text: value
                }
            } else {
                message = {
                    senderId: loginDetail.phone,
                    receiverId: person.phone,
                    conversationId: conversation._id,
                    type: "file",
                    text: image
                }
            }
   
            await newMessage(message)
            setValue("")
            setFile("")
            setImage("")
            setNewMessageFlag(prev => !prev)
        }

    }
    const sendText2 = async (e) => {
        let message = {}
        if (!file) {
            message = {
                senderId: loginDetail.phone,
                receiverId: person.phone,
                conversationId: conversation._id,
                type: "text",
                text: value
            }
        } else {
            message = {
                senderId: loginDetail.phone,
                receiverId: person.phone,
                conversationId: conversation._id,
                type: "file",
                text: image
            }
        }

        await newMessage(message)
        setValue("")
        setFile("")
        setImage("")
        setNewMessageFlag(prev => !prev)


    }


    return (
        <div className='rightChatting'>
            <header className='rightHeader'>
                <div className='leftDiv'>
                    <div className='leftImg'>
                        <img src={person.image} alt='logo' />
                    </div>
                    <div className='leftStatus'>
                        <span>{person.fullname}</span>
                        <span>Offline</span>
                    </div>

                </div>
                <div className='rightDiv'>
                    <HiOutlineSearch />
                    <BsThreeDotsVertical />
                </div>
            </header>
            <div className='chatArea' ref={scrollRef}>
                {messages && messages.map((message, index) => {
                    return (
                        <div key={index} ref={scrollRef}>
                            {loginDetail.phone === message.senderId ?
                                <div className='textSection' >
                                    <div className='textBox1' >
                                        {message.type === 'file' ? <ImageMessage message={message} /> : <><p>{message.text}</p>
                                            <span>{formatDate(message.createdAt)}</span></>}

                                    </div>
                                </div>
                                :
                                <div className='textSection'>
                                    <div className='textBox2'>
                                        {message.type === 'file' ? <ImageMessage message={message} /> : <><p>{message.text}</p>
                                            <span>{formatDate(message.createdAt)}</span></>}
                                    </div>
                                </div>}</div>

                    )
                })}
            </div>
            <footer>
                <div className='leftF'>
                    <span><BsEmojiSmile /></span>
                    <label htmlFor='fileinput'>
                        <span><ImAttachment /></span>
                    </label>
                    <input type='file' id='fileinput' style={{ display: 'none' }} onChange={(e) => onFileChange(e)} />

                    <input type='text' placeholder='Type a message' value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={sendText} />
                </div>
                <div className='rightF'>
                    <span><MdSend onClick={sendText2} style={{ cursor: 'pointer' }} /></span>
                </div>
            </footer>
        </div>
    )
}

const ImageMessage = ({ message }) => {
    return (
        <>
            {
                message?.text?.includes(".pdf") ?
                    <div className='pdfDiv'>
                        <img src={Pdf} alt="pdf" style={{ width: 60, height: '100%' }} />
                        <p>{message.text.split('/').pop()}</p>
                        <IoMdDownload onClick={(e) => downloadMedia(e, message.text)} />
                        <span>{formatDate(message.createdAt)}
                        </span>

                    </div> : <>
                        <img src={message.text} alt={message.text} style={{ width: 300, height: '100%', objectFit: 'cover' }} />
                        <span className='imgSpan'><IoMdDownload onClick={(e) => downloadMedia(e, message.text)} />{formatDate(message.createdAt)}
                        </span>

                    </>
            }
        </>
    )
}
export default ChatBox