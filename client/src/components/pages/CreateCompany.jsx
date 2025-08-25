import React, { useState } from "react";
import { createCompany } from "../../api/company/company";
import { useNavigate } from "react-router-dom";
import SimplifiedMap from "./SimplifiedMap";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    overview: "",
    commitment: "",
    lat: null,
    lon: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      location: location.placeName,
      lat: location.latitude,
      lon: location.longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCompany(formData);
      navigate("/jobs");
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)] py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Create a New Company
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">
              Register your company to start posting job opportunities
            </p>
          </div>

          {/* Form Card */}
          <div className="themed-card p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Samsung, Google, Microsoft"
                />
              </div>

              {/* Company Location */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Company Location *
                </label>
                <div className="rounded-lg border border-[var(--border-color)] overflow-hidden">
                  <SimplifiedMap
                    onLocationSelect={handleLocationSelect}
                    height="350px"
                  />
                </div>
                {formData.lat && formData.lon && (
                  <div className="mt-3 p-3 bg-[var(--bg-secondary)] rounded-lg">
                    <p className="text-sm text-[var(--text-secondary)]">
                      📍 Selected Location: {formData.location}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Coordinates: {formData.lat.toFixed(4)},{" "}
                      {formData.lon.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>

              {/* Two Column Layout for Overview and Commitments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Company Overview */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Company Overview *
                  </label>
                  <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Describe what your company does, your mission, and what makes you unique..."
                  />
                </div>

                {/* Company Commitments */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Company Values & Commitments *
                  </label>
                  <textarea
                    name="commitment"
                    value={formData.commitment}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Describe your company values, work culture, diversity commitments, and employee benefits..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => navigate("/jobs")}
                  className="px-6 py-3 border border-[var(--border-color)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Create Company
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
