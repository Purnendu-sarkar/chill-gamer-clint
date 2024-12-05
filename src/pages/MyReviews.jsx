import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/my-reviews?email=${user.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        toast.error("Failed to load reviews");
      }
    };

    fetchUserReviews();
  }, [user.email]);

  const handleDelete = async (id) => {
    console.log("Paici", id)
    const confirm = window.confirm("Are you sure you want to delete this review?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:5000/reviews/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      toast.success("Review deleted successfully");
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews added yet</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-t">
                <td className="border p-2">{review.title}</td>
                <td className="border p-2">{review.rating}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => navigate(`/reviews/${review._id}`)}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReviews;
