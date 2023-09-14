import React from 'react'
import w1 from "../../../images/w1.jpeg"
const Emptychat = () => {
  return (
    <div className='rightChat'>
    <div className='eChat'>
      <div className='etop'>
        <img src={w1} alt='logo'/>
        <h1>Whatsapp Web</h1>
        <span>
        <p>Now send and receive messeges without keeping your phone online.</p>
        <p>Use whatsapp on up to 4 linked devices and 1 phone at the same time.</p>
        </span>
        <div className='line'></div> 
      </div>
    </div>
    </div>
  )
}

export default Emptychat