import React,{useState, useEffect} from 'react'

export const PercentageBadge = ({ percentage, error }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    useEffect(() => {
        // Reset animation when percentage changes
        setAnimatedPercentage(0);

        // Create a smooth animation
        const animationDuration = 1500; // 1.5 seconds
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            // Use easing function for smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            const currentPercentage = Math.round(easedProgress * percentage);

            setAnimatedPercentage(currentPercentage);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [percentage]);

    if (error) {
        return (
            <span
                className="text-red-500 text-xs"
                title={error}
            >
                Error
            </span>
        );
    }

    // Determine gradient based on percentage
    const getGradientClass = () => {
        if (animatedPercentage >= 80) return 'from-purple-700 to-purple-900';
        if (animatedPercentage >= 60) return 'from-purple-600 to-purple-800';
        if (animatedPercentage >= 40) return 'from-purple-500 to-purple-700';
        if (animatedPercentage >= 20) return 'from-purple-400 to-purple-600';
        return 'from-purple-300 to-purple-500';
    };

    // Determine text and background classes for 0% case
    const is0Percent = animatedPercentage === 0;

    return (
        <div
            className={`
                relative 
                w-full 
                h-6 
                ${is0Percent ? 'bg-gray-200' : 'bg-gray-200'} 
                rounded-full 
                overflow-hidden
                flex 
                items-center 
                justify-center
            `}
        >
            {is0Percent ? (
                <span className="text-black text-sm font-medium">
                    0%
                </span>
            ) : (
                <div
                    className={`
                        absolute 
                        left-0 
                        top-0 
                        bottom-0 
                        bg-gradient-to-r 
                        ${getGradientClass()}
                        transition-all 
                        duration-500 
                        ease-out
                    `}
                    style={{
                        width: `${animatedPercentage}%`,
                        maxWidth: '100%'
                    }}
                >
                    <span
                        className="
                            absolute 
                            right-2 
                            top-1/2 
                            transform 
                            -translate-y-1/2 
                            text-white 
                            font-semibold 
                            text-sm
                        "
                    >
                        {animatedPercentage}%
                    </span>
                </div>
            )}
        </div>
    );
};
