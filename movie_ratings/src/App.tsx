import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import Users from "./pages/Users/Users";

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movie Reviews
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users" exact component={Users} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
