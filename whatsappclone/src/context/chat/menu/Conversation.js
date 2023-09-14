import React, { useContext, useEffect, useState } from 'react'
import { getUsers } from '../../../service/api'
import { AccountContext } from '../../AccountProvider'
import { setConversation } from './../../../service/api';

const Conversation = ({ text }) => {
    const [users, setUsers] = useState([])
    const { setPerson, loginDetail} = useContext(AccountContext)


    // useEffect(() => {
    //     const getConversationDetails = async () => {
    //         const data = await getConversation({ senderId: loginDetail.phone, receiverId: person.phone })
    //         setMessage({ text: data?.message, timestamp: data?.updatedAt })
    //         console.log(data);
    //     }
       
    //     getConversationDetails()
    // }, [newMessageFlag])

    useEffect(() => {
        const fetchData = async () => {
            let res = await getUsers()
            const filterData = res.filter(user => user.fullname.toLowerCase().includes(text.toLowerCase()))
            setUsers(filterData)
        }
        fetchData();
    }, [text])


    const getUser = async (user) => {
        setPerson(user)
        await setConversation({ senderId: loginDetail.phone, receiverId: user.phone })
    }


    return (
        <>{users.map((user, index) => {
            const { fullname, phone, image } = user;
            return (
                loginDetail.phone !== phone && <div className='conversation' key={index} onClick={() => getUser(user)}>
                    <div className='conDiv'>
                        <div className='lDiv'>
                            <div className='lImage'>
                                <img src={image} alt='dp' />
                            </div>
                        </div>
                        <div className='rDiv'>
                            <div className='lItem'>
                                <span>{fullname}</span>
                                
                            </div>
                            <div className='rItem'>
                               <span>{phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}

        </>
    )
}

export default Conversation