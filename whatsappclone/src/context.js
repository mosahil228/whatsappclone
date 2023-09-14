// import React,{ useContext } from "react"

// const AppContext=React.createContext()
// const AppProvider=({children})=>{
//     return <AppContext.Provider value={{...state}}>{children}</AppContext.Provider>
// }

// const useGlobalContext=()=>{
//     return useContext(AppContext)
// }

// export {AppContext, AppProvider,useGlobalContext}


import React from 'react'

const context = () => {
  return (
    <div>context</div>
  )
}

export default context




// const firstName=useContext(AppContext)