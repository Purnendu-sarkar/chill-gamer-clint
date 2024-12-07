import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import GameCard from "./GameCard";

const GENRES = [
  "All",
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Sports",
  "Simulation",
  "Puzzle",
  "Horror",
  "Fighting",
  "Racing",
];

const AllReviews = () => {
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setFilteredGames(data);
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    // TODO: Implement sorting logic
  };
  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    // TODO: Implement filtering logic
  };

  useEffect(() => {
    let updatedGames = [...games];

    
    if (selectedGenre !== "All") {
      updatedGames = updatedGames.filter(
        (game) => game.genre === selectedGenre
      );
    }

    
    updatedGames.sort((a, b) => {
      if (sortBy === "rating") {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
      } else if (sortBy === "year") {
        return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
      }
      return 0;
    });

    setFilteredGames(updatedGames);
  }, [sortBy, sortOrder, selectedGenre, games]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">All Game Reviews</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="year">Sort by Year</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
          <button
            onClick={handleSortOrderChange}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No reviews found. Be the first to add one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
