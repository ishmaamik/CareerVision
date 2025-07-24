import React, { useState, useEffect } from 'react'

const ApplyJob = () => {

    const [tab, setTab] = useState('Description')
    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
        const timer = setTimeout(()=>setMounted(true), 50)
        return () => {
            setMounted(false)
            clearTimeout(timer)
        }
    }, [])

    const setTabName=(tabName)=>{
        setTab(tabName)
    }

    return (
        <>
            <div>
                <div className='flex space-x-4'>
                    <p className='bg-black mt-30 text-white px-4 py-2 rounded' onClick={()=>setTabName('Description')}>Description</p>
                    <p className='bg-black mt-30 text-white px-4 py-2 rounded' onClick={()=>setTabName('Company')}>Company</p>
                    <p className='bg-black mt-30 text-white px-4 py-2 rounded' onClick={()=>setTabName('Review')}>Review</p>
                </div>

                {
                    tab === 'Description' && (
                        <div className={`transform ${isMounted ? `opacity-100` : `opacity-0 translate-y-5`} transition-all duration-800 ease-in-out left-1/2 transform -translate-x-1/2  flex items-center justify-center`}>
                            <div className="w-full max-w-2xl rounded-lg bg-white py-8 px-20 shadow-lg">

                                <p> About this Role </p>
                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default ApplyJob;