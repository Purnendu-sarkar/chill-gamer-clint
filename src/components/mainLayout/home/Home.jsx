import { useEffect, useState } from "react";
import Banner from "./Banner";
import GameCard from "../../../pages/GameCard";
import GraphComponent from "../../../pages/GraphComponent";
import ColorCatcher from "../../../pages/ColorCatcher";
import GamingGalaxy from "../../../pages/GamingGalaxy";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [highestRatedGames, setHighestRatedGames] = useState([]);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const response = await fetch("https://chill-gamer-server-gray.vercel.app/reviews");
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

  useEffect(() => {
    const fetchHighestRatedGames = async () => {
      try {
        const response = await fetch(
          "https://chill-gamer-server-gray.vercel.app/highest-rated-games"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch highest-rated games");
        }
        const data = await response.json();
        setHighestRatedGames(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHighestRatedGames();
  }, []);

  
  const cardVariants = {
    hidden: { opacity: 0, x: 50 }, 
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div>
      <Banner></Banner>

      {/* Highest Rated Games Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Highest Rated Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highestRatedGames.map((game, index) => (
              <motion.div
                key={game._id}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-8">
            <Link
              to={"/reviews"}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
            >
              Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* Extra Section 1: Graph show all games */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          All Games Ratings Overview
        </h2>
        <GraphComponent games={allGames} />
      </section>
      {/* Extra Section 2: Interactive Gaming Galaxy */}
      <GamingGalaxy></GamingGalaxy>
      {/* Extra Section 3: Provide A Game */}
      <div className="py-16 px-4 bg-black text-white">
        <h3 className="text-center text-3xl font-extrabold mb-5">
          Interactive Game Play
        </h3>
        <ColorCatcher></ColorCatcher>
      </div>
    </div>
  );
};

export default Home;
