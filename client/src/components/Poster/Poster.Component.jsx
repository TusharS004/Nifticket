import React from "react";
import { Link } from "react-router-dom";

const Poster = (props) => {
  return (
    <Link to={`/movie/${props.id}`}>
      <div className={`flex flex-col items-start gap-2 px-1 md:px-3 mt-5m ${props.class}`}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
            alt="poster"
            className="w-full h-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" // Added shadow and hover effect
          />
        </div>
        <h3
          className={`text-lg font-bold self-center ${
            props.isDark ? "text-white" : "text-blue-900"
          }`}
        >
          {props.original_title}
        </h3>
      </div>
    </Link>
  );
};

export default Poster;
