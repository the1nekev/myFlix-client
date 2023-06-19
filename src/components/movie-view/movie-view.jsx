export const MovieView = ({ movie, onBackClick}) => {
    return (
        <div>
            <div>
                <img src={ movie.image} alt="movie pic" width="300px" height="300px" />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
}