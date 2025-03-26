import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box"; 
import img from "../../images/pexels-dziana-hasanbekava-5480827.jpg";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleVoteAverageChange = (e, newValue) => {
    handleChange(e, "vote_average", newValue);
  };

  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, rgba(63,81,181,1) 0%, rgba(33,150,243,1) 100%)",
        color: "white",
        borderRadius: 4,
        boxShadow: 5,
        overflow: "hidden",
      }}
      variant="outlined"
    >
      <CardMedia
        sx={{
          height: 300,
          filter: "brightness(0.7)",
        }}
        image={img}
        title="Filter"
      />
      <CardContent sx={{ padding: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          <SearchIcon fontSize="large" />
          Filter the Movies
        </Typography>
        <TextField
          sx={{
            ...formControl,
            "& .MuiFilledInput-root": {
              backgroundColor: "white",
              borderRadius: 2,
            },
          }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl
          sx={{
            ...formControl,
            "& .MuiSelect-select": {
              backgroundColor: "white",
              borderRadius: 2,
            },
          }}
        >
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        
        <Box sx={{ 
          ...formControl, 
          backgroundColor: "white", 
          padding: 2, 
          borderRadius: 2, 
          marginTop: 2 
        }}>
          <Typography id="vote-average-slider" gutterBottom color="primary">
            Minimum Rating: {props.voteAverageFilter || 0}
          </Typography>
          <Slider
            aria-labelledby="vote-average-slider"
            value={props.voteAverageFilter || 0}
            onChange={handleVoteAverageChange}
            valueLabelDisplay="auto"
            step={0.5}
            marks
            min={0}
            max={10}
            sx={{ color: "primary.main" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}