import React from "react";
import { useTheme } from "../../hooks/useTheme";

const CareerVisionHome = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Hero Section */}
      <section
        className="relative py-16 sm:py-20 md:py-24 lg:py-32 flex items-center justify-center text-center bg-cover bg-center min-h-[80vh]"
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfzq10pfpwpskDYJBKsH2QpZUHvJ9LQaz1Vi017MvzING3yE_e6owsAbD52XSKjfletP0vs8iV6zEXuorLBkJB94Da3hk2fG7OPlx0Gfc1b5qAyXbcdEA5oD27qS6wIQFj7mzsjbO4lub1Cuf1dVosGDRuW4sMZ2IUUoR1LuqZ6dfrZTmD5qnWutmZevzrAVM8ZZ2PCXXckztCEcMvjGdJ74NRYHXzdT0PIeAAiJfi_SWArkL0jxTBujJXD3RINz6U5rFi9buHRpQ")'
            : 'linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfzq10pfpwpskDYJBKsH2QpZUHvJ9LQaz1Vi017MvzING3yE_e6owsAbD52XSKjfletP0vs8iV6zEXuorLBkJB94Da3hk2fG7OPlx0Gfc1b5qAyXbcdEA5oD27qS6wIQFj7mzsjbO4lub1Cuf1dVosGDRuW4sMZ2IUUoR1LuqZ6dfrZTmD5qnWutmZevzrAVM8ZZ2PCXXckztCEcMvjGdJ74NRYHXzdT0PIeAAiJfi_SWArkL0jxTBujJXD3RINz6U5rFi9buHRpQ")',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              Find Your Path to Success
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
              Explore career options, connect with mentors, and discover
              opportunities that match your skills and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
              <input
                className="bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent w-full transition-all duration-200 placeholder-gray-400"
                placeholder="Search for skills or interests"
                type="search"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl whitespace-nowrap">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Career Paths */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4">
              Trending Career Paths
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Discover the most in-demand careers and find your perfect match
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 max-w-7xl mx-auto">
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
                  className="themed-card w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundImage: `url(${career.image})` }}
                ></div>
                <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-[var(--text-primary)] mb-1 sm:mb-2">
                  {career.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed">
                  {career.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4">
              What Our Users Say
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Real stories from people who transformed their careers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
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
              <div key={index} className="themed-card p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full mr-3 sm:mr-4 shadow-lg"
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  ></div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-[var(--text-primary)]">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="themed-card p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6">
              Ready to start your journey?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Join thousands of others who have found their dream careers
              through CareerVision. Get personalized guidance and unlock your
              potential today.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 text-sm sm:text-base"
                href="#"
              >
                About Us
              </a>
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 text-sm sm:text-base"
                href="#"
              >
                Contact
              </a>
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 text-sm sm:text-base"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 text-sm sm:text-base"
                href="#"
              >
                Terms of Service
              </a>
            </div>
            <div className="flex justify-center gap-3 sm:gap-4">
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 p-2 rounded-lg hover:bg-[var(--bg-primary)]"
                href="#"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 p-2 rounded-lg hover:bg-[var(--bg-primary)]"
                href="#"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 p-2 rounded-lg hover:bg-[var(--bg-primary)]"
                href="#"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <p className="text-xs sm:text-sm text-center text-[var(--text-secondary)]">
              © 2024 CareerVision. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareerVisionHome;
