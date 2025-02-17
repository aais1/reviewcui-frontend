import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Debounce Function to Delay API Calls
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch Teachers Function
  const fetchTeachers = async query => {
    if (!query) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/data/faculty?name=${query}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      const data = await response.json();
      if (data.message) {
        setSearchResults([]);
        setShowDropdown(true);
      } else {
        setSearchResults(data || []);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
    }
    setLoading(false);
  };

  // Debounced Search
  const debouncedFetchTeachers = useCallback(debounce(fetchTeachers, 500), []);

  // Handle Input Change
  const handleSearchInput = e => {
    setSearchQuery(e.target.value);
    debouncedFetchTeachers(e.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 mt-4 relative">
      {/* Search Input */}
      <input
        title={!user ? 'Just Log in dude 😎' : undefined}
        type="text"
        value={searchQuery}
        onChange={handleSearchInput}
        placeholder={user ? 'Search by professor name' : 'Please Login First'}
        disabled={!user}
        className={`w-full max-w-xl px-4 py-2 border rounded-lg shadow-sm focus:ring ${
          user
            ? 'focus:ring-blue-500 border-gray-300'
            : 'bg-gray-100 cursor-not-allowed'
        }`}
      />

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute top-12 w-full text-center max-w-xl bg-white shadow-lg border rounded-lg overflow-hidden mt-2 z-50 max-h-60 overflow-y-auto">
          🔄 Searching...
        </div>
      )}

      {/* Dropdown Menu */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute top-12 w-full max-w-xl bg-white shadow-lg border rounded-lg overflow-hidden mt-2 z-50 max-h-60 overflow-y-auto">
          {searchResults.map(teacher => (
            <div
              key={teacher._id}
              className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/faculty-profile/${teacher._id}`)}
            >
              <span className="text-gray-900">{teacher.name}</span>
              <span className="text-blue-500 text-sm">Review Profile</span>
            </div>
          ))}
        </div>
      )}

      {/* No Results Found */}
      {showDropdown && !loading && searchResults.length === 0 && (
        <div className="absolute top-12 w-full max-w-xl bg-white shadow-lg border rounded-lg overflow-hidden mt-2 z-50 text-center max-h-60 overflow-y-auto">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
