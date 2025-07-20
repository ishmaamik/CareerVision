import React from 'react';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div 
        className="min-h-[600px] w-full bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), 
          url("https://lh3.googleusercontent.com/aida-public/AB6AXuCiYB8uUY3KuDawlfpp83U4rohtBhrnZ1JsdjEKi-fk1lIUNNb9y6Jz3RyGA-UJGamMw0El5QXP8Z0-_wF3GCTPALNkrJiWTMMz2g_lZGhfF3akAP_1ZY65I7bDUhsSIQQZkuXHrhpBaKxGZ6CrHwMOLkjEoKdz7XM7aLrW9st1kFIkgeTwMR8B6IXg98yl5pmv6BiIpcPh5D7q_D_UsXLNupqT8ck7ZuYNH25NaMkPZ2RB73_GZQIF_EOrQr9ckcWnu6jArNfxEAU")`
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Unlock Your Potential with CareerVision
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            Whether you're a student exploring options, a professional seeking growth, or a recruiter finding talent, CareerVision is your guide to career success.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Explore Careers
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-semibold transition-colors">
              Find Opportunities
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Feature data
const features = [
  {
    icon: "🎯",
    title: "Personalized Career Paths",
    description: "Discover tailored career paths based on your interests and skills."
  },
  {
    icon: "👥",
    title: "Community Support",
    description: "Connect with peers and mentors for guidance and support."
  },
  {
    icon: "💼",
    title: "Job Opportunities",
    description: "Access a wide range of job opportunities from leading companies."
  },
  {
    icon: "📈",
    title: "Skill Development",
    description: "Enhance your skills with curated learning resources and workshops."
  }
];

// Success Stories data
const successStories = [
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_vSpPTyhAaWW3ZcmYtuL8OYT8XgYuztJhEjaJGfwXbVr5bICunXTfdsh3JchbTkPNU-G3Xxt03nnS_ci1P7wtzgdJ_lObWsBWrK-J3j7wHfQbI5zQLv6CWdEsRgjcycn-h-034rLb67eYSRz43pkzyGb5LsE3WOo5Rtl1MUir1pT-T-dtNsWZ4F_YL9Wov75YzXC93SjI57k_lCIyS0dgZEv3msbbyY95RW23TXYPjBbTe4GCuqI6HGkxC7TlCd7dF3EEsTlTyEk",
    title: "From Student to Success",
    description: "CareerVision helped me find my passion and land my dream internship."
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPlkfmWp28Fn9ACwXKsmWQgbo8ne_YdzbkFm_4g-56q2crDdTHnNEdkNXkMs_JsPamDWseg_9bJy28U3u8udQNv4yM48VIQ9-s4dVKX4SIrp9clKgE6NgXVsH0zlwO3Eb5spioJVIjq3trwtFjw8iAeuHoYH6_mKL9KC2C0rCcmAZ67n4hnHDOo5mVTdTKSbV8qJN8NQFhL4a9Jyo3JAlG9cD2xaUYJ2rIKf-X6djeit9Sc5by1-pRFlQJ4DUXNGpsOYBetCmTgFI",
    title: "Career Change Triumph",
    description: "I transitioned to a new industry with the support of CareerVision's resources."
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDqzvddJCpLEKIRM170CGLRp5ZOa_xJw2AT0KXNfr4JUTcj0I7IydFAllUxHvCwIFuvl_1TDZ3JTrct3ZvG7OaYoWfGhxvsBekE9LPQbgPq_XLnnjWZgp-WSgjc0jKdYg7YBZBphZZzLMGDz8pS-gD61CBLKbd4GJRCAoudO26JzAUPYHw8dQH7m4T28FULVseebbH8bEuRsf1JsMa-RDKl0ycUpD1zYWh2fkdiem6BBrZCBDJbyMX_RPaoBVngscnZSTobvQW2-Q",
    title: "Recruiter's Best Find",
    description: "CareerVision connected me with top talent, streamlining our hiring process."
  }
];

export default Home;