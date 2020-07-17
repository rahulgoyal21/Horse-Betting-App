import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/home";
import GameDetails from "./pages/gameDetails";
import { Container } from "@material-ui/core";

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game_detail/:id" component={GameDetails} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};
export default App;
