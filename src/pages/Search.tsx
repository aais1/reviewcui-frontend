import React, { useState } from 'react';
import FacultyCard from '../components/FacultyCard';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const facultyData = {
    _id: '67ab4c9cdbc12670b814f620',
    name: 'Dr Zia-ur-Rehman asdas',
    profileImage:
      'https://www.cuiatd.edu.pk/wp-content/uploads/faculty_members/drzia-ur-rehman_computersciences.png',
    profileLink: 'https://www.cuiatd.edu.pk/faculty/dr-zia-ur-rehman/',
    designation: 'Tenured Associate Professor',
    hecApproved: true,
    interest: 'Cloud Service Management',
    department: 'Computer Science',
    rating: 4.2,
    reviews: 100,
  };
  const [loading, setLoading] = useState(false);

  return (
    <div className=" bg-gray-100 ">
      <div className="bg-white">
        {/* Search Bar */}
        <div className="flex md:w-[50vw] md:mx-auto md:shadow-lg md:p-6 md:mt-6 flex-col md:flex-row justify-between items-center p-6 space-y-4 md:space-y-0 md:space-x-4 mb-6 md:border border-opacity-50 rounded-4xl">
          {/* Search Input */}
          <div className="flex flex-col md:flex-row gap-2 md:items-center justify-center mx-auto w-full ">
            <input
              type="text"
              placeholder="Search by professor name"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <div className="flex md:w-auto  w-full">
              {/* Department Dropdown */}
              <div className="flex space-x-4 md:w-auto  w-full ">
                <select
                  value={departmentFilter}
                  onChange={e => setDepartmentFilter(e.target.value)}
                  className=" md:flex-none w-full md:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  {/* Add more departments as needed */}
                </select>
              </div>

              <button className="bg-gray-900 flex cursor-pointer text-white px-4 py-2 rounded-lg ml-2">
                🔍 <span className="inline">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8 p-6 ">
          {loading ? (
            <div className="p-4 pb-8 flex flex-col items-center">
              <p className="text-gray-900 italic animate-pulse underline font-semibold">
                Go Ahead and search someone
              </p>
              <iframe
                src="https://giphy.com/embed/12zV7u6Bh0vHpu"
                width="480"
                height="271"
                frameBorder="0"
                class="giphy-embed"
                style={{
                  pointerEvents: 'none',
                }}
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="min-h-[43vh]">
              <h1 className="text-gray-900 md:w-[90vw] mx-auto  font-semibold text-2xl mb-8">
                Search Results
              </h1>
              <div className="md:w-[90vw] mx-auto grid gap-3 grid-cols-1 place-items-center md:grid-cols-4">
                <FacultyCard {...facultyData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
