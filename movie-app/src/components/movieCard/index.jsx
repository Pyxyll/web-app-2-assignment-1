import React, { useContext } from "react";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid2";
import img from "../../images/film-poster-placeholder.png";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, rgba(63,81,181,1) 0%, rgba(33,150,243,1) 100%)",
        color: "white",
        borderRadius: 4,
        boxShadow: 8,
        overflow: "hidden",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 12,
        },
      }}
    >
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: "red", boxShadow: "0px 2px 4px rgba(0,0,0,0.3)" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontWeight: "bold",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        sx={{
          height: 500,
          filter: "brightness(0.8)",
          transition: "filter 0.3s",
          "&:hover": {
            filter: "brightness(1)",
          },
        }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              component="p"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              component="p"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <StarRateIcon fontSize="small" />
              {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          padding: 2,
          justifyContent: "space-between",
        }}
      >
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button
            variant="contained"
            size="medium"
            sx={{
              backgroundColor: "rgba(255,255,255,0.9)",
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,1)",
              },
            }}
          >
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
