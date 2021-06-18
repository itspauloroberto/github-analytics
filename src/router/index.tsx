import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { Home } from "pages/Home";
import { RepositorySearch } from "pages/RepositorySearch";

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/repositories/" component={RepositorySearch} />
      </Switch>
    </BrowserRouter>
  );
}
