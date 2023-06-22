import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([]);
    
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
    fetch("https://marvelflix1nekev.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
            return {
              _id: movie.id,
              Title: movie.Title,
              ImagePath: movie.ImagePath,
              Description: movie.Description,
              Genre: {
                Name: movie.Genre.Name
              },
            //   Director: {
            //     Name: movie.Director.Name
            //   },
              Featured: movie.Featured.toString()
            };
        });
        setMovies(moviesFromApi); 
      });
  }, []);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() =>{
            setSelectedMovie(null);
        }}/>
    }

    if (movies.length === 0) {
        return <div>The list is empty.</div>
    }

    return ( 
        <div>
            {movies.map((movie) => {
                return(
                    <MovieCard key = {movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}/>
                );
            })}
        </div>
    );
};