import React from 'react';
import { Input, AutoComplete } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        <small>contributors</small> <UserOutlined /> {count}
      </span>
    </div>
  ),
});

const options = [
  {
    label: 'Repositories',
    options: [renderItem('facebook/react', 173200)]
  }
]

export function RepositorySearch() {
  return (
    <div>
      <h3>
        Please, inform a repository of your interest.
      </h3>
      <AutoComplete
        dropdownClassName="repositories-search-dropdown"
        dropdownMatchSelectWidth={500}
        style={{ width: 250 }}
        options={options}
      >
        <Input.Search size="large" placeholder="type here" />
      </AutoComplete>
    </div>
  );
}
