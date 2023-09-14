import React, { useState, useRef, useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Rolling from "../images/Rolling-1s-200px.gif"
import { NavLink } from 'react-router-dom';
import { AccountContext } from '../context/AccountProvider';
import { getUsers } from '../service/api';







const Verification = () => {
  const { setNumber } = useContext(AccountContext)

  const [open, setOpen] = useState(false);
  const [messege, setMessege] = useState("");
  const [text, setText] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const handleClose = () => {
    setOpen(false);

  };


  const handleChange = (e) => {
    setMessege(e.target.value)
    setNumber(e.target.value)
  }
  const handleClickOpen = (e) => {
    setOpen(true);
    if (isNaN(Number(messege)) === false && messege.length === 10) {
      setValidNumber(true)
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
    if (isNaN(Number(messege)) === true) {
      setText("Please enter numbers only.")
    }
    if (messege.length === 0 && isNaN(Number(messege)) === false) {
      setText("Please enter your phone number.")
    }
    if ((messege.length < 10 || messege.length > 10) && isNaN(Number(messege)) === false) {
      setText("Please enter 10-digit phone number for the country: India.")
    }

    e.preventDefault();
    localStorage.setItem("localNumber", JSON.stringify(messege))
  };
  const handleClose2 = () => {
    setOpen(false);
    setValidNumber(false)

  };
  const handleClose3 = () => {
    setOpen(false);

  };



  return (
    <>
      <div className="verification-section" >
        {validNumber && (loading ? <Dialog

          PaperProps={{
            style: {
              width: '600px',
              height: '100px',
            },
          }}
          className='editDiolog'
          open={open}
          aria-describedby="alert-dialog-description"
        > <DialogContent className='diologFlex '>
            <DialogContentText id="alert-dialog-description" className='dContent'>
              <span className='roller'><img src={Rolling} alt='spinner' /></span>Connecting...
            </DialogContentText>
          </DialogContent>
        </Dialog> : <Dialog
          PaperProps={{
            style: {
              width: '600px',
              height: 'fit-content',
            },
          }}
          open={open}
          aria-describedby="alert-dialog-description"
        >

          <DialogContent className='diologFlex diologFlex2'>
            <DialogContentText id="alert-dialog-description" className='dContent'>
              You entered the phone number:
            </DialogContentText>
          </DialogContent>
          <DialogContent className='diologFlex diologFlex2'>
            <DialogContentText id="alert-dialog-description" className='dContent dContent2'>
              +91&nbsp;{messege}
            </DialogContentText>
          </DialogContent>
          <DialogContent className='diologFlex diologFlex2'>
            <DialogContentText id="alert-dialog-description" className='dContent'>
              Is this OK, or would you like to edit the number?
            </DialogContentText>
          </DialogContent>
          <div className='dAction'>
            <DialogActions >
              <Button onClick={handleClose2} disableElevation className='dContent dButton'
              >
                Edit
              </Button>
            </DialogActions>
            <DialogActions >
              <NavLink to="/otpvalidation" state={{ id: messege }}><Button onClick={handleClose3} disableElevation className='dContent dButton'
              >
                OK
              </Button></NavLink>
            </DialogActions>
          </div>
        </Dialog>)}

        {!validNumber && <Dialog
          PaperProps={{
            style: {
              width: '600px',
            },
          }}
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-description"
        > <DialogContent>
            <DialogContentText id="alert-dialog-description" className='dContent'>
              {text}
            </DialogContentText>
          </DialogContent>
          <DialogActions >
            <Button onClick={handleClose} disableElevation className='dContent dButton'
            >
              OK
            </Button>
          </DialogActions></Dialog>}
        <div className='vDiv'>
          <div className='vItems'>
            <p className='vHeading'>Enter your phone number</p>
            <p className='vSubHeading'>Whatsapp will need to verify your account, enter your phone number to login.</p>
            <div className='vBox'><p className='vCountry'>India</p>
              <form>
                <div className='vInput'>
                  <div className='vFlex'>
                    <span>+&nbsp;&nbsp;&nbsp;&nbsp;91</span>
                    <input type="phone" ref={ref} placeholder='phone number' onChange={handleChange} autoFocus /></div>
                  <div><Button type="submit" className='muiBtn2' variant="contained" disableElevation onClick={handleClickOpen}>
                    Next
                  </Button></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}


export default Verification