import React, { useState } from "react";

// function App() {
//   const [fullName, setFullName] = useState({
//     fName: "",
//     lName: "",
//   });

//   function handleChange(event) {
//     const {value,name} = event.target;
    
//     setFullName((prevValue) => {
//       if (name === "fName") {
//         return {
//           fName: value,
//           lName: prevValue.lName,
//         };
//       } else if (name === "lName") {
//         return {
//           fName: prevValue.fName,
//           lName: value,
//         };
//       }
//     });
//   }
//   return (
//     <div className="container">
//       <h1>
//         Hello {fullName.fName} {fullName.lName}
//       </h1>
//       <form>
//         <input
//           name="fName"
//           onChange={handleChange}
//           placeholder="First Name"
//           value={fullName.fName}
//         />
//         <input
//           name="lName"
//           onChange={handleChange}
//           placeholder="Last Name"
//           value={fullName.lName}
//         />
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  function handleChange(event){
    const {name,value} = event.target;
    setContact((prevValue) =>{
      return {
        ...prevValue,
        [name] : value
      }
    })

  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input name="fName" onChange={handleChange} placeholder="First Name" value={contact.fName} />
        <input name="lName" onChange={handleChange} placeholder="Last Name" value={contact.lName} />
        <input name="email" onChange={handleChange} placeholder="Email" value={contact.email} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
