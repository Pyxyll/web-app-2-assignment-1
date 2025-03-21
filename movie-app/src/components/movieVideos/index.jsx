import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../../api/tmdb-api";
import Spinner from '../spinner';
import Box from "@mui/material/Box";

export default function MovieVideos({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['Videos', { id: movie.id }],
    queryFn: getMovieVideos,
  });
  
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (!data.results || data.results.length === 0) {
    return (
      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6">No videos available for this movie</Typography>
      </Paper>
    );
  }
  
  // Filter for YouTube trailers only
  const youtubeTrailer = data.results.find(
    video => video.site.toLowerCase() === "youtube" && 
    video.type.toLowerCase() === "trailer"
  );
  
  // If no YouTube trailer is found
  if (!youtubeTrailer) {
    return (
      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6">No trailer available for this movie</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h5" gutterBottom>
        Official Trailer
      </Typography>
      
      <Box sx={{ width: '100%', height: '400px', marginBottom: 2 }}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeTrailer.key}`}
          title={youtubeTrailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {youtubeTrailer.name}
        </Typography>
      </Box>
    </Paper>
  );
}