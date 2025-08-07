// src/components/cards/CareerCard.jsx
import React from 'react';

const CareerCard = ({ career, onClick }) => {
  return (
    <div
      onClick={() => onClick(career)}
      className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 p-5"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{career.careerTitle}</h2>
      <p className="text-sm text-gray-600 line-clamp-3">{career.summary}</p>
    </div>
  );
};

export default CareerCard;
