import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Review {
  id: number;
  user: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
  replies: number;
  userImage: string;
}

interface Faculty {
  _id: string;
  name: string;
  profileImage: string;
  profileLink: string;
  designation: string;
  department: string;
  hecApproved: boolean;
  interest: string;
  totalReviews: number;
  rating: string;
  ratingDistribution: Record<number, number>;
  reviews: Review[];
}

const FacultyProfile: React.FC = () => {
  const { id } = useParams(); // Get faculty ID from URL
  const [facultyData, setFacultyData] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const reviewFieldRef = useRef<HTMLTextAreaElement>(null);

  // Fetch faculty data dynamically by ID
  useEffect(() => {
    const fetchFacultyData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/data/faculty?id=${id}`,
          { credentials: 'include' }
        );
        if (!response.ok) throw new Error('Failed to fetch faculty data.');

        const data = await response.json();
        if (!data || data?.length === 0) throw new Error('Faculty not found.');

        setFacultyData(data[0]); // Assuming API returns an array
        setReviews(data[0].reviews);
        setError(null);
      } catch (error) {
        setError('Error loading faculty profile. Please try again later.');
      }
      setLoading(false);
    };

    if (id) fetchFacultyData();
  }, [id]);

  // Function to render stars dynamically
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(null)
      .map((_, i) =>
        i < rating ? (
          <span key={i} className="text-yellow-500 text-xl">
            ★
          </span>
        ) : (
          <span key={i} className="text-gray-400 text-xl">
            ★
          </span>
        )
      );
  };

  // Function to handle review submission
  const handleSubmitReview = () => {
    if (userRating === 0 || reviewText.trim() === '') {
      alert('Please provide a rating and a review.');
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      user: 'New User',
      date: new Date().toLocaleDateString(),
      rating: userRating,
      comment: reviewText,
      likes: 0,
      replies: 0,
      userImage: 'https://randomuser.me/api/portraits/men/46.jpg',
    };

    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setReviewText('');
  };

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-6">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6 ">
      <div className="md:w-[75vw] mx-auto">
        <div className="flex md:flex-row flex-col w-full justify-between items-start">
          {/* Faculty Info */}
          <div className="flex w-full items-start gap-4">
            <img
              src={facultyData?.profileImage}
              alt={facultyData?.name}
              className="w-24 h-24 rounded-full border"
            />
            <div>
              <h1 className="text-2xl font-semibold">{facultyData?.name}</h1>
              <p className="text-gray-600">
                {facultyData?.designation} -{' '}
                <strong>{facultyData?.department}</strong>
              </p>
              <p className="text-sm text-gray-500 md:w-[85%]">
                Research Interest: {facultyData?.interest}
              </p>
              <a
                href={facultyData?.profileLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View Official Profile
              </a>
            </div>
          </div>

          <div className="flex flex-row md:flex-col md:w-[35%] w-full text-end mt-6 justify-center gap-4 md:mt-0 md:justify-end items-start md:gap-2">
            <button
              className="border px-3 py-2 md:w-full rounded-md"
              title="Come on help junior fellows 😾"
            >
              Rate this professor
            </button>
            <button
              className="bg-gray-900 md:w-full cursor-pointer text-white px-4 py-2 rounded-md hover:bg-black"
              onClick={() => {
                if (reviewFieldRef.current) {
                  (reviewFieldRef.current as HTMLTextAreaElement).focus();
                  reviewFieldRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }
              }}
            >
              Write a review
            </button>
          </div>
        </div>
        {/* Rating Overview */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-4xl font-bold">{facultyData?.rating}</span>
            <div className="flex">
              {renderStars(
                Math.round(parseFloat(facultyData?.rating || '0.0'))
              )}
            </div>
            <p className="text-gray-500">{facultyData?.totalReviews} reviews</p>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="mt-4">
          {Object.keys(facultyData?.ratingDistribution || {})
            .reverse()
            .map(star => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-6">{star} ★</span>
                <div className="w-40 h-2 bg-gray-200 rounded">
                  <div
                    style={{
                      width: `${
                        facultyData?.ratingDistribution[Number(star)]
                      }%`,
                    }}
                    className="h-2 bg-gray-900 rounded"
                  ></div>
                </div>
                <span className="text-gray-500">
                  {facultyData?.ratingDistribution[Number(star)]}%
                </span>
              </div>
            ))}
        </div>

        {/* Review Submission */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold">Write a Review</h2>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} onClick={() => setUserRating(star)}>
                {star <= userRating ? (
                  <span className="text-yellow-500 text-2xl">★</span>
                ) : (
                  <span className="text-gray-400 text-2xl">★</span>
                )}
              </button>
            ))}
          </div>
          <textarea
            className="w-full mt-2 border rounded p-2 text-sm"
            ref={reviewFieldRef}
            placeholder="Write your review here..."
            rows={3}
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />
          <button
            onClick={handleSubmitReview}
            className="bg-gray-900 text-white rounded-md px-4 py-2 mt-2 hover:bg-black"
          >
            Submit Review
          </button>
        </div>

        {/* Review List */}
        <div className="mt-6">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="border-b py-4">
                <div className="flex gap-3 items-center">
                  <img
                    src={review.userImage}
                    alt={review.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{review.user}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex">{renderStars(review.rating)}</div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-4">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
