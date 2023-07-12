import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        {/* <Card.Text>{mov}</Card.Text> */}
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
    );
};

//PropTypes conditions for return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired
};