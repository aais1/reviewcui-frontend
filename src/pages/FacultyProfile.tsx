import React, { useRef, useState } from 'react';

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
  university: string;
  rating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
  reviews: Review[];
}

// Dummy Data
const facultyData: Faculty = {
  _id: '67ab4c9cdbc12670b814f620',
  name: 'Dr. John Smith',
  profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
  university: 'Computer Science, University of California, Berkeley',
  rating: 4.5,
  totalReviews: 200,
  ratingDistribution: {
    5: 69,
    4: 15,
    3: 8,
    2: 3,
    1: 5,
  },
  reviews: [
    {
      id: 1,
      user: 'Samantha',
      date: 'May 12, 2023',
      rating: 5,
      comment:
        'Dr. Smith is a fantastic professor who is very knowledgeable about the subject matter. He does a great job of explaining complex concepts in a way that is easy to understand. The class has been challenging but also very rewarding.',
      likes: 2,
      replies: 0,
      userImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  ],
};

const FacultyProfile: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>(facultyData.reviews);
  const [userRating, setUserRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const reviewFieldRef = useRef<HTMLTextAreaElement>(null);

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

  // Function to handle rating submission
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

  return (
    <div className=" bg-white shadow-md rounded-lg p-6 mt-6">
      <div className="max-w-3xl  mx-auto">
        {/* Faculty Info */}
        <div className="flex items-center gap-4">
          <img
            src={facultyData.profileImage}
            alt={facultyData.name}
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h1 className="text-2xl font-semibold">{facultyData.name}</h1>
            <p className="text-gray-600">{facultyData.university}</p>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-4xl font-bold">
              {facultyData.rating.toFixed(1)}
            </span>
            <div className="flex">
              {renderStars(Math.round(facultyData.rating))}
            </div>
            <p className="text-gray-500">{facultyData.totalReviews} reviews</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <button
              className="border px-3 py-2 rounded-md"
              title="Come on help junior fellows 😾"
            >
              Rate this professor
            </button>
            <button
              className="bg-gray-900 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-black"
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

        {/* Rating Breakdown */}
        <div className="mt-4">
          {Object.keys(facultyData.ratingDistribution)
            .reverse()
            .map(star => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-6">{star} ★</span>
                <div className="w-40 h-2 bg-gray-200 rounded">
                  <div
                    style={{
                      width: `${facultyData.ratingDistribution[Number(star)]}%`,
                    }}
                    className="h-2 bg-gray-900 rounded"
                  ></div>
                </div>
                <span className="text-gray-500">
                  {facultyData.ratingDistribution[Number(star)]}%
                </span>
              </div>
            ))}
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          {/* <input
          type="text"
          placeholder="Search in reviews and questions"
          className="w-full border px-3 py-2 rounded-md text-gray-700"
          value={search}
          onChange={e => setSearch(e.target.value)}
        /> */}
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
            title="Leave a badass review here 🙊"
            rows={3}
            ref={reviewFieldRef}
            placeholder="Write your review here..."
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />
          <button
            onClick={handleSubmitReview}
            className="bg-gray-900 md:w-auto w-full text-white rounded-md px-4 py-2 mt-2 cursor-pointer hover:bg-black"
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
            <p className="text-gray-500 mt-4">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
