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
    const selectedCompany = companies.find((c) => c.name === companyName);
    setLocation(selectedCompany.location);
    setFormData((prev) => ({
      ...prev,
      location: selectedCompany.location,
    }));
  };

  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);

    if (value.length > 0) {
      const filtered = allSkills.filter((skill) =>
        skill.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
      setShowSkillDropdown(true);
    } else {
      setShowSkillDropdown(false);
    }
  };

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
      setFormData({
        ...formData,
        skills: [...formData.skills, skill.name],
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
    setSelectedSkills(
      selectedSkills.filter((skill) => skill.id !== skillToRemove.id)
    );
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove.name),
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
    try {
      await createJob(formData);
      navigate("/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)] py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Post a New Job
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">
              Find the perfect candidate for your open position
            </p>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="themed-card p-6 sm:p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <select
                    name="company"
                    value={formData.company?.id || ""}
                    onChange={(e) => {
                      if (e.target.value === "create") {
                        navigate("/company/create");
                      } else {
                        const selectedCompany = companies.find(
                          (c) => c.id === Number(e.target.value)
                        );
                        setFormData((prev) => ({
                          ...prev,
                          company: selectedCompany,
                          location: selectedCompany?.location || "",
                        }));
                        setLocation(selectedCompany?.location || "");
                      }
                    }}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a company</option>
                    <option value="create">Create a company</option>
                    {loadingCompanies ? (
                      <option value="" disabled>
                        Loading companies...
                      </option>
                    ) : (
                      companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    disabled
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., New York, NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter detailed job description..."
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Responsibilities
                  </label>
                  <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="List key responsibilities..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const currentValue = e.target.value;
                        e.target.value = currentValue + "\n• "; // Add bullet on enter
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={handleSkillInputChange}
                      onBlur={() =>
                        setTimeout(() => setShowSkillDropdown(false), 200)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type to search skills..."
                    />
                    {showSkillDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {filteredSkills.length > 0 ? (
                          filteredSkills.map((skill) => (
                            <div
                              key={skill.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSkillSelect(skill)}
                            >
                              {skill.name}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500">
                            No matching skills found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                      >
                        {skill.name}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 text-gray-500 hover:text-red-500 bg-transparent p-0 border-0"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualifications
                  </label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="List required qualifications..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const currentValue = e.target.value;
                        e.target.value = currentValue + "\n• "; // Add bullet on enter
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Submit buttons at bottom */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
