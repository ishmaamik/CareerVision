
import React, { useState } from 'react'
import { Photo as Photo,PeopleAlt as People, Work as Work, Login as Login, Logout as Logout, Person as Person, AppRegistration as Signup} from "@mui/icons-material"
import {Button} from '@mui/material'
const Social = () => {

   
    return (
        <>
            
                    <div>
                        <div className='w-250 ml-32 h-32 mt-4 bg-white rounded-lg'>
                            <input className='mt-4 ml-4 p-4 rounded-lg w-240 bg-neutral-100' placeholder='Start writing post...'/>
                            <Button startIcon={<Photo/>} sx={{pl:'20px', mt:'12px', fontSize:'16px'}}>Photo</Button>
                        </div>

                        <div className='w-250 ml-32 h-32 mt-4 bg-white rounded-lg'>
                            <input className='mt-4 ml-4 p-4 rounded-lg w-240 bg-neutral-100' placeholder='Start writing post...'/>
                            <Button startIcon={<Photo/>} sx={{pl:'20px', mt:'12px', fontSize:'16px'}}>Photo</Button>
                        </div>

                    </div>
                
        </>
    )
}

export default Social;