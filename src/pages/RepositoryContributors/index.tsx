import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { message } from 'antd';
import { fetchRepositoryContributors } from 'services/repositories';
import InfiniteScroll from 'react-infinite-scroller';
import { ContributorList } from './components/ContributorList';

import * as S from './styles';

export interface IContributor {
  id: number;
  username: string;
  avatar: string;
  url: string;
  contributions: number;
}

interface IContributorsParams {
  organization: string;
  repository: string;
}

const RepositoryContributors: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contributors, setContributors] = useState<IContributor[]>([]);
  const params: IContributorsParams = useParams();

  const fetchContributors = useCallback(async () => {
    const { organization, repository } = params;
    setIsFetching(true);
    try {
      const { data } = await fetchRepositoryContributors(
        organization,
        repository,
        currentPage,
      );
      if (data && data.length) {
        setContributors([
          ...contributors,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...data.map((user: any) => ({
            id: user.id,
            username: user.login,
            avatar: user.avatar_url,
            url: user.html_url,
            contributions: user.contributions,
          })),
        ]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      message.error(
        `There was a problem when loading repository contributors. 
        Check your connection and try again later.`,
      );
    } finally {
      setIsFetching(false);
    }
  }, [params, currentPage, contributors]);

  useEffect(() => {
    fetchContributors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <S.MainContainer>
      <div className="col-12">
        <h2>
          Contributors of{' '}
          <Link to="/">
            {params.organization}/{params.repository}
          </Link>
        </h2>
        <br />
        <S.InfiniteContainer className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={1}
            loadMore={() => {
              setCurrentPage(currentPage + 1);
            }}
            hasMore={!isFetching && hasMore}
            useWindow={false}
          >
            <ContributorList
              contributors={contributors}
              organization={params.organization}
              repository={params.repository}
              hasMore={hasMore}
              isFetching={isFetching}
            />
          </InfiniteScroll>
        </S.InfiniteContainer>
      </div>
    </S.MainContainer>
  );
};

export default withRouter(RepositoryContributors);
