import SearchBar from '../components/SearchBar';

const Home = () => {
  // Dummy professor data (Replace this with API call)
  const professors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      department: 'Mathematics',
      rating: 4.7,
      reviews: 98,
    },
    {
      id: 3,
      name: 'Dr. Emily Parker',
      department: 'Physics',
      rating: 4.9,
      reviews: 86,
    },
  ];

  return (
    <div className="bg-white">
      {/* <img
        src="https://assets.api.uizard.io/api/cdn/stream/0c2ad4f9-cf8d-4bd2-93da-995a9ed144c0.png"
        alt=""
        className="w-screen h-128 object-cover"
      /> */}
      <div
        className="relative bg-cover z-0 bg-center min-h-[250px] md:min-h-[300px] px-6 py-10 md:py-20 flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            'url(https://assets.api.uizard.io/api/cdn/stream/0c2ad4f9-cf8d-4bd2-93da-995a9ed144c0.png)',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold">
            Find & Rate Your Professors
          </h1>
          <p className="mt-2 text-lg md:text-xl opacity-90">
            Empower your learning experiences
          </p>
        </div>
      </div>

      <div className="px-2 py-4 md:px-8 md:py-6 md:pb-12">
        <div className="flex flex-col py-12 items-center justify-center">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            Find & Rate Your Professors
          </h1>

          {/* Search Bar */}
          <SearchBar />
        </div>

        {/* Filters
      <div className="flex justify-center gap-4 mt-6">
        <select
          title="Select department"
          className="border px-4 py-2 rounded-md"
        >
          <option>All Departments</option>
          <option>Computer Science</option>
          <option>Mathematics</option>
          <option>Physics</option>
        </select>
        <select className="border px-4 py-2 rounded-md">
          <option>Rating: All</option>
          <option>5 Stars</option>
          <option>4 Stars & Above</option>
        </select>
        <select className="border px-4 py-2 rounded-md">
          <option>Sort By</option>
          <option>Most Reviewed</option>
          <option>Highest Rated</option>
        </select>
      </div> */}

        {/* Top Rated Faculty */}
        <h2 className="text-xl font-semibold mt-8">Top Rated Faculty</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {professors.map(prof => (
            <div
              key={prof.id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-300 size-12 rounded-full"></div>
                <div>
                  <h3 className="text-lg font-semibold">{prof.name}</h3>
                  <p className="text-sm text-gray-600">{prof.department}</p>
                  <p className="text-sm font-medium">
                    ⭐ {prof.rating} ({prof.reviews} reviews)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
