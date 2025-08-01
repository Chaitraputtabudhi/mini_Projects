import React from "react";
import Card from "./Card";
import contacts from "../contacts";

function createCard(contact){
  return <Card 
  id = {contact.id}
  key = {contact.id}
  name = {contact.name}
  img = {contact.imgURL}
  phone = {contact.phone}
  email = {contact.email}
  />
}

function App() {
  // const cardElements = []

  // for (let i = 0; i < contacts.length; i++) {
  //   cardElements.push(
  //     <Card
  //     name={contacts[i].name}
  //     img={contacts[i].imgURL}
  //     phone={contacts[i].phone}
  //     email={contacts[i].email}
  //   />
  //   )
    
  // }
  // return (
  //   <div>
  //     <h1 className="heading">My Contacts</h1>
  //     {cardElements}
  //   </div>
  // );

  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      {contacts.map(createCard)}
    </div>
  );
}

export default App;
