import API from 'api';
import { AxiosResponse } from 'axios';

export const fetchSearchForRepositories = async (
  searchTerm: string,
): Promise<AxiosResponse> => {
  if (!searchTerm)
    throw new Error('Cannot search for repositories without a search term');
  const response = await API.get('/search/repositories', {
    params: { page: 1, per_page: 10, q: searchTerm },
  });
  return response;
};

export const fetchRepositoryContributors = async (
  organization: string,
  repository: string,
  currentPage: number,
): Promise<AxiosResponse> => {
  if (!organization || !repository)
    throw new Error(
      'Cannot fetch contributors, organization and repository must be valid',
    );
  if (!currentPage)
    throw new Error(
      'To fetch contributors you need to specify the page number.',
    );
  const response = await API.get(
    `/repos/${organization}/${repository}/contributors`,
    {
      params: { page: currentPage, per_page: 10 },
    },
  );
  return response;
};
