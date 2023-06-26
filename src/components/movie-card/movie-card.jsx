import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div onClick={() => {
            onMovieClick(movie);
        }}
        >{movie.Title}
        </div>
    );
};

//PropTypes conditions for return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};