import React from "react";
import Login from "./login";
import Form from "./Form";

var isloggedIn = false;

const currentTime = new Date().getHours();

function App() {
  return (
    <div className="container">
      {
      // isloggedIn ? <h1>Welcome back!</h1> : <Login />
      // currentTime < 12 ? <h1>Good Morning</h1> : currentTime < 18 ? <h1>Good Afternoon</h1> : <h1>Good Evening</h1>
      <Form 
      isRegistered= {isloggedIn}/>
      }
    </div>
  );
}

export default App;
