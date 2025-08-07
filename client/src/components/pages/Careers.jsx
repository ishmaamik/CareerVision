// src/pages/Careers.jsx
import React, { useEffect, useState } from "react";
import CareerCard from "../cards/CareerCard";
import CareerModal from "../modals/CareerModal";
import { getAllCareers } from "../../api/career/careerApi";

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [modalCareer, setModalCareer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCareers();
        if (Array.isArray(data)) {
          setCareers(data);
          setFiltered(data);
        }
      } catch (error) {
        console.error("Error loading careers", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const result = careers.filter((career) =>
      career.careerTitle.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, careers]);

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 px-4 sm:px-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Career Opportunities
      </h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search career titles..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((career) => (
          <CareerCard
            key={career.id}
            career={career}
            onClick={setModalCareer}
          />
        ))}
      </div>

      <CareerModal career={modalCareer} onClose={() => setModalCareer(null)} />
    </div>
  );
};

export default Careers;
