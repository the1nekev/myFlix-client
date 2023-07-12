import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleSearch = (event) => {
      const searchQuery = event.target.value.toLowerCase();
      setSearchTerm(searchQuery);

      const filtered = movies.filter((movie) =>
          movie.Title.toLowerCase().includes(searchQuery)
      );

      setFilteredMovies(filtered);
  };

    const onLogout = () => {
      setUser(null);
      setToken(null);
      localStorage.clear();
    }

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://marvelflix1nekev.herokuapp.com/movies", {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
            const moviesFromApi = data.map((movie) => {
              return{
                id: movie._id,
                Title: movie.Title,
                ImagePath: movie.ImagePath,
                Description: movie.Description,
                Genre: {
                  Name: movie.Genre.Name
                },
                // Director: {
                //   Name: movie.Director.Name
                // },
                Featured: movie.Featured
              };
            });
            setMovies(moviesFromApi);
            setFilteredMovies(moviesFromApi);
        });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route 
                    path="/profile"
                    element={
                        <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : (
                            <Col>
                                <ProfileView 
                                user={user}
                                token={token}
                                setUser={setUser}
                                movies={movies}
                                onLogout={onLogout}
                                />
                            </Col>
                        )}</>
                    }
                    />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView 
                    movies={movies}
                    user={user}
                    setUser={setUser}
                    token={token}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          {/* Filter test */}
          <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <>
                                        <Row>
                                            <Col
                                                className="d-flex justify-content-center"
                                                style={{
                                                    marginTop: 90,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Search Movies"
                                                    value={searchTerm}
                                                    onChange={handleSearch}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            {filteredMovies.length === 0 ? (
                                                <Col>The list is empty!</Col>
                                            ) : (
                                                filteredMovies.map((movie) => (
                                                    <Col
                                                        className="mb-4"
                                                        key={movie.id}
                                                        sm={12}
                                                        md={6}
                                                        lg={4}
                                                    >
                                                        <MovieCard
                                                            movie={movie}
                                                        />
                                                    </Col>
                                                ))
                                            )}
                                        </Row>
                                    </>
                                )}
                            </>
                        }
                    />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};