import { Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{Number.isFinite(game.rating) ? game.rating.toFixed(1) : "N/A"}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{game.year}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{game.description}</p>
          <Link
            to={`/review/${game._id}`}
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    );
  };
  
  export default GameCard;
  