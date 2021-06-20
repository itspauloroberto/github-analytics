import React, { ReactElement } from 'react';
import { List, Avatar, Spin } from 'antd';
import { BranchesOutlined, GithubOutlined } from '@ant-design/icons';
import { IContributor } from 'pages/RepositoryContributors';
import * as S from '../../styles';

interface IContributorListProps {
  organization: string;
  repository: string;
  contributors: IContributor[];
  isFetching: boolean;
  hasMore: boolean;
}

export const ContributorList: React.FC<IContributorListProps> = ({
  organization,
  repository,
  contributors,
  isFetching,
  hasMore,
}: IContributorListProps) => {
  const getCommitsByAuthorURL = (username: string): string => {
    const baseURL = process.env.REACT_APP_GITHUB_EXTERNAL_URL;
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
            {new Intl.NumberFormat().format(item.contributions)} contributions
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
  );
};
