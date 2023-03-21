import React, { useState } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import Pagination, { IPaginationProps } from '@/components/Pagination';
import SimplePagination, {
  IPaginationProps as ISimplePaginationProps,
  InternalPagination,
} from '@/components/Pagination/simple';

import { disableArgs } from './utilityStory';

export default {
  title: '導航元件/Pagination',
  component: InternalPagination,
  argTypes: disableArgs(
    {
      themeColor: {
        defaultValue: 'primary',
        control: { type: 'color', presetColors: ['primary', 'secondary', 'disable', 'error'] },
        table: {
          type: {
            summary: 'TThemeColor',
          },
        },
      },
      page: {
        defaultValue: 1,
      },
      pageSize: {
        defaultValue: 20,
      },
      withEllipsis: {
        defaultValue: false,
      },
    },
    [
      {
        args: ['onChange', 'page', 'withEllipsis'],
        type: 'control',
      },
    ]
  ),
};

const WithDataWrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const DataItem = styled.div`
  border: 1px solid #eee;
  padding: 4px 8px;
`;

type IData = {
  id: number;
  title: string;
};

const fakeData = [...Array(102).keys()].map((key) => ({
  id: key,
  title: `Index: ${key}`,
}));

export const Default: Story<ISimplePaginationProps> = (args) => {
  const [page, setPage] = React.useState(1);
  return <SimplePagination {...args} page={page} total={100} onChange={setPage} />;
};

export const WithDataSource = () => {
  const pageSize = 20;
  const [page, setPage] = React.useState(1);
  const [dataSource, setDataSource] = React.useState<IData[]>([]);
  const handleOnChange = (current: number) => {
    const max = current * pageSize;
    const min = max - pageSize + 1;
    setDataSource(fakeData.filter((data, index) => index + 1 >= min && index + 1 <= max));
  };

  React.useLayoutEffect(() => {
    handleOnChange(page);
  }, []);

  return (
    <WithDataWrapper>
      <div style={{ height: 650 }}>
        {dataSource.map((data) => (
          <DataItem key={data.id}>
            <div>{data.title}</div>
          </DataItem>
        ))}
      </div>
      <SimplePagination
        page={page}
        pageSize={pageSize}
        total={fakeData.length}
        onChange={(current: number) => {
          handleOnChange(current);
          setPage(current);
        }}
      />
    </WithDataWrapper>
  );
};

export const MuiStyle = () => {
  const defaultColor = '#FE6B8B';
  const [pickedColor, setPickedColor] = useState(defaultColor);
  const [page, setPage] = React.useState(1);

  return (
    <div>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
        <input
          type="color"
          value={pickedColor}
          onChange={(event) => setPickedColor(event.target.value)}
        />
      </div>
      <Pagination page={page} total={100} themeColor={pickedColor} onChange={setPage} />
    </div>
  );
};

export const WithEllipsis = () => {
  const [page, setPage] = React.useState(1);
  return <Pagination page={page} pageSize={8} total={100} onChange={setPage} withEllipsis />;
};
