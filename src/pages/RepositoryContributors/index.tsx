import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { List, message, Avatar, Spin } from 'antd';
import { BranchesOutlined, GithubOutlined } from '@ant-design/icons';
import API from 'api';
import InfiniteScroll from 'react-infinite-scroller';

import * as S from './styles';

interface IContributor {
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

export const RepositoryContributors: React.FC = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contributors, setContributors] = useState<IContributor[]>([]);
  const params: IContributorsParams = useParams();

  const fetchContributors = useCallback(async () => {
    const { organization, repository } = params;
    setIsFetching(true);
    try {
      const { data } = await API.get(
        `/repos/${organization}/${repository}/contributors`,
        {
          params: { page: currentPage, per_page: 10 },
        },
      );
      if (data && data.length) {
        setContributors([
          ...contributors,
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
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  }, [params, currentPage, contributors]);

  useEffect(() => {
    fetchContributors();
  }, [currentPage]);

  const getCommitsByAuthorURL = (username: string): string => {
    const baseURL = process.env.REACT_APP_GITHUB_EXTERNAL_URL;
    const { organization, repository } = params;
    return `${baseURL}${organization}/${repository}/commits?author=${username}`;
  };

  const HyperlinkWithIcon = ({
    href,
    icon,
    title,
  }: {
    href: string;
    icon: ReactElement;
    title: string;
  }): ReactElement => (
    <S.IconWrapper>
      <a href={href} rel="noreferrer" target="_blank" title={title}>
        {icon}
      </a>
    </S.IconWrapper>
  );

  return (
    <S.MainContainer>
      <div className="col-12">
        <h2>
          Contributors of{' '}
          <Link to="/repositories">
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
            <List
              dataSource={contributors}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <S.AvatarWrapper>
                        <a href={item.url} rel="noreferrer" target="_blank">
                          <Avatar src={item.avatar} />
                        </a>
                      </S.AvatarWrapper>
                    }
                    title={
                      <a href={item.url} rel="noreferrer" target="_blank">
                        {item.username}
                      </a>
                    }
                    description={
                      <div>
                        <HyperlinkWithIcon
                          href={item.url}
                          icon={<GithubOutlined />}
                          title="User profile on GitHub."
                        />
                        <HyperlinkWithIcon
                          href={getCommitsByAuthorURL(item.username)}
                          icon={<BranchesOutlined />}
                          title="Author commits on repository."
                        />
                      </div>
                    }
                  />
                  <span>
                    {new Intl.NumberFormat().format(item.contributions)}{' '}
                    contributions
                  </span>
                </List.Item>
              )}
            >
              {isFetching && hasMore && (
                <S.LoadingContainer className="demo-loading-container">
                  <Spin />
                </S.LoadingContainer>
              )}
            </List>
          </InfiniteScroll>
        </S.InfiniteContainer>
      </div>
    </S.MainContainer>
  );
};
