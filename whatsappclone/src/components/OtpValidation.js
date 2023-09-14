import React, { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Rolling from "../images/Rolling-1s-200px.gif"
import check from "../images/check.gif"
import { NavLink } from 'react-router-dom';
import { MdTextsms } from "react-icons/md";
import Button from '@mui/material/Button';
import { TbCameraPlus } from "react-icons/tb";
import { AccountContext } from '../context/AccountProvider';
import { addUser } from '../service/api';
import { uploadFile } from '../service/api';
import spinner from "../images/spinner2.gif"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




//format time
const FormatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)
    if (seconds === 10) seconds = '' + seconds
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds
    return minutes + ':' + seconds
}


const OtpValidation = () => {


    const [profile, setProfile] = useState(false);
    const [name, setName] = useState("");
    const { setLoginUserDetails } = useContext(AccountContext)
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [hide, setHide] = useState(false)
    const [otpChecking, setOtpChecking] = useState(false)
    const [otpMatching, setOtpMatching] = useState(false)
    const [vComplete, setVComplete] = useState(false)
    const [matter, setMatter] = useState("")
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const otpFieldsRef = useRef([]);
    const [countdown, setCountdown] = useState(20)
    const [image, setImage] = useState("")
    const [file, setFile] = useState()
    const [imgUploaded, setImgUpload] = useState(false);
    const [imgSpinner, setImgSpinner] = useState(false);
   

    const timerId = useRef()
    //notification


    const initialvalues = {
        fullname: "",
        phone: JSON.parse(localStorage.getItem('localNumber')),
        image: image
    };
    const [userInfo, setUserInfo] = useState(initialvalues);
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData()
                data.append("name", file.name)
                data.append("file", file)
                let res = await uploadFile(data)
                setImage(res.data)
                setUserInfo({ ...userInfo, image: res.data });
                setImgSpinner(true)
                setTimeout(() => {
                    setImgUpload(true)
                    setImgSpinner(false)
                }, 2000);

            }
        }
        getImage()
    }, [file])

    const onFileChange = (e) => {
        setFile(e.target.files[0])

    }




    //check if user is already exist



    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000);
        return () => {
            clearInterval(timerId.current)
        };
    }, []);
    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current)
        }

    }, [countdown]);
    let otpInputValue = ""

    let fakeotp = "123456"

    


    useEffect(() => {
        if (otpValues[0] === '') {
            otpFieldsRef.current[0].focus()
        }


    }, [otpValues]);

    const handleInput = (index, value) => {
        if (value.length > 1) {
            return;
        }
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;

        setOtpValues(newOtpValues);
        // converting input array data in string 
        otpInputValue = newOtpValues.toString().replaceAll(",", "")

        if (otpInputValue.length === 6) {
            setMatter(otpInputValue)
            if (otpInputValue === fakeotp) {

                setOtpChecking(true);
                setInterval(() => {
                    setOtpChecking(false);
                    setVComplete(true)
                    setInterval(() => {
                        setProfile(true)
                    }, 3000)
                }, 2000);



            } else {
                setOtpChecking(true);
                setInterval(() => {
                    setOtpChecking(false);
                }, 2000);
                setOtpMatching(true)

            }
        }


        // if(isNaN(value)) return false;

        if (value.length === 1 && index < otpValues.length - 1) {
            otpFieldsRef.current[index + 1].focus();
        }


    };











    const handleBackspace = (index) => {
        if (otpValues[index] !== '') {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = '';
            setOtpValues(newOtpValues);
        } else if (index > 0) {
            otpFieldsRef.current[index - 1].focus();
        }
    };

 
    
    setTimeout(() => {
        setOpen(false)
        setHide(true)
    }, 2000);
    const handleClose = (index) => {
        setOtpMatching(false)
        setOtpValues(['', '', '', '', '', '']);
    }


    const handleName = (e) => {
        setName(e.target.value);
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
    const handleProfileClick = async (e) => {
        e.preventDefault();
        await addUser(userInfo)

        setLoginUserDetails(userInfo)
        //add data to localstorage
        localStorage.setItem('loginDetail', JSON.stringify(userInfo))
        navigate("/chatbox")

    }


    return (
        <>
        
            {!profile && <div className="verification-section">

                <Dialog
                    PaperProps={{
                        style: {
                            width: '600px',
                            height: '100px',
                        },
                    }}
                    open={open}
                    aria-describedby="alert-dialog-description"
                > <DialogContent className='diologFlex '>
                        <DialogContentText id="alert-dialog-description" className='dContent'>
                            <span className='roller'><img src={Rolling} alt='spinner' /></span>Requesting an SMS...
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <div className='vDiv'>
                    <div className='vItems'>
                        <p className='vHeading'>Verifying your number</p>
                        <p className='vSubHeading'>Waiting to automatically detect an SMS sent to <span className='font-bold'>+91&nbsp;{JSON.parse(localStorage.getItem('localNumber'))}.</span> <NavLink to="/verification"><span className="refreshBtn">Wrong number?</span></NavLink></p>
                        <div className='vBox'>
                            <div className='inputBox'>
                                {otpValues.map((value, index) => (

                                    <input
                                        key={index}
                                        type="number"
                                        maxLength="1"
                                        value={value}
                                        onChange={(e) => handleInput(index, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Backspace') {
                                                handleBackspace(index);
                                            }
                                        }}
                                        ref={(ref) => {
                                            otpFieldsRef.current[index] = ref;
                                        }}
                                    />
                                ))}</div>
                            <p className='vSubHeading2'>Enter 6-digit code</p>
                            <Button className='muiBtn' variant="contained" disableElevation disabled={countdown !== 0 ? true : false} >
                                <MdTextsms /> Resend SMS
                            </Button>

                            <p>Trial OTP : 123456</p>



                            {(hide && countdown !== 0) && <p className='vSubHeading2'>You may request a new code in <span>{FormatTime(countdown)}</span></p>}
                            


                        </div>

                    </div>

                </div>
                {otpChecking && <Dialog
                    PaperProps={{
                        style: {
                            width: '600px',
                            height: '100px',
                        },
                    }}
                    open={otpChecking}
                    aria-describedby="alert-dialog-description"
                > <DialogContent className='diologFlex '>
                        <DialogContentText id="alert-dialog-description" className='dContent'>
                            <span className='roller'><img src={Rolling} alt='spinner' /></span>Verifying...
                        </DialogContentText>
                    </DialogContent>
                </Dialog>}


                {(!otpChecking && otpMatching) && <Dialog
                    PaperProps={{
                        style: {
                            width: '600px',
                            height: 'fit-content',
                        },
                    }}
                    open={otpMatching}
                    aria-describedby="alert-dialog-description"
                >

                    <DialogContent className='diologFlex diologFlex2'>
                        <DialogContentText id="alert-dialog-description" className='dContent'>
                            The code you entered is incorrect. Please try again.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions >
                        <Button onClick={handleClose} disableElevation className='dContent dButton'
                        >
                            OK
                        </Button>
                    </DialogActions>

                </Dialog>}
                {(!otpChecking && vComplete) && <Dialog
                    PaperProps={{
                        style: {
                            width: '600px',
                            height: '100px',
                        },
                    }}
                    open={vComplete}
                    aria-describedby="alert-dialog-description"
                > <DialogContent className='diologFlex '>
                        <DialogContentText id="alert-dialog-description" className='dContent'>
                            <span className='roller'><img src={check} alt='spinner' /></span>Verification complete
                        </DialogContentText>
                    </DialogContent>
                </Dialog>}

            </div>}

            {/* profile setup/ */}
            {profile && <div className="verification-section">
                <div className='vDiv vProfileDiv'>
                    <div className='vItems'>
                        <p className='vHeading'>Profile info</p>
                        <p className='vSubHeading'>Please provide your name and an optional profile photo </p>
                        <div className='vBox'>
                            <div className='vProfilemain'>
                                <form>
                                    <div className='vInput'>
                                        <div className='vFlex2'>
                                            <input type="file" accept="image/png, image/jpeg" id='file' onChange={(e) => onFileChange(e)} />
                                            <label htmlFor="file">
                                                <div className='profileBox'>
                                                    {imgSpinner && <img style={{ width: '30px', height: '30px' }} src={spinner} alt='spinner' />}
                                                    {imgUploaded ? <img src={image} alt='' /> : !imgSpinner && <TbCameraPlus />}
                                                </div></label>


                                            <input type="text" name="fullname" placeholder='Type your name here' value={name} onChange={handleName} autoFocus required={true} />
                                        </div>
                                        <div>
                                            <Button type="submit" className='muiBtn2' variant="contained" onClick={handleProfileClick} disableElevation disabled={!name}>
                                                Next
                                            </Button></div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>}
        </>
    )
}

export default OtpValidation


