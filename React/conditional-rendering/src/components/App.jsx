import React from "react";
import Login from "./login";

var isloggedIn = true;

const currentTime = new Date().getHours();

function App() {
  return (
    <div className="container">
      {
      // isloggedIn ? <h1>Welcome back!</h1> : <Login />
      currentTime < 12 ? <h1>Good Morning</h1> : currentTime < 18 ? <h1>Good Afternoon</h1> : <h1>Good Evening</h1>
      }
    </div>
  );
}

export default App;
