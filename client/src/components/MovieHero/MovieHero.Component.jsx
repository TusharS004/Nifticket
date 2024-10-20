import React, { useContext, useEffect } from "react";
import { MovieContext } from "../../context/Movie.context";
import MovieInfo from "./MovieInfo.Component";

const MovieHero = () => {
  const { movie, rentMoive, buyMoive } = useContext(MovieContext);
  const genres = movie.genres?.map(({ name }) => name).join(", ");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        {/* Mobile or tablet screen size */}
        <div className="lg:hidden w-full">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="cover pic"
            className="rounded responsive-img my-2 py-2"
            style={{ width: "calc(100% - 2rem)" }}
          />
        </div>
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="flex flex-col-reverse gap-3 px-4 my-3">
            <div className="text-black flex flex-col gap-2 md:px-4">
              <h4>4.2k rating</h4>
              <h4>Kannada, English, Hindi, Telugu, Tamil</h4>
              <h4>
                {movie.runtime} min | {genres}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-3 md:px-4 md:w-screen text-xl px-4">
            <button
              onClick={rentMoive}
              className="bg-red-500 w-full py-3 text-white font-semibold rounded-lg px-4"
            >
              Rent ₹ 149
            </button>
            <button
              onClick={buyMoive}
              className="bg-red-600 w-full py-3 text-white font-semibold rounded-lg"
            >
              Buy ₹ 599
            </button>
          </div>
        </div>

        {/* Large Screen Device */}
        <div className="relative hidden w-full lg:block" style={{ height: "30rem" }}>
              <div
            className="absolute z-10 w-full h-full"
            style={{
              background: "rgba(0, 0, 0, 0.9)", // Changed to a semi-transparent black
              background:
                "linear-gradient(90deg, rgba(0,0,0,5.5) 40%, rgba(72,16,16,1.5) 80%, rgba(13,59,44,1.5) 100%, rgba(0,0,0,0.0005) 100%)", // Adjusted opacity in the gradient
            }}
            >
            <div className="absolute z-30 left-24 top-10 flex items-center gap-10">
              <div className="w-64 h-96">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt="Movie Poster"
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div>
                <MovieInfo movie={movie} />
              </div>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="Backdrop Poster"
              className="w-full h-full object-cover object-center opacity-75" // Added opacity here
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieHero;