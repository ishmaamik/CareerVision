import React from "react";

const CareerVisionHome = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden bg-[#f8fafc]">
      <style>
        {`
          :root {
            --primary-color: #0c7ff2;
            --secondary-color: #e0f2fe;
            --background-color: #f8fafc;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --accent-color: #bfdbfe;
          }
          body {
            font-family: 'Inter', sans-serif;
            background-color: var(--background-color);
            color: var(--text-primary);
          }
          .main_container {
            max-width: 1280px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          .card {
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
            padding: 1.5rem;
            transition: all 300ms ease-in-out;
          }
          .card:hover {
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            transform: translateY(-0.25rem);
          }
          .button_primary {
            background-color: var(--primary-color);
            color: white;
            border-radius: 0.375rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            font-weight: 600;
            font-size: 1rem;
          }
          .button_primary:hover {
            background-color: #2563eb;
          }
          .button_secondary {
            background-color: var(--secondary-color);
            color: var(--primary-color);
            border-radius: 0.375rem;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            font-weight: 500;
          }
          .button_secondary:hover {
            background-color: #bfdbfe;
          }
          .input {
            background-color: white;
            border: 1px solid #cbd5e1;
            border-radius: 0.375rem;
            padding: 0.75rem 1rem;
            width: 100%;
          }
          .input:focus {
            outline: none;
            ring: 2px solid var(--primary-color);
            border-color: transparent;
          }
        `}
      </style>

      {/* Main Content */}
      <main className="flex-1 px-22">
        {/* Hero Section - Fixed */}
        <section
          className="relative py-24 md:py-32 flex items-center justify-center text-center bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfzq10pfpwpskDYJBKsH2QpZUHvJ9LQaz1Vi017MvzING3yE_e6owsAbD52XSKjfletP0vs8iV6zEXuorLBkJB94Da3hk2fG7OPlx0Gfc1b5qAyXbcdEA5oD27qS6wIQFj7mzsjbO4lub1Cuf1dVosGDRuW4sMZ2IUUoR1LuqZ6dfrZTmD5qnWutmZevzrAVM8ZZ2PCXXckztCEcMvjGdJ74NRYHXzdT0PIeAAiJfi_SWArkL0jxTBujJXD3RINz6U5rFi9buHRpQ")',
          }}
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Find Your Path to Success
              </h1>
              <p className="mt-4 text-lg md:text-xl text-slate-200">
                Explore career options, connect with mentors, and discover
                opportunities that match your skills and interests.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  className="bg-white border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  placeholder="Search for skills or interests"
                  type="search"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-3 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Career Paths */}
        <section className="main_container">
          <div className="relative mb-8">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] relative inline-block">
                Trending Career Paths
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              {
                title: "Software Engineering",
                description: "Develop innovative software",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAaQhRgTr8e7O_DaZTme6ZjWi7zCad3CeWkh5lyB5yQUS6JAFYewV1g48CREqJezegO3nW8klX4WU_drpCCfiqTD1qr2Q7y33fY9IyjvottAq_9GGHFB94H12Kbpm66X03b4N4mYo9Qyo-oyg0sCMizjkR0kpda-s9Q57uJjlEOEGwMi5WDxECnRd1HUH4iwThAEJRfc0Rt_Q16vdLHeDg_0baEetEEa0vFw_qHkBwseJEiaiWZmkoGTZjtGA5C8CIdZ8AVAWzBBg4",
              },
              {
                title: "Data Science",
                description: "Analyze data to drive decisions",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0XhEWa00Vonx0kGcRRHAAP3cbI9TOU33hSIxruo3DET0l-HtB3kCmwWwZrAPuSrB6ffoNxDARn9CtbDTMAladHhSbvrCj-k_MET8oTwsUAupWRTFYeJR_Q0_IOUyBD4F8hUgClRGPN3EF7wLInASRHb5ee_310nRkgx_uoihKMwFKokCkpOpbs-OC_6IQ5uEfYDB36Db30VCiw1kT-zOPvGg_9ow9XwVW9_vMh_oqVEtQhK-z8dFqhvSywe0MIdtEzD013zgncJI",
              },
              {
                title: "Product Management",
                description: "Lead product strategy",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCisJIGaZ6JFkLX1eLHzeGfS6cvAnKgxpXatTw8LtE43Ss-w0rTU8JPSIO941oi2cTSrDLDYx4ifIe2e0gjAgvLkiG6AiRXVujpVvcWOnnrZCs8I_kIAcX_0XXwQdt237RdOVSo13--oyZhwu-WLoz77_lCYa1ulhmSeUvwDNJ-5vZEfrFIBXVBxErTdx_Xd92Jx6UdoeqJhORQPBPUo9I5CfOUXCQUjj-_-ACv1aRwhF0Nf8DTtWTAVrOKGa1DnxePG-aFUyR463M",
              },
              {
                title: "Marketing",
                description: "Create compelling campaigns",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCScf2DcEcIuqQarxnmUs2UKI7Rv0uOiwG7xhTZX0FKaxU6IbLAkZDULweidR1pKqmpFGN1S5WwCerz0qevmfw3s3gCI8zYZrHDzoY2lWvWMkR5GqCT9_aH7cWfZpPoN5R7U6ggHrz_m8N5HayTNBe5s1YhQkx46XO12_EugbOoJo2LRfBupNjzYpmMBb7GShABueUXevD9Gnv3lT_own-glA1SEQb-H-O5cIAHuf2IN4f6rDF5dK4KxD74r_iBGns7EBqIkt6LjGA",
              },
              {
                title: "Finance",
                description: "Manage financial resources",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCwwKPnQe0q9NyZiSbgg2K00JU0JckOqr-8-0t0EVp5hKWI0q22Ol9OS9By5LUeGxVLqRj73fY0fscPAMOGu8nx3Ncbb8S6Ao9PI4cEZNrlBUv41Zp1cf_W9cysKQV_Ji-3JNNr9jvWVewOC6jDSJQaKyvqdp3uwGN1ZcNAwoPm6pkunn2pmadvde0exruFL4jQVhYkhgkiVp61aCCCnmMo_SHY3En-BJWfCOSmSniKhUsjZAFxUY9V-jgNlJldmW6XY5uCd7Yzj2I",
              },
              {
                title: "Design",
                description: "Design user-centered products",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCMCZUegPXjiV8PBQUQvuX2POJt8MpaFNvyQJIFskdH48AmMU0NSxFl9anB7IWFrbCAtxWoFR7eY5xCP9b6iJwG2owmzkFHZpqZLaABDnXI0pH1fvrKhtnnbOvq_xbmbAL-j94Vn3QiaG4XaZEdeSN1HZ1Sf78Wjne2stzxu_gPxwWhJ4J5HodbtNHmkhyOESsykKwNHrnVyExK-7OuIS3KC-EWEhs0H8I0SvTaC6GJAHP7oX099t5hIOKTqVpctvKVGAO6T3trWNg",
              },
            ].map((career, index) => (
              <div key={index} className="group text-center">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg mb-4 shadow-md transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${career.image})` }}
                ></div>
                <h3 className="font-semibold text-lg text-[var(--text-primary)]">
                  {career.title}
                </h3>
                <p className="typography_body">{career.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white py-8">
          <div className="main_container">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] inline-block relative pb-2">
                What Our Users Say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sophia Carter",
                  role: "Software Engineer",
                  quote:
                    "CareerVision helped me find my dream job in tech. The mentorship and resources were invaluable.",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuChDgnKyL3q_5aqDnJW6AzB4RTMTTUF58ld0PzRy2e6nj1T4PQswFMlV5EFgz2ayvGaQ5FS699ciexgPRxFzoFZbPL8OEk9pnsslpZmXChCkmzbeKVlbamf4dWRQTPP-tcYk2ZIaYQCeFM5zcXow7CJUSG6fWQJ7tfyTIkp5KhB0WbPs5vUerTFYw0nYRKurMmNy1eMJagKuhkPBXG0YDEdF9fLpKM13rUSSK0M4eXcFUOfux-6UODPY-Agvp2GjV9EgopJ-KNchTI",
                },
                {
                  name: "Ethan Walker",
                  role: "Data Scientist",
                  quote:
                    "I was able to transition to a new career path thanks to the guidance and support I received.",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuD1wKP3oqFOBRL3WJldWyCP2KM02rfjqIzlW-dDjyHVlDfgb_J4WeQoGr6xAtoIhF9zvWsbvu7Re2tdOilRxPpPSACikOaloCkEDGi72MlQT4JkRALylaRgcK2XmrJz8vyglqdaKIdpyuSWDRVTnVZc5O1BSQiWZzBOWJi7hKQSbv8TxmtK9qFszkKEQjmSlPRgpAHQEeVmsEKeggSba1Nr0duz5KuhIMBZGXue_SNscTB34hEeIKlYep-DLN9odzsQEKXaCaDtd-E",
                },
                {
                  name: "Olivia Bennett",
                  role: "Product Manager",
                  quote:
                    "The platform connected me with opportunities I wouldn't have found otherwise.",
                  image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDZEzeDRcAwTN92TaPu-mh-rCu7MkejsDFOTrt_OAsk6hxHB8OM6gqRFUe8y2A0v9orADSWxvBIUlRnWKyVIfaCf5LvBoPOYHigQOKP7VbUV0Z-4jvlDInir4hAQ8SWiF_XzZ-khYdsv5VGxtCdJB-L0FYBu8DdNeTxaJ0oWHTMfoKgHlu9dCBFDL9GXxdxcdJl-q1pz8dMykQgQKFJD19AXTLRwUUFSBUG-klMDHEdEm2GlY9Otl22sHoMkJC4FyUVA9ZqZK_7quA",
                },
              ].map((testimonial, index) => (
                <div key={index} className="card">
                  <div className="flex items-center mb-4">
                    <div
                      className="w-16 h-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full mr-4"
                      style={{ backgroundImage: `url(${testimonial.image})` }}
                    ></div>
                    <div>
                      <h3 className="font-semibold text-lg text-[var(--text-primary)]">
                        {testimonial.name}
                      </h3>
                      <p className="typography_body">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="typography_body italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Fixed */}
        <section className="container mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-lg p-10 md:p-16 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ready to start your journey?
            </h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto mb-8">
              Join thousands of others who have found their dream careers
              through CareerVision. Get personalized guidance and unlock your
              potential today.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-3 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
              Get Started Now
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6 md:mb-0">
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                href="#"
              >
                About Us
              </a>
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                href="#"
              >
                Contact
              </a>
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                href="#"
              >
                Terms of Service
              </a>
            </div>
            <div className="flex justify-center gap-4 mb-6 md:mb-0">
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                href="#"
              >
                <svg
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 256 256"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                </svg>
              </a>
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                href="#"
              >
                <svg
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 256 256"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                </svg>
              </a>
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                href="#"
              >
                <svg
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 256 256"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                </svg>
              </a>
            </div>
            <p className="text-sm text-center text-[var(--text-secondary)]">
              © 2024 CareerVision. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareerVisionHome;
