import { createContext, useState} from "react";

export const AccountContext=createContext(null);



const AccountProvider = ({children}) => {
    const [number,setNumber]=useState();
    const [person,setPerson]=useState({});
    const [loginUserDetails,setLoginUserDetails]=useState({});
    const [loginDetail,setLoginDetail]=useState({});
    const [newMessageFlag, setNewMessageFlag] = useState(false)



    return (
        <AccountContext.Provider value={{number,setNumber,person,setPerson,loginUserDetails,setLoginUserDetails,loginDetail,setLoginDetail,newMessageFlag, setNewMessageFlag}}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider