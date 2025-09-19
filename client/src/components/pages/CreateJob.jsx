import React, { useState, useContext, useEffect } from "react";
import { createJob } from "../../api/job/job";
import { getAllCompany } from "../../api/company/company";
import { User } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { skillsData } from "../../api/skills/skills";

const CreateJob = () => {
  const navigate = useNavigate();
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [location, setLocation] = useState("");
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: null,
    location: "",
    skills: [],
    responsibilities: "",
    qualifications: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const setCompanyLocation = (companyName) => {
    const selectedCompany = companies.find(c => c.name === companyName);
    setLocation(selectedCompany.location);
    setFormData(prev => ({
      ...prev,
      location: selectedCompany.location
    }));
  };

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);

    if (value.length > 0) {
      const filtered = allSkills.filter(skill =>
        skill.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
      setShowSkillDropdown(true);
    } else {
      setShowSkillDropdown(false);
    }
  };

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.some(s => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
      setFormData({
        ...formData,
        skills: [...formData.skills, skill.name]
      });
      setTimeout(() => setSkillInput(""), 100);
      setTimeout(() => setShowSkillDropdown(false), 100);
    }
    setTimeout(() => setSkillInput(""), 100);
    setTimeout(() => setShowSkillDropdown(false), 100);
  };

  useEffect(() => {
    setAllSkills(skillsData);
  }, []);

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill.id !== skillToRemove.id));
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove.name)
    });
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllCompany();
        setCompanies(response || []);
        setLoadingCompanies(false);
        console.log(response);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createJob(formData);
      navigate("/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Create New Job Posting
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect candidate by creating a detailed and attractive job posting
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Job Title */}
                <div className="group">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.294a2 2 0 01-1.382 1.905l-2.577.86a1 1 0 01-.632 0l-2.577-.86A2 2 0 018 14.294V8a2 2 0 012-2h4a2 2 0 012 2z" />
                      </svg>
                    </div>
                    <span>Job Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 group-hover:border-gray-300"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                {/* Company */}
                <div className="group">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span>Company</span>
                  </label>
                  <div className="relative">
                    <select
                      name="company"
                      value={formData.company?.id || ""}
                      onChange={(e) => {
                        if (e.target.value === "create") {
                          navigate('/company/create');
                        } else {
                          const selectedCompany = companies.find(c => c.id === Number(e.target.value));
                          setFormData(prev => ({
                            ...prev,
                            company: selectedCompany,
                            location: selectedCompany?.location || ""
                          }));
                          setLocation(selectedCompany?.location || "");
                        }
                      }}
                      required
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-200 text-gray-900 appearance-none bg-white group-hover:border-gray-300"
                    >
                      <option value="">Select a company</option>
                      <option value="create" className="text-blue-600 font-medium">+ Create new company</option>
                      {loadingCompanies ? (
                        <option value="" disabled>Loading companies...</option>
                      ) : (
                        companies.map(company => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))
                      )}
                    </select>
                    <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Location */}
                <div className="group">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <span>Location</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50 text-gray-600 cursor-not-allowed"
                      placeholder="Auto-filled from selected company"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="group">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-5 h-5 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span>Job Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none group-hover:border-gray-300"
                    placeholder="Describe the role, what the candidate will be doing, and what makes this opportunity exciting..."
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Responsibilities */}
                <div className="group">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <span>Key Responsibilities</span>
                  </label>
                  <div className="relative">
                    <textarea
                      name="responsibilities"
                      value={formData.responsibilities}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none group-hover:border-gray-300"
                      placeholder="• Lead development of new features&#10;• Collaborate with cross-functional teams&#10;• Mentor junior developers"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const currentValue = e.target.value;
                          e.target.value = currentValue + '\n• ';
                        }
                      }}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      Press Enter for new bullet point
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="group">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-5 h-5 bg-pink-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span>Required Skills</span>
                  </label>
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={handleSkillInputChange}
                        onBlur={() => setTimeout(() => setShowSkillDropdown(false), 200)}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 group-hover:border-gray-300"
                        placeholder="Type to search and add skills..."
                      />
                      <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    {showSkillDropdown && (
                      <div className="absolute z-20 mt-2 w-full bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-60 overflow-auto">
                        {filteredSkills.length > 0 ? (
                          filteredSkills.map(skill => (
                            <div
                              key={skill.id}
                              className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
                              onClick={() => handleSkillSelect(skill)}
                            >
                              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                              <span className="text-gray-700">{skill.name}</span>
                            </div>
                          ))
                        ) : (
                          <div className="px-6 py-4 text-gray-500 text-center">
                            <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            No matching skills found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {selectedSkills.map(skill => (
                      <div 
                        key={skill.id} 
                        className="group/skill bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 px-4 py-2 rounded-full flex items-center space-x-2 border border-pink-200 hover:from-pink-200 hover:to-purple-200 transition-all duration-200"
                      >
                        <span className="font-medium">{skill.name}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-pink-600 hover:text-red-600 hover:bg-white hover:bg-opacity-50 rounded-full p-1 transition-all duration-200 group-hover/skill:scale-110"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Qualifications */}
                <div className="group">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <div className="w-5 h-5 bg-teal-100 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <span>Required Qualifications</span>
                  </label>
                  <div className="relative">
                    <textarea
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none group-hover:border-gray-300"
                      placeholder="• Bachelor's degree in Computer Science&#10;• 5+ years of experience&#10;• Strong communication skills"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const currentValue = e.target.value;
                          e.target.value = currentValue + '\n• ';
                        }
                      }}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      Press Enter for new bullet point
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-12 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 rounded-2xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Job...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Post Job</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;