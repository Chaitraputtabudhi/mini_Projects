// import React from "react";
// import ReactDOM from "react-dom/client";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// const name = "Mohan Kumar";
// const hour = new Date().getHours();
// const time = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";
// const color = hour < 12 ? "red" : hour < 17 ? "green" : "blue";



// // root.render(
// //   <div>
// //     <p>Created by {name}</p>
// //     <p>Copyright {new Date().getFullYear()}</p>
// //   </div>,
// //   document.getElementById("root")
// // );

// root.render(
//     <h1 style={{color}}>Good {time}</h1>,document.getElementById("root")
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
// to launch your react project in your browser
