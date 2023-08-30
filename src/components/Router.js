// Router.js
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import DetailsPage from "./DetailsPage";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/details/:pokemonId" component={DetailsPage} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
