import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For smooth animations

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-white">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-9xl font-bold mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        404
      </motion.h1>

      {/* Error Message */}
      <motion.p
        className="text-2xl mb-12 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Oops! The page you're looking for doesn't exist.
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
  );
};

export default ErrorPage;


