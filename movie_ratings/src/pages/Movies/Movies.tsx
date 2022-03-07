import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Chip,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import styles from "./Movies.module.css";
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";

interface MoviesProps {}

class Movie {
  name: string;
  description: string;
  image: string;
  genre: string;
  rating: string;
  director: string;

  constructor(
    name: string,
    description: string,
    image: string,
    genre: string,
    rating: string,
    director: string
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.genre = genre;
    this.rating = rating;
    this.director = director;
  }
}

const Movies: FC<MoviesProps> = () => {
  const history = useHistory();

  const [state, setState] = React.useState({
    movies: Array<Movie>(),
  });

  React.useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    axios.get("/movies-services/movies").then((res) => {
      setState((s) => ({
        ...s,
        movies: res.data.map(
          (movie: {
            name: string;
            description: string;
            image: string;
            genre: string;
            rating: string;
            director: string;
          }) => {
            return new Movie(
              movie.name,
              movie.description,
              movie.image,
              movie.genre,
              movie.rating as string,
              movie.director
            );
          }
        ),
      }));
    });
  };

  const redirect = (val: any) => {
    history.push(val);
  };
  return (
    <div className={styles.Movies}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movie Reviews
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ marginTop: "3rem", marginLeft: "3rem" }}>
        <Grid container>
          {state.movies.map((el, idx) => (
            <Card
              key={idx}
              sx={{
                minWidth: 200,
                maxWidth: 400,
                marginLeft: "2rem",
                marginTop: "2rem",
                boxShadow: 4,
                ":hover": {
                  boxShadow: 20,
                },
              }}
            >
              <CardHeader title={el.name} subheader={el.director} />
              <CardMedia
                component="img"
                height="194"
                image={el.image}
                alt={el.name}
              />
              <CardContent>
                <Grid>
                  {el.genre.split(",").map((el, idx) => (
                    <Chip
                      key={idx}
                      label={el}
                      color="primary"
                      variant="outlined"
                      sx={{ marginRight: "0.5rem" }}
                    />
                  ))}
                  <Chip
                    key={idx}
                    label={"Rating: " + el.rating}
                    color={
                      parseFloat(el.rating) > 5
                        ? parseFloat(el.rating) > 8
                          ? "success"
                          : "warning"
                        : "error"
                    }
                    icon={<StarIcon />}
                  />
                </Grid>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ paddingTop: "1rem" }}
                >
                  {el.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Box>
      <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
        <BottomNavigation
          showLabels
          onChange={(event, newValue) => {
            redirect(newValue);
          }}
        >
          <BottomNavigationAction
            label="Users"
            value="/users"
            icon={<GroupIcon />}
          />
          <BottomNavigationAction
            label="Movies"
            value="/movies"
            icon={<MovieIcon />}
          />
          <BottomNavigationAction
            label="Logout"
            value="/"
            icon={<LogoutIcon />}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
};

export default Movies;
