import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import API from 'api';
import contributorsFixture from 'helpers/fixtures/contributors.json';
import { renderWithRouterMatch } from 'helpers/testutils';
import RepositoryContributors from 'pages/RepositoryContributors';
import { cleanup, screen, waitFor } from '@testing-library/react';

describe('Given RepositoryContributors Component', () => {
  const routeParams = {
    route: '/repositories/facebook/react/contributors',
    path: '/repositories/:organization/:repository/contributors',
  };

  it('should render correctly', async () => {
    expect(
      renderWithRouterMatch(RepositoryContributors, routeParams),
    ).toBeTruthy();
  });

  it('should indicate to the user what info is being shown', () => {
    const { getByText } = renderWithRouterMatch(
      RepositoryContributors,
      routeParams,
    );
    expect(getByText('Contributors of', { exact: false })).toBeInTheDocument();
    expect(getByText('facebook/react', { exact: false })).toBeInTheDocument();
  });

  describe('when the response for contributors request is sucessful', () => {
    beforeEach(() => {
      jest.spyOn(API, 'get').mockResolvedValue(contributorsFixture);
    });

    it('should load contributors list after rendering', async () => {
      await waitFor(() =>
        renderWithRouterMatch(RepositoryContributors, routeParams),
      );

      expect(API.get).toHaveBeenCalledTimes(1);
      expect(API.get).toBeCalledWith('/repos/facebook/react/contributors', {
        params: { page: 1, per_page: 10 },
      });
      expect(
        screen.queryAllByText('contributions', { exact: false }).length,
      ).toBe(2);
    });
  });

  describe('when a error happened while requesting contributors', () => {
    beforeEach(() => {
      jest.spyOn(API, 'get').mockRejectedValue({
        data: {
          message: 'An Error has occurred.',
        },
      });
    });

    it('should warn the user accordingly that a error ocurred.', async () => {
      await waitFor(() =>
        renderWithRouterMatch(RepositoryContributors, routeParams),
      );

      expect(API.get).toHaveBeenCalledTimes(1);
      expect(API.get).toBeCalledWith('/repos/facebook/react/contributors', {
        params: { page: 1, per_page: 10 },
      });
      expect(
        screen.getAllByText(
          'There was a problem when loading repository contributors',
          { exact: false },
        ).length,
      ).toBeGreaterThan(0);
    });
  });
});
