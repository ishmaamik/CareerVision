// src/components/modals/CareerModal.jsx
import React from "react";

const CareerModal = ({ career, onClose }) => {
  if (!career) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {career.careerTitle}
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          {career.detailedDescription}
        </p>

        <div className="space-y-4 text-sm text-gray-700">
          {career.benefits && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Why Take This Career
              </h4>
              <p>{career.benefits}</p>
            </div>
          )}
          {career.idealCandidates && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Who Should Consider
              </h4>
              <p>{career.idealCandidates}</p>
            </div>
          )}
          {career.unsuitableFor && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Who It May Not Suit
              </h4>
              <p>{career.unsuitableFor}</p>
            </div>
          )}
          {career.futureOpportunities && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Future Scope</h4>
              <p>{career.futureOpportunities}</p>
            </div>
          )}
          {career.universityMajors?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-1">
                Recommended University Majors
              </h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {career.universityMajors.map((major, i) => (
                  <li key={i}>{major}</li>
                ))}
              </ul>
            </div>
          )}

          {career.recommendedSubjects?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-1">
                Recommended Subjects
              </h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {career.recommendedSubjects.map((subject, i) => (
                  <li key={i}>{subject}</li>
                ))}
              </ul>
            </div>
          )}

          {career.jobTitles?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-1">
                Typical Job Titles
              </h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {career.jobTitles.map((title, i) => (
                  <li key={i}>{title}</li>
                ))}
              </ul>
            </div>
          )}

          {career.industries?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-1">
                Industries You Can Work In
              </h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {career.industries.map((industry, i) => (
                  <li key={i}>{industry}</li>
                ))}
              </ul>
            </div>
          )}

          {career.recommendedResources?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-1">
                Useful Resources
              </h4>
              <ul className="list-disc list-inside text-blue-700 text-sm underline">
                {career.recommendedResources.map((link, i) => (
                  <li key={i}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerModal;
