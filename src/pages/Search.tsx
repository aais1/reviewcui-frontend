import { useState, useEffect } from 'react';
import FacultyCard from '../components/FacultyCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Computer Science');
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/auth/sign-in?error=Unauthorized, Please Login');
    }
    fetchFacultyData();
  }, [user, navigate]);

  const fetchFacultyData = async () => {
    setLoading(true);
    try {
      // Construct query parameters
      const params = new URLSearchParams();
      if (searchQuery) params.append('name', searchQuery);
      if (departmentFilter) params.append('department', departmentFilter);

      // Fetch from API
      const response = await fetch(
        `http://localhost:3000/data/faculty?${params.toString()}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (response.status === 401) {
        navigate('/auth/sign-in?error=Unauthorized, Please Login');
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setFacultyList(data);
      } else {
        setFacultyList([]);
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
      setFacultyList([]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="bg-white">
        {/* Search Bar */}
        <div className="flex md:w-[50vw] md:mx-auto md:shadow-2xl md:p-6 md:mt-10 flex-col md:flex-row justify-between items-center p-6 space-y-4 md:space-y-0 md:space-x-4 md:mb-6 md:border border-opacity-50 rounded-4xl fixed bottom-0 w-full md:sticky md:top-20 bg-white z-50">
          {/* Search Input */}
          <div className="flex flex-col md:flex-row gap-2 md:items-center justify-center mx-auto w-full">
            <input
              type="text"
              placeholder="Search by professor name"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <div className="flex md:w-auto w-full">
              {/* Department Dropdown */}
              <div className="flex space-x-4 md:w-auto w-full">
                <select
                  title="Select a department"
                  value={departmentFilter}
                  onChange={e => setDepartmentFilter(e.target.value)}
                  className="md:flex-none w-full md:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <button
                className="bg-gray-900 flex cursor-pointer text-white px-4 py-2 rounded-lg ml-2"
                onClick={fetchFacultyData}
              >
                🔍 <span className="inline">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-8 p-6">
          {loading ? (
            <div className="p-4 pb-8 flex flex-col items-center">
              <p className="text-gray-900 italic animate-pulse underline font-semibold">
                Searching...
              </p>
              <iframe
                src="https://giphy.com/embed/12zV7u6Bh0vHpu"
                width="480"
                height="271"
                frameBorder="0"
                className="giphy-embed"
                style={{ pointerEvents: 'none' }}
                allowFullScreen
              ></iframe>
            </div>
          ) : facultyList.length > 0 ? (
            <div className="min-h-[43vh]">
              <h1 className="text-gray-900 md:w-[90vw] mx-auto font-semibold text-2xl mb-8">
                Search Results
              </h1>
              <div className="md:w-[90vw] mx-auto grid gap-3  place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {facultyList.map((faculty: any) => (
                  <FacultyCard key={faculty._id} {...faculty} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center min-h-[30vh] text-gray-500 italic">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
