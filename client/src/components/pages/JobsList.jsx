import React, { useEffect, useState } from "react";
import { createJob } from "../../api/job/job";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const [localJobs, setLocalJobs] = useState([]);
  const [externalJobs, setExternalJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'local' | 'external'
  const [jobTitle, setJobTitle]= useState('')
  const [jobName, setJobName]= useState('')
  const [jobLocation, setJobLocation]= useState('')
  const [jobDescription, setjobDescription]= useState('')
  const navigate= useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/jobs/all")
      .then((res) => setLocalJobs(res.data))
      .catch((err) => console.error("Error fetching local jobs:", err));
  }, []);

  const handleSearch = async () => {
    if (!keyword || !location) {
      alert("Please enter both keyword and location");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/jobs/external`, {
        params: { keyword, location },
      });
      setExternalJobs(res.data);
    } catch (error) {
      console.error("Error fetching external jobs:", error);
      setExternalJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = (jobs) => {
    return jobs.filter((job) =>
      job.title?.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const renderJobs = (jobs, type = "local") => {
    return (
      <ul style={{cursor:'pointer'}}  className="cursor:pointer grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, idx) => (
          <li
            key={idx}
            className="bg-white p-4 rounded-xl border shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold mb-1">{job.title}</h3>
            <p>
              <strong>Company:</strong>{" "}
              {type === "external" ? job.company.display_name : job.company}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {type === "external" ? job.location.display_name : job.location}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {type === "external"
                ? job.description?.substring(0, 150)
                : job.description}
              ...
            </p>
            {type === "external" ? (
              <button
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline mt-2 inline-block"
              >
                View Job
              </button>
            )
          :
          <button
                onClick={()=>navigate(`/jobs/${job.id}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2  rounded hover:bg-gray-800 "
                style={{backgroundColor:'black', color:'white'}}
                
              >
                View Job
              </button>
          }
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-20 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        {
         localStorage.getItem('role')!=='user' ?
          <button
            onClick={() => (window.location.href = "/jobs/create")}
            style={{ backgroundColor: 'black' }}
            className=" text-white px-4 py-2 rounded"
          >
            + Create Job
          </button>
          :
          <>
          
          </>
        }
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b pb-2">
        {["all", "local", "external"].map((tab) => (
          <button
            key={tab}
            className={`capitalize px-4 py-1 rounded-t ${activeTab === tab ? "bg-blue-600 text-black" : "bg-gray-200"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Jobs
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="mb-6">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by job title..."
          className="p-2 border w-full rounded"
        />
      </div>

      {/* External Job Search */}
      {activeTab === "external" && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Search External Jobs</h2>
          <div className="flex gap-4 mb-2 flex-col sm:flex-row">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Keyword (e.g. developer)"
              className="p-2 border rounded w-full sm:w-1/2"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (e.g. New York)"
              className="p-2 border rounded w-full sm:w-1/2"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      )}

      {/* Job Listings by Tab */}
      {activeTab === "all" && (
        <>
          <h2 className="text-2xl font-semibold mb-3">All Jobs</h2>
          {filterJobs([...localJobs, ...externalJobs]).length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            renderJobs(filterJobs([...localJobs, ...externalJobs]), "mixed")
          )}
        </>
      )}

      {activeTab === "local" && (
        <>
          <h2 className="text-2xl font-semibold mb-3">Local Jobs</h2>
          {filterJobs(localJobs).length === 0 ? (
            <p>No local jobs found.</p>
          ) : (
            renderJobs(filterJobs(localJobs))
          )}
        </>
      )}

      {activeTab === "external" && (
        <>
          <h2 className="text-2xl font-semibold mb-3">External Jobs</h2>
          {filterJobs(externalJobs).length === 0 ? (
            <p>No external jobs to show.</p>
          ) : (
            renderJobs(filterJobs(externalJobs), "external")
          )}
        </>
      )}
    </div>
  );
};

export default Job;
