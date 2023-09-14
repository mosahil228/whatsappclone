
import wlogo2 from "../images/wlogo2.png"
import Button from '@mui/material/Button';
import { PiGlobe } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import w2 from "../images/w2.png";
import spinner from "../images/spinner.gif";
import { useState, useEffect } from "react";
// import { styled } from '@mui/material';

const TermAndService = () => {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()



    // useEffect(() => {
    //     if (localStorage.getItem("loginDetail") !== null || localStorage.getItem("info") !== "") {
    //       setTimeout(() => {
    //         navigate("/chatbox")
    //       }, 2000);
    //     } else {
    //         setOpen(false)
    //     }
    //     }, []);
    useEffect(() => {
        if (localStorage.getItem('loginDetail') === null) {
            console.log("Empty");
            setTimeout(() => {
                setOpen(false)
            }, 3000);
        } else {
            console.log("not empty");
            setOpen(true)
            setTimeout(() => {
                navigate("/chatbox")
            }, 3000);
        }
    }, [navigate])


    return (
        <>
            <div className='main-page'>
                {!open && <div className='main-item'>
                    <img src={wlogo2} alt='logo' />
                    <p className='heading'>Welcome to whatsApp</p>
                    <p className='sub-heading'>Read our <span><a href='/'>Privacy Policy</a></span>. Tap "Agree and continue" to accept the <span><a href='/'>Terms of Service</a></span>. </p>
                    <NavLink to='verification'><Button className='muiBtn' variant="contained" disableElevation >
                        Agree and continue
                    </Button></NavLink>
                    <span className='language'><span><PiGlobe /> English</span></span>
                </div>}
                {open && <div className="spinner">
                    <img src={w2} alt="logo" />
                    <img src={spinner} alt="logo" />
                </div>}

            </div>
           
        </>
    );
}

export default TermAndService;
