import React, { useContext,useEffect,useState } from 'react'
import MenuBox from './menu/MenuBox'
import Emptychat from './rchat/Emptychat'
import ChatBox from './rchat/ChatBox'
import { AccountContext } from '../AccountProvider'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdModeEditOutline} from "react-icons/md";


const ChatDiolog = () => {
    const {person,setLoginDetail,loginDetail}=useContext(AccountContext)
    const [active,setActive]=useState("")
    useEffect(()=>{
        const get=()=>{
            let loginInfo=JSON.parse(localStorage.getItem('loginDetail'))
            setLoginDetail(loginInfo)    
        } 
       
        get()
    },[])
    const handleProfile=()=>{
        setActive("profileActive")
    }
    const handleProfile2=()=>{
        setActive("")
    }
    return (
        <>
            <header className='cHeader'>
                <nav className='navbar'></nav>
                <div className='chatBox'>
                    <div className='leftChat'>
                       <div className={`${active} profileMenu`}>
                            <div className="profileHeader">
                                <AiOutlineArrowLeft onClick={handleProfile2} style={{cursor:'pointer'}}/>
                                <span>Profile</span>
                            </div>
                            <div className="profilePhotoDiv">
                                <div className="profilePhoto">
                                    <img src={loginDetail.image} alt='profile'/>
                                </div>
                            </div>
                            <div className="profileName">
                                <p>Your name</p>
                                <div className='pName'>
                                    <h3>{loginDetail.fullname}</h3>
                                    <MdModeEditOutline/>
                                </div>
                            </div>
                            <div className="profileName">
                                <p>About</p>
                                <div className='pName'>
                                    <h3>Available</h3>
                                    <MdModeEditOutline/>
                                </div>
                            </div>
                       </div>
                        <MenuBox handleProfile={handleProfile}/>
                        
                    </div>
                        
                        {Object.keys(person).length?<ChatBox/>:<Emptychat /> }
                    
                </div>
            </header>
        </>
    )
}

export default ChatDiolog