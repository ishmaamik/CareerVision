import React from 'react'

const Review = ({isMounted}) => {
    return (
        <>
            <div className={`transform ${isMounted ? `opacity-100` : `opacity-0 translate-y-5`} transition-all duration-800 ease-in-out left-1/2  flex items-center justify-center`}>
                <div className="w-200 h-100 rounded-lg bg-white  shadow-lg">

                    <p> Review </p>
                </div>
            </div>
        </>
    )
}

export default Review;