import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "The Avengers",
            image: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg" ,
            description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
            director: "Joss Whedon",
            genre: ["Action", " Sci-Fi"]
        },
        {
            id: 2,
            title: "The Shawshank Redemption",
            image: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX190_CR0,2,190,281_.jpg",
            description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
            director: "Frank Darabont",
            genre: ["Drama"]
        },
        {
            id: 3,
            title: "The Super Mario Bros. Movie",
            image: "https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_FMjpg_UX1000_.jpg",
            description: "A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess.",
            director: "Aaron Horvath",
            genre: ["Aninamtion", " Comedy", " Adventure"]
        }
    ]);
    
    const [selectedMovie, setSelectedMovie] = useState(null);

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