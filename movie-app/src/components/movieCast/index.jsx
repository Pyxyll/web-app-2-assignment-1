import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";

const EmptyState = ({ message }) => (
    <StyledPaper sx={{ p: 3, my: 3, textAlign: 'center' }}>
      <MovieIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.6, mb: 2 }} />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </StyledPaper>
  );

export default function MovieCast({ movie }) {
  const { data: credits, error, isPending, isError } = useQuery({
    queryKey: ["movieCredits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

    if (isPending) {
      return <Spinner />;
    }
  
    if (isError) {
      return <EmptyState message={`Error: ${error.message}`} />;
    }
  

  const cast = credits?.cast || [];
  const mainCast = cast.slice(0, 5); // Get first 5 cast members

  return (
    <div className="cast-container">
      <h3>Main Cast</h3>
      <div className="cast-list">
        {mainCast.map((actor) => (
          <div key={actor.id} className="cast-item">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "/placeholder-image.png"
              }
              alt={actor.name}
            />
            <div className="actor-name">{actor.name}</div>
            <div className="character-name">as {actor.character}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
