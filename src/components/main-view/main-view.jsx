import { useState, useEffect, useRef } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { title } from "process";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);
    const searchRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    const filterMovies = (searchInput) => {
      if (searchInput.trim() === "") {
        setFilteredMovies([]);
      } else {
        const filteredMovies = movies.filter(movie => {
          return movie.Title.toLowerCase().includes(searchInput.toLowerCase());
        });
        setFilteredMovies(filteredMovies);
      }
    };
  
    const handleSearch = (event) => {
      const value = event.target.value;
      setSearchTerm(value);
      const results = movies.filter(movie => {
        return movie.Title.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredMovies(results);
    }
  
    const handleFilter = (genre) => {
      const results = movies.filter(movie => {
        return movie.Genre.Name === genre;
      });
      setFilteredMovies(results);
    }
  
    const searchMovies = () => {
      if (searchRef.current && searchRef.current.value.trim() !== "") {
        filterMovies(searchRef.current.value);
      } else {
        setFilteredMovies([]);
      }
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
              }
              });
            setMovies(moviesFromApi);
        });
        setFilteredMovies(movies);
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
      ) : movies.length === 0 ? (
        <div className="greenFont">The list is empty!</div>
      ) : (
        <>
          <Row className="justify-content-md-center mt-3" style={{marginBottom:'30px'}}>
            <Col md={6}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input
                  type="text"
                  placeholder="Search movies"
                  value={searchTerm}
                  onChange={handleSearch}
                  ref={searchRef}
                  className="search_bar"
                />
        
                <Button variant="primary" onClick={searchMovies}>
                  Search
                </Button>
              </div>
              {searchTerm.trim() === "" ? (
                <></>
              ) : filteredMovies.length === 0 ? (
                <div>No movies found</div>
              ) : (
                <Row style={{marginTop:'30px'}}>
                  {filteredMovies.map((movie) => (
                    <Col key={movie.id} sm={12} lg={6} className="mb-5">
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            {movies.map((movie) => (
              <Col
                key={movie.id}
                md={12}
                lg={4}
                className="mb-5"
              >
                <MovieCard movie={movie} />
              </Col>
            ))}
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