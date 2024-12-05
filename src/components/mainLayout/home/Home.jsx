import { useEffect, useState } from "react";
import Banner from "./Banner";
import GameCard from "../../../pages/GameCard";

const Home = () => {
  const [highestRatedGames, setHighestRatedGames] = useState([]);

  useEffect(() => {
    const fetchHighestRatedGames = async () => {
      try {
        const response = await fetch("http://localhost:5000/highest-rated-games");
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
            {highestRatedGames.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

