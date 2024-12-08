import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch(
          `https://chill-gamer-server-gray.vercel.app/myWatchlist?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch watchlist");
        }
        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">My Watchlist</h1>
      {watchlist.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4 border-b text-center"></th>
              <th className="p-4 border-b">Title</th>
              <th className="p-4 border-b">Genre</th>
              <th className="p-4 border-b">Rating</th>
              <th className="p-4 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-center">{index + 1}</td>
                <td className="p-4">{item.title}</td>
                <td className="p-4">{item.genre}</td>
                <td className="p-4">{item.rating}</td>
                <td className="p-4">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // <p className="text-gray-500">No items in your watchlist.</p>
        <div className="h-96 flex flex-col items-center justify-center bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-white">
          {/* Error Message */}
          <motion.p
            className="text-2xl mb-12 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            No items in your watchlist.
          </motion.p>

          {/* Back to Home Button with Animation */}
          <motion.button
            className="px-6 py-3 bg-white text-pink-500 font-semibold rounded-full shadow-lg hover:bg-pink-100"
            onClick={() => navigate("/")}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Back to Home
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
