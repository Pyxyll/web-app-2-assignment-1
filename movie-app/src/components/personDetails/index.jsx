import React, { useState } from "react";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};

const PersonDetails = ({ person }) => {  // Don't miss this!
  return (
    <>
             <h1>{person.name}</h1>
            <p>{person.biography}</p>
            <p>Birthday: {person.birthday}</p>
            <img 
              src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} 
              alt={person.name} 
              style={{ width: "300px", borderRadius: "10px" }} 
            />
      </>
  );
};
export default PersonDetails;
