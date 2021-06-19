import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API || '',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});
