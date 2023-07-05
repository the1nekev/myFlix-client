import { useState, useEffect } from "react";
import { Button, Col, Row, Form, Row, Modal, ModalHeader} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView =({ user, token, setUser, movies, onLoggedOut}) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.BirthDate);
    const [showModal, setShowModal] = useState(false);
    const favoriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie.id)
    });

    console.log(user)

    //open/close Modal
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    //function to handle user update
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://marvelflix1nekev.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Update Failed ): ")
            }
        }).then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })

    };

    //Delete User
    const handleDeleteUser = () => {
        fetch(`https://marvelflix1nekev.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                onLoggedOut();
            } else {
                alert('Something went wrong')
            }
        })
    }

    //What shows on the screen 
    return (
        <>
        {/* Display User Info On The Screen */}
        <h1>Profile</h1>
        <Row>
            <Col>
                <div>Username: {user.Username}</div>
                <div>Email: {user.Email}</div>
            </Col>
        </Row>
        {/* Update user information */}
        <Row>
            <h3>Update profile information</h3>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={4}
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={5}
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>BirthDate:</Form.Label>
                <Form.Control 
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
                <Button variant="primary" type="submit">Update Profile</Button>
            </Form.Group>
            </Form>
        </Row>
        <Row>
            <h3>Favorite movies:</h3>
            {favoriteMovies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={4}>
                    <MovieCard movie={movie}></MovieCard>
                </Col>
            ))}
        </Row>
            <Button variant="primary" onClick={handleShowModal}>
                Delete My Account
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your account permanantly?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
                    <Button variant="primary" onClick={handleCloseModal}>No</Button>
                </Modal.Footer>
            </Modal>
        </>      
    )   
}