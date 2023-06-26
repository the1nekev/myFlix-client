import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) =>  {
    event.preventDefault();

    const data ={ 
      access: username,
      secret: password
    };

    fetch("https://marvelflix1nekev.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No Such User");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    })

  };


  return (
    <form onSubmit={{handleSubmit}}>
      <label>
        Username: <input type="text"
        value={username}
        onChange={(e) => {setUsername(e.target.value)}}
        required
        />
      </label>
      <label>
        Password: <input type="text"
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
