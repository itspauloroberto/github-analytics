import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API || '',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

/*
  "The Search API has a custom rate limit. For requests using 
  Basic Authentication, OAuth, or client ID and secret, you can make up
  to 30 requests per minute."

  Source: https://docs.github.com/en/rest/reference/search#rate-limit
*/

export default rateLimit(axiosInstance, {
  maxRequests: 30,
  perMilliseconds: 60000,
  maxRPS: 2,
});
