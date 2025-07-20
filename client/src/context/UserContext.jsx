import React, { useState } from 'react'
import { createContext } from 'react';

export const User= createContext()

export const UserProvider = ({children}) => {
    const [userDetails, setUserDetails]= useState(null)

    return (
        <User.Provider value={{userDetails, setUserDetails}}>
            {children}
        </User.Provider>
    )
}
