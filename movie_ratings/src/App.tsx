import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import Users from "./pages/Users/Users";
import Movies from "./pages/Movies/Movies";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users" exact component={Users} />
        <Route path="/movies" exact component={Movies} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
