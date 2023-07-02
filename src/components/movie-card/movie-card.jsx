import PropTypes from "prop-types";
import { Button, Card} from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        {/* <Card.Text>{mov}</Card.Text> */}
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
    );
};

//PropTypes conditions for return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};