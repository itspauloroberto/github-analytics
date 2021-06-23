import React from 'react';
import { Route, Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

export const renderWithRouterMatch = (
  ui: any,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: any = {},
): any => ({
  ...render(
    <Router history={history}>
      <Route path={path} component={ui} />
    </Router>,
  ),
});
