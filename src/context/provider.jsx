import React, { useState, useEffect } from "react";
import ApiDataContext from "./context"

const ApiDataProvider = ({children}) => {
    const [userState, setUserState] = useState({
        Bob: true,
        Gary: false,
        Jessica: true,
        Sam: false,
        Eric: true,
    });

    useEffect(() => {
        setUserState(userState);
    }, [])
    
    return (
        <ApiDataContext.Provider value={userState}>
            {children}
        </ApiDataContext.Provider>
    )
} 
export default ApiDataProvider 