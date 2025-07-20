import React, { useContext } from 'react'
import ishu from '../../assets/siyam.jpg'
import { User } from '../../context/UserContext'
const Profile = () => {

    const { userDetails } = useContext(User)
    return (
        <>
            <div className='flex'>
                <div>
                    <div className="relative top-30 right-20 hover:-translate-y-2 ease-in-out duration-300 shadow-xl">
                        <div className="relative w-120 h-auto max-h-60  rounded-lg  bg-white " >

                            <div className='relative bg-gray-100 flex w-full h-20 whitespace-nowrap rounded-lg' >
                                <p className="font-semibold absolute left-4 top-2">Your Profile</p>
                                <p className="   whitespace-nowrap absolute right-4">Joined 20/07/25</p>

                            </div>


                            <div className='relative bg-white h-50 rounded-lg'>
                                <img className='absolute left-2 top-5 w-16 ' style={{ borderRadius: '50%' }} src={ishu} />
                                <p className='absolute left-2 top-24  '>Siyam Bhuiyan</p>
                                <p className='absolute left-2 top-32'>01696969420</p>
                            </div>

                        </div>
                    </div>

                    <div className="relative top-50 right-20 hover:-translate-y-2 ease-in-out duration-300 shadow-xl">
                        <div className="relative w-120 h-auto max-h-60  rounded-lg  bg-white shadow-lg">

                            <div className='relative bg-gray-100 flex w-full h-16 whitespace-nowrap rounded-lg' >
                                <p className="font-semibold absolute left-4 top-2">Email Address</p>
                            </div>


                            <div className='relative bg-white h-35 rounded-lg whitespace-nowrap'>
                                <p className='absolute left-2 top-5 bg-blue-100 rounded-2xl text-blue-900 w-30'>Primary Mail</p>
                                <p className='absolute left-2 top-15  '>siyam@iut-dhaka.edu</p>
                                <p className='absolute left-2 top-23'>siyambhuiyan@gmail.com</p>
                            </div>

                        </div>
                    </div>

                </div>
                <div>
                    <div>

                    <div className="relative top-30 left-20 hover:-translate-y-2 duration-300 ease-in-out shadow-xl">
                            <div className="relative w-120 h-auto max-h-60  rounded-lg  bg-white shadow-lg">

                                <div className='relative bg-gray-100 flex w-full h-16 whitespace-nowrap rounded-lg' >
                                    <p className="font-semibold absolute left-4 top-1">Phone Number</p>
                                </div>


                                <div className='relative bg-white h-35 rounded-lg whitespace-nowrap'>
                                    <p className='absolute left-2 top-5 bg-blue-100 rounded-2xl text-blue-900 w-30'>Primary Number</p>
                                    <p className='absolute left-2 top-15  '>01696969420</p>
                                    <p className='absolute left-2 top-23'>01717171717</p>
                                </div>

                            </div>
                        </div>

                        <div className="relative top-50 left-20 hover:-translate-y-2 ease-in-out duration-300 shadow-xl">
                            <div className="relative w-120 h-auto max-h-60  rounded-lg  bg-white shadow-lg">

                                <div className='relative bg-gray-100 flex w-full h-20 whitespace-nowrap rounded-lg' >
                                    <p className="font-semibold absolute left-4 top-2">Address</p>

                                </div>


                                <div className='relative bg-white h-35 rounded-lg'>
                                <p className='absolute left-2 top-5 bg-blue-100 rounded-2xl text-blue-900 w-30'>Primary Address</p>
                                    <p className='absolute left-2 top-15  '>House 14, Road 6, Dhanmondi, Dhaka-1205</p>
                                    <p className='absolute left-2 top-23'>IUT Male Residence, Board Bazar, Gazipur</p>
                                </div>

                            </div>
                        </div>

                        

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;