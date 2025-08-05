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
    coordinates: null
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
      coordinates: {
        latitude: location.latitude,
        longitude: location.longitude
      }
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
    <div className="container mx-auto mt-6 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Create a New Company
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Samsung"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Location
            </label>
            <SimplifiedMap 
              onLocationSelect={handleLocationSelect}
              height="300px"
            />
            {formData.coordinates && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {formData.coordinates.latitude.toFixed(4)}, {formData.coordinates.longitude.toFixed(4)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Overview
            </label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe what your company does..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Commitments
            </label>
            <textarea
              name="commitment"
              value={formData.commitment}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your company values and commitments..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;