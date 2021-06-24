import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RepositorySearch } from 'pages/RepositorySearch';
import RepositoryContributors from 'pages/RepositoryContributors';

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={RepositorySearch} />
      <Route
        path="/repositories/:organization/:repository/contributors"
        component={RepositoryContributors}
      />
    </Switch>
  </BrowserRouter>
);
