
import React, { useState } from 'react'
import { Photo as Photo, PeopleAlt as People, Work as Work, Login as Login, Logout as Logout, Person as Person, AppRegistration as Signup } from "@mui/icons-material"
import { Button } from '@mui/material'
import Social from './Social'
const CommunityForum = () => {

    const sections = ["Social", "Articles", "Videos"]
    const [isSelected, setSelected] = useState("Social")
    const buttons = [{
        name: "Photo",
        icon: "Photo"
    }]

    const setTab = (tab) => {
        setSelected(`${tab}`)
    }
    return (
        <>
            <div className='flex mt-20 space-x-4 justify-start ml-32'>
                {
                    sections.map((section, index) =>
                        <div>
                            <h2 onClick={() => { setTab(section) }} className={`cursor-pointer text-2xl rounded-lg w-32 h-auto p-4 text-center ${isSelected === `${section}` ? `bg-gradient-to-r from-blue-500 to-indigo-600 text-white` : `text-black`}`}>{section}</h2>
                        </div>)
                }
            </div>

            {
                isSelected === "Social" &&
                <Social />
            }
        </>
    )
}

export default CommunityForum;