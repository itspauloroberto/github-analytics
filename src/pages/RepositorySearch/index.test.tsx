import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { RepositorySearch } from 'pages/RepositorySearch';
import API from 'api';
import { fetchSearchForRepositories } from 'services/repositories';
import repositoriesFixture from 'helpers/fixtures/repositories.json';
import userEvent from '@testing-library/user-event';
import * as debounceHook from 'hooks/useDebounce';

describe('Given RepositorySearch Component', () => {
  it('should render correctly', () => {
    expect(render(<RepositorySearch />)).not.toBe(null);
  });

  it('should indicate to the user what to do', () => {
    const { getByText } = render(<RepositorySearch />);
    expect(
      getByText('First, find and select a repository of your interest.'),
    ).toBeTruthy();
  });

  it('should have an input to the user be able to search repositories', () => {
    const componentRendered = render(<RepositorySearch />);
    const { getByTestId } = componentRendered;
    const input = getByTestId('search-repositories');
    expect(input).toBeTruthy();
  });

  it('the user should be able to change the search input value', async () => {
    const componentRendered = render(<RepositorySearch />);
    const { getByTestId } = componentRendered;
    const input = getByTestId('search-repositories') as HTMLInputElement;
    await fireEvent.change(input, { target: { value: 'react' } });
    expect(input.value).toBe('react');
  });

  describe('when the user is searching for a repository', () => {
    describe('and no errors have occurred', () => {
      describe('when the user type on input to search repositories', () => {
        it('should be able to call the endpoint correctly', async () => {
          jest.spyOn(API, 'get').mockResolvedValueOnce(repositoriesFixture);
          const { getByTestId } = render(<RepositorySearch />);
          const input = getByTestId('search-repositories') as HTMLInputElement;

          userEvent.type(input, 'react');

          expect(API.get).not.toHaveBeenCalled();
          await waitFor(
            () =>
              expect(API.get).toHaveBeenCalledWith('/search/repositories', {
                params: { page: 1, per_page: 10, q: 'react' },
              }),
            {
              timeout: 500,
            },
          );
          expect(API.get).toHaveBeenCalledTimes(1);
        });

        it('should show repositories found after user search', async () => {
          jest.spyOn(API, 'get').mockResolvedValueOnce(repositoriesFixture);
          const { getByTestId } = render(<RepositorySearch />);
          const input = getByTestId('search-repositories') as HTMLInputElement;

          userEvent.type(input, 'react');

          await waitFor(() => expect(API.get).toHaveBeenCalledTimes(1));
          expect(screen.queryAllByText('stars', { exact: false }).length).toBe(
            2,
          );
        });

        it('should call debouncer only 500ms after typing', async () => {
          const hookMock = jest.fn();
          jest.spyOn(debounceHook, 'useDebounce').mockImplementation(hookMock);

          const { getByTestId } = render(<RepositorySearch />);
          const input = getByTestId('search-repositories') as HTMLInputElement;

          expect(hookMock).not.toHaveBeenCalledWith('r', 500);

          userEvent.type(input, 'r');

          await waitFor(() => expect(hookMock).toHaveBeenCalledWith('r', 500), {
            timeout: 500,
          });
        });
      });
    });

    describe('when errors have occurred', () => {
      it('should warn the user accordingly that a error ocurred.', async () => {
        jest.spyOn(API, 'get').mockRejectedValueOnce({
          data: {
            message: 'An Error has occurred.',
          },
        });
        cleanup();
        const { getByTestId } = render(<RepositorySearch />);
        const input = getByTestId('search-repositories') as HTMLInputElement;

        userEvent.type(input, 'react');
        try {
          await waitFor(async () => {
            await fetchSearchForRepositories('react');
          });
        } catch (error) {
          expect(
            screen.getByText('There was a problem when loading repositories', {
              exact: false,
            }),
          ).toBeInTheDocument();
        }
      });
    });
  });
});
