import { BiChevronDown, BiMenu, BiSearch } from "react-icons/bi";
import CustomModal from "../Modal/Modal.Component";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection

const apiKey = process.env.REACT_APP_IPSTACK_KEY;
const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
const omdbApiUrl = "https://www.omdbapi.com/";

function NavSm({ defaultLocation }) {
  return (
    <>
      <div className="text-white flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">It All Starts Here!</h3>
          <span className="text-gray-400 text-xs flex items-center cursor-pointer hover:text-white">
            {defaultLocation || "Select your location"}
          </span>
        </div>
        <div className="w-8 h-8">
          <BiSearch className="w-full h-full" />
        </div>
      </div>
    </>
  );
}

function NavMd({ onSearch, searchResults, onMovieClick }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Call the search function
  };

  return (
    <>
      <div className="w-full flex items-center gap-3 bg-white px-3 py-1 rounded-md relative">
        <BiSearch />
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full bg-transparent border-none focus:outline-none"
          placeholder="Search for movies..."
        />
        {searchResults.length > 0 && (
          <ul className="absolute top-10 left-0 w-full bg-white shadow-lg z-10 rounded-md">
            {searchResults.map((movie) => (
              <li
                key={movie.imdbID}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => onMovieClick(movie.imdbID)}
              >
                {movie.Title} ({movie.Year})
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function NavLg({ defaultLocation, onSearch, searchResults, onMovieClick }) {
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await axios.get(
                `https://api.ipstack.com/check?access_key=${apiKey}`
              );
              setLocation(response.data.city);
            } catch (error) {
              console.error("Error getting user location:", error);
              setLocation(defaultLocation);
            }
          },
          (error) => {
            console.error("Error getting user location:", error);
            setLocation(defaultLocation);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser");
        setLocation(defaultLocation);
      }
    };

    getUserLocation();
  }, [defaultLocation]);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Call the search function
  };

  return (
    <>
      <div className="container flex mx-auto px-4 items-center justify-between">
        <div className="flex items-center w-1/2 gap-3">
          <div className="w-10 h-10">
            <img
              src="https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png"
              alt="logo"
              className="w-full h-full"
            />
          </div>
          <div className="w-full flex items-center gap-3 bg-white px-3 py-1 rounded-md relative">
            <BiSearch />
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-transparent border-none focus:outline-none"
              placeholder="Search for movies, events, plays, sports and activities"
            />
            {searchResults.length > 0 && (
              <ul className="absolute top-10 left-0 w-full bg-white shadow-lg z-10 rounded-md">
                {searchResults.map((movie) => (
                  <li
                    key={movie.imdbID}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => onMovieClick(movie.imdbID)}
                  >
                    {movie.Title} ({movie.Year})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-200 text-base flex items-center cursor-pointer hover:text-white">
            {location || "Select your location"}
          </span>
          <CustomModal />
          <div className="w-8 h-8 text-white">
            <BiMenu className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
}

// Main NavBar Component
const Navbar = ({ defaultLocation }) => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // To navigate to the details page

  const searchMovies = async (query) => {
    if (query.length === 0) {
      setSearchResults([]); // Clear results when query is empty
      return;
    }

    try {
      const response = await axios.get(omdbApiUrl, {
        params: {
          apikey: omdbApiKey,
          s: query, // OMDB search by title
        },
      });
      console.log(response.data);
      if (response.data.Search) {
        setSearchResults(response.data.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setSearchResults([]);
    }
  };

  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`); // Redirect to details page
  };

  return (
    <nav className="bg-blue-950 px-4 py-3">
      <div className="md:hidden">
        <NavSm defaultLocation={defaultLocation} />
      </div>
      <div className="hidden md:flex lg:hidden">
        <NavMd onSearch={searchMovies} searchResults={searchResults} onMovieClick={handleMovieClick} />
      </div>
      <div className="hidden md:hidden lg:flex">
        <NavLg
          defaultLocation={defaultLocation}
          onSearch={searchMovies}
          searchResults={searchResults}
          onMovieClick={handleMovieClick}
        />
      </div>
    </nav>
  );
};

export default Navbar;
