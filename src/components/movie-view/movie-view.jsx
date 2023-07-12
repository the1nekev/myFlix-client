import { useParams } from "react-router";
import {Link } from "react-router-dom";
// import PropTypes from "prop-types";
import "./movie-view.scss";
import { Button, Card } from "react-bootstrap"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const MovieView = ({ user, token, setUser }) => {
    const movies = useSelector((state) => state.movies);

    const { movieId } = useParams();
    const [ Favorite, setFavorite] = useState(false);

    useEffect(()=> {
        const isFavorited = user.FavoriteMovies.includes(movieId)
        setFavorite(isFavorited);
    }, [])

    const addToFavorite = () => {
        fetch(`https://marvelflix1nekev.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setFavorite(true);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };

    const removeFavorite = () => {
        fetch(`https://marvelflix1nekev.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setFavorite(false);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    }
    
    const Movie = movies.find((movie) => movie.id === movieId);


    return (
        <Card className="mt-1 mb-1 h-100 bg-secondary text-white" >
        <Card.Img variant="top" src={Movie.ImagePath}/>
        <Card.Body>
            <Card.Title>{Movie.Title}</Card.Title>
            <Card.Text>Description: {Movie.Description}</Card.Text>
            <Card.Text>Genre: {Movie.Genre.Name}</Card.Text>
        </Card.Body>

        {Favorite ? (
            <Button onClick={removeFavorite}>Remove from favorites</Button>
        ) : (
            <Button onClick={addToFavorite}>Add to favorites</Button>
        )}

        <Link to={"/"}>
        <Button>Back</Button>
        </Link>
    </Card>
)

    


        // <div>
        //     <div>
        //         <img src={ Movie.ImagePath} alt="movie pic" width="300px" height="300px" />
        //     </div>
        //     <div>
        //         <span>Title: </span>
        //         <span>{Movie.Title}</span>
        //     </div>
        //     {/* <div>
        //         <span>Director: </span>
        //         <span>{movie.Director.Name}</span>
        //     </div> */}
        //     <div>
        //         <span>Description: </span>
        //         <span>{Movie.Description}</span>
        //     </div>
        //     <div>
        //         <span>Genre: </span>
        //         <span>{Movie.Genre.Name}</span>
        //     </div>
        //     <div>
        //         <span>Featured: </span>
        //         <span>{Movie.Featured}</span>
        //     </div>

        //     <Link to="/">
        //         <button className="back-button">Back</button>
        //     </Link>
        // </div>
    
}

//Proptypes conditions for moviesFromApi variable return statement in main-view.jsx
// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         ImagePath: PropTypes.string.isRequired,
//         Title: PropTypes.string.isRequired,
//         Genre: PropTypes.shape({
//             Name: PropTypes.string.isRequired
//         }),
//         Description: PropTypes.string.isRequired,
//         Featured: PropTypes.string.isRequired
//     }).isRequired,
//     onBackClick: PropTypes.func.isRequired
// };