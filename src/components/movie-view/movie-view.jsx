import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick}) => {
    return (
        <div>
            <div>
                <img src={ movie.ImagePath} alt="movie pic" width="300px" height="300px" />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            {/* <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div> */}
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Featured: </span>
                <span>{movie.Featured}</span>
            </div>
            <button onClick={onBackClick}
            className="back-button"
            style={{ cursor: "pointer" }}
            >Back</button>
        </div>
    )
}

//Proptypes conditions for moviesFromApi variable return statement in main-view.jsx
MovieView.propTypes = {
    movie: PropTypes.shape({
        ImagePath: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Description: PropTypes.string.isRequired,
        Featured: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};