import React, { useContext, useState, useEffect } from 'react'
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { TbHistoryToggle, TbLogout2 } from "react-icons/tb";
import { GoMention } from "react-icons/go";
import { HiOutlineSearch } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import Conversation from './Conversation';
import { AccountContext } from '../../AccountProvider';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { getUsers } from '../../../service/api';







const MenuBox = ({ handleProfile }) => {
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [text, setText] = useState("")
  const { loginDetail } = useContext(AccountContext)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      let res = await getUsers()
      const filterData = res.filter(user => user.fullname.toLowerCase().includes(text.toLowerCase()))
      setUsers(filterData)
    }
    fetchData();
  }, [text])


  const logout = () => {

    navigate("/")
    localStorage.clear()

  }
  const toggleMention = () => {
    setOpen(true)
  }
  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <div className='leftHeader'>
        <Dialog
        onClose={handleClose}
          PaperProps={{
            style: {
              width: '350px',
              height: '300px',
            },
          }}
          open={open}
          aria-describedby="alert-dialog-description"
        > <DialogContent className='diologFlex '>
            {users.map((user, index) => {
              const { fullname, image } = user;
              return (
                <div className='mentionDiv' key={index}>
                  <div className='mentionImg'>
                    <img src={image} alt='image' />
                  </div>
                  <span>{fullname}</span>
                </div>
              )

            })}

          </DialogContent>
        </Dialog>

        <div className='menuNav'>
          <div className='leftDiv' onClick={handleProfile}>
            <img src={loginDetail.image} alt='dp' />
          </div>
          <div className='rightDiv'>
            <GoMention onClick={toggleMention} />
            <TbHistoryToggle />
            <BsFillChatLeftTextFill />
            {/* <BsThreeDotsVertical /> */}
            <TbLogout2 onClick={logout} />

          </div>
        </div>
        <div className='usersSection'>
          <div className='searchbar'>
            <form>
              <button><HiOutlineSearch /></button>
              <input type='text' placeholder='Search or start new chat' onChange={(e) => setText(e.target.value)} />
            </form>
            <span><IoFilter />
            </span>
          </div>
        </div>
        <Conversation text={text} />

      </div>


    </>
  )
}

export default MenuBox