const SearchBar = () => {
  return (
    <div className="flex justify-center mt-4 w-full">
      <input
        type="text"
        placeholder="Search by professor name "
        className="w-full max-w-xl px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      />
      <button className="bg-gray-900 cursor-pointer text-white px-4 py-2 rounded-lg ml-2">
        🔍 <span className="hidden md:inline">Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
