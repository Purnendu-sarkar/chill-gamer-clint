import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import toast from 'react-hot-toast';

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

const AddReview = () => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coverImage: '',
    title: '',
    description: '',
    rating: '',
    year: new Date().getFullYear(),
    genre: '',
    userEmail: user?.email || '',
    userName: user?.displayName || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/add-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.insertedId) {
        toast.success('Review added successfully!');
        navigate('/reviews'); 
      } else {
        toast.error('Failed to add review');
      }
    } catch (error) {
      toast.error('Error occurred while adding review');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Review</h1>
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
              {GENRES.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">User Email</label>
          <input
            type="email"
            name="userEmail"
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={formData.userEmail}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">User Name</label>
          <input
            type="text"
            name="userName"
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={formData.userName}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding Review...' : 'Add Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
