import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GamingGalaxy = () => {
    const [allGames, setAllGames] = useState([]);
    useEffect(() => {
        const fetchAllGames = async () => {
          try {
            const response = await fetch("http://localhost:5000/reviews");
            if (!response.ok) {
              throw new Error("Failed to fetch all games");
            }
            const data = await response.json();
            setAllGames(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchAllGames();
      }, []);
  return (
    <section className="py-16 px-4 bg-black text-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        Interactive Gaming Galaxy
      </h2>
      <div className="max-w-7xl mx-auto relative h-96 bg-gradient-to-br from-gray-800 to-black rounded-lg">
        {allGames.map((game) => (
          <div
            key={game._id}
            className="absolute"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              transform: "translate(-50%, -50%)",
            }}
            title={`${game.title}: ${game.rating} ⭐`}
          >
            <button
              className="bg-yellow-500 rounded-full w-4 h-4 focus:outline-none"
              onClick={() =>
                toast(` Details:${game.title}\nRating: ${game.rating}`)
              }
            ></button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GamingGalaxy;
