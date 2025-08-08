import React, { useState, useEffect } from 'react';
import UserHeader from './UserHeader.jsx';
import ProfilePicture from './ProfilePicture.jsx';
import UserInfo from './UserInfo.jsx';
import EmailCard from './EmailCard.jsx';
import LocationCard from './LocationCard.jsx';
import PhoneCard from './PhoneCard.jsx';
import AddressCard from './AddressCard.jsx';

const Profile = () => {
    const [isMounted, setMounted] = useState(false);
    const [user, setUser]=useState()
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 10);
        return () => {
            setMounted(false);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`flex transition-all ml-10 mt-20 duration-500 ease-in-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>

            {/* Left Column */}
            <div className="w-300 pr-6">

                {/* Profile Card */}
                <div className="bg-white rounded-lg mr-12 shadow-xl mb-6 hover:-translate-y-1 transition-transform duration-300">
                    <UserHeader />
                    <div className="p-6 flex">
                        <ProfilePicture />
                        <UserInfo />
                    </div>
                </div>

                {/* Email Card */}
                <EmailCard />
            </div>

            {/*Middle Column */}
            <LocationCard />

            {/* Right Column */}
            <div className="w-300 pl-2">
                {/* Phone Number Card */}
                <PhoneCard />
                {/* Address Card */}
                <AddressCard />
            </div>

        </div>
    );
};

export default Profile;