import React,{useState,useEffect} from 'react';
import './App.css';
import TermAndService from './components/TermAndService';
import Verification from './components/Verification';
import Error from './components/Error';
import OtpValidation from './components/OtpValidation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatDiolog from './context/chat/ChatDiolog';

const App = () => {
  const[isOnline,setIsOnline]=useState(navigator.onLine)
  useEffect(() => {

    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  // what's app clone
  return (
    <>
    {isOnline?<BrowserRouter>
          <Routes>
            <Route path="/" element={<TermAndService />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/otpvalidation" element={<OtpValidation />} />
            <Route path="/chatbox" element={<ChatDiolog />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>:<div className='offlineDiv'><div className='offline'>
          <h1>Connect to the internet</h1>
          <p>Make sure your device has an active internet connection</p>
        </div>
        </div>}
        
     
    </>
  );
}

export default App;
