import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Input, AutoComplete } from 'antd';
import {
  StarOutlined,
  BranchesOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import API from 'api';
import { useDebounce } from 'hooks/useDebounce';
import { formatMillionToK } from 'helpers/numberFormats';
import * as S from './styles';

interface IAutoCompleteResultItem {
  value: string;
  label: ReactElement;
}

interface IResultOptions {
  label: string;
  options: IAutoCompleteResultItem[];
}

const renderItem = (
  title: string,
  stars: number,
  forks: number,
): IAutoCompleteResultItem => ({
  value: title,
  label: (
    <S.DropdownWrapper>
      <S.DropdownTitle>{title}</S.DropdownTitle>
      <div>
        <div>
          <S.IconDescription>stars </S.IconDescription>
          <span>
            <StarOutlined /> <strong>{formatMillionToK(stars)}</strong>
          </span>
        </div>
        <div>
          <S.IconDescription> forks </S.IconDescription>
          <span>
            <BranchesOutlined /> <strong>{formatMillionToK(forks)}</strong>
          </span>
        </div>
      </div>
    </S.DropdownWrapper>
  ),
});

export const RepositorySearch: React.FC = () => {
  const [resultOptions, setResultOptions] = useState<IResultOptions[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    async function fetchRepositories(): Promise<void> {
      setIsFetching(true);
      try {
        const {
          data: { items },
        } = await API.get('/search/repositories', {
          params: { page: 1, per_page: 10, q: debouncedSearchTerm },
        });
        if (items && items.length) {
          setResultOptions([
            {
              label: 'Repositories',
              options: items.map((item: any) =>
                renderItem(
                  item.full_name,
                  item.stargazers_count,
                  item.forks_count,
                ),
              ),
            },
          ]);
        } else {
          setResultOptions([]);
        }
      } catch (err) {
        setResultOptions([]);
      } finally {
        setIsFetching(false);
      }
    }
    fetchRepositories();
  }, [debouncedSearchTerm]);

  return (
    <S.MainContainer>
      <div className="col-4">
        <h2>First, find and select a repository of your interest.</h2>
        <br />
        <AutoComplete
          dropdownClassName="repositories-search-dropdown"
          dropdownMatchSelectWidth={500}
          style={{ width: 500 }}
          options={resultOptions}
        >
          <Input.Search
            size="large"
            placeholder="type here"
            enterButton={
              <Button type="primary" icon={<ArrowRightOutlined />} />
            }
            onSearch={() => {
              /* */
            }}
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
        </AutoComplete>
      </div>
    </S.MainContainer>
  );
};
