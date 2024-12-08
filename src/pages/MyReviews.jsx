import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await fetch(
          `https://chill-gamer-server-gray.vercel.app/my-reviews?email=${user.email}`
        );
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://chill-gamer-server-gray.vercel.app/reviews/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Failed to delete review");
          }
          setReviews(reviews.filter((review) => review._id !== id));
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
        } catch (error) {
          toast.error("Failed to delete review");
          Swal.fire(
            "Error!",
            "Something went wrong. Try again later.",
            "error"
          );
        }
      }
    });
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
              <th className="border p-2 text-center"></th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Genre</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id} className="border-t">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{review.title}</td>
                <td className="border p-2">{review.genre}</td>
                <td className="border p-2">{review.rating}</td>
                <td className="border p-2">{review.year}</td>
                <td className="border p-2 space-x-5 items-center">
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
