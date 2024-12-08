import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const GENRES = [
   'Action',
   'Adventure',
   'RPG',
   'Strategy',
   'Sports', 
   'Simulation',
   'Puzzle',
   'Horror',
   'Fighting',
   'Racing'
];

const UpdateReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coverImage: '',
    title: '',
    description: '',
    rating: '',
    year: '',
    genre: ''
  });
  const [loading, setLoading] = useState(false);

  


  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`https://chill-gamer-server-gray.vercel.app/my-reviews/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch review data");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        toast.error("Error loading review data");
      }
    };
    fetchReview();
  }, [id]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://chill-gamer-server-gray.vercel.app/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Review updated successfully!");
        navigate("/my-reviews");
      } else {
        toast.error("Failed to update review");
      }
    } catch (error) {
      toast.error("An error occurred while updating the review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Update Review</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Game Cover Image URL</label>
          <input
            type="url"
            name="coverImage"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.coverImage}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Game Title</label>
          <input
            type="text"
            name="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Review Description</label>
          <textarea
            name="description"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating (1-10)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="10"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Release Year</label>
            <input
              type="number"
              name="year"
              min="1970"
              max={new Date().getFullYear()}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.year}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            <select
              name="genre"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={formData.genre}
              onChange={handleChange}
            >
              <option value="">Select a genre</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReview;
