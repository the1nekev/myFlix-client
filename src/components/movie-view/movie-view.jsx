import { useParams } from "react-router";
import {Link } from "react-router-dom";
// import PropTypes from "prop-types";
import "./movie-view.scss";
import { Button, Row, Col } from "react-bootstrap"
import { useState } from "react";

export const MovieView = ({ user, token, movies, favoriteMovies }) => {
    const { movieId } = useParams();
    
    const Movie = movies.find((movie) => movie.id === movieId);

    const [Favorite, setFavorite] = useState(
        user.FavoriteMovies.includes(Movie.id)
    )

    return (
        <>
         <Row>
            <Col> 
                <img src={Movie.ImagePath} width="500px" height="500px"></img>
            </Col>
         </Row>
         <Row>
            <Col>Title:</Col>
            <Col>{Movie.Title}</Col>
         </Row>
         <Row>
            <Col>Description:</Col>
            <Col>{Movie.Description}</Col>
         </Row>
         <Row>
            <Col>Genre:</Col>
            <Col>{Movie.Genre.Name}</Col>
         </Row>
         <Row>
            <Col>Director:</Col>
            {/* <Col>{Movie.Director.Name}</Col> */}
         </Row>
        </>
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