import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Star, Clock, GamepadIcon, Heart } from "lucide-react";
import toast from "react-hot-toast";

const ReviewDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  // console.log(review);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/reviews/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch review details");
        }
        const data = await response.json();
        setReview(data);

        if (user) {
          const watchlistResponse = await fetch(
            `http://localhost:5000/check-watchlist/${id}?email=${user.email}`
          );
          const watchlistData = await watchlistResponse.json();
          setIsInWatchlist(watchlistData.exists);
        }
      } catch (error) {
        console.error(error);
        toast.error("Review not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [id, user]);

  const handleAddToWatchlist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isInWatchlist) {
      toast.error("This review is already in your watchlist!");
      return;
    }

    const watchlistItem = {
      reviewId: id,
      userName: user.displayName,
      userEmail: user.email,
      coverImage: review.coverImage,
      title: review.title,
      genre: review.genre,
      rating: review.rating,
      description: review.description,
    };

    try {
      const response = await fetch("http://localhost:5000/addToWatchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchlistItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add to watchlist");
      }

      const result = await response.json();
      if (result.insertedId) {
        setIsInWatchlist(true);
        toast.success("Added to watchlist!");
      } else {
        toast.error("Failed to add to watchlist");
      }
    } catch (error) {
      toast.error("Failed to add to watchlist");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Review not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={review.coverImage}
          alt={review.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{review.title}</h1>
            <button
              onClick={handleAddToWatchlist}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                isInWatchlist
                  ? "bg-purple-100 text-purple-600"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              <Heart
                className={`h-5 w-5 ${isInWatchlist ? "fill-current" : ""}`}
              />
              <span>{isInWatchlist ? "In Watchlist" : "Add to Watchlist"}</span>
            </button>
          </div>

          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="font-semibold">
                {Number(review.rating).toFixed(1) || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              <span>{review.year}</span>
            </div>
            <div className="flex items-center">
              <GamepadIcon className="h-5 w-5 mr-1" />
              <span>{review.genre}</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6 whitespace-pre-line">
            {review.description}
          </p>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-3">
              <h4 className="font-extrabold text-2xl mr-5">owner</h4>
              <div>
                <p className="font-semibold">{review.userName}</p>
                <p className="text-sm text-gray-500">{review.userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
