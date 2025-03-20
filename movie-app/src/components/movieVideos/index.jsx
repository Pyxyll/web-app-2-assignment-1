import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";
import { getMovieVideos } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'


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
  
  const videos = data.results[0];


  return (
    <a href={`https://youtube.com/watch?v=${videos.key}`}>video</a>
  );
}
