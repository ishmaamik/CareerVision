
import React, { useState } from 'react'
import { Photo as Photo, PeopleAlt as People, Work as Work, Login as Login, Logout as Logout, Person as Person, AppRegistration as Signup } from "@mui/icons-material"
import { Button } from '@mui/material'
const Social = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <>

            <div>
                <div className='w-260 ml-32 h-32 mt-4 bg-white rounded-lg'>
                    <div className='flex'>
                        <img className='h-16 ml-4 w-16 mt-4' style={{borderRadius:'50%'}} src={user?.profilePictureUrl || '/default-profile.jpg'} />
                        <input className='mt-4 ml-4 mr-4  rounded-lg w-240 bg-neutral-100' placeholder='Start writing post...' />
                    </div>
                    <Button startIcon={<Photo />} sx={{ pl: '20px', mt: '12px', fontSize: '16px' }}>Photo</Button>
                </div>


            </div>

        </>
    )
}

export default Social;