import { Story } from '@storybook/react';
import styled from 'styled-components';

import Table, { ITableProps } from '@/components/Table';
import Button from '@/components/Button';

import { disableArgs } from './utilityStory';

export default {
  title: '數據展示元件/Table',
  component: Table,
  argTypes: disableArgs({}, [
    {
      args: ['columns', 'dataSource'],
      type: 'control',
    },
  ]),
};

const MyTableStyle = styled(Table)`
  width: 100%;
  * {
    border: none;
    white-space: nowrap;
    text-align: left;
  }

  th {
    background: #fafafa;
  }
  td,
  th {
    padding: 16px;
  }
  tr {
    border-bottom: 1px solid #f0f0f0;
  }
  thead tr th {
    position: sticky;
    top: 0;
  }
`;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 130,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 65,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const Template: Story<ITableProps> = (args) => <Table {...args} />;

const TemplateStyledTable: Story<ITableProps> = (args) => <MyTableStyle {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns,
  dataSource,
};

export const MyTable = TemplateStyledTable.bind({});
MyTable.args = {
  columns,
  dataSource,
};

export const StickyColumn = TemplateStyledTable.bind({});
StickyColumn.args = {
  columns: [
    ...columns.map((column, index) => {
      if (index === 0) {
        return {
          ...column,
          fixed: true,
        };
      }
      return column;
    }),
  ],
  dataSource,
};

export const CustomContent = TemplateStyledTable.bind({});
CustomContent.args = {
  columns: [
    ...columns,
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (
        <Button themeColor="secondary">
          <span>刪除</span>
        </Button>
      ),
    },
  ],
  dataSource,
};
