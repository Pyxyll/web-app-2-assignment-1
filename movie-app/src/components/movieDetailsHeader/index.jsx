import React from "react";

export default function MovieDetailsHeader({ movie }) {
    return (
        <>
        <h1>{movie.title}</h1>
        <p>{movie.tagline}</p>
        <p>{movie.overview}</p>
        </>
    );
}