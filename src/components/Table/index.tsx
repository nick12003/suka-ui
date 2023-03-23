/* eslint-disable react/forbid-prop-types */
import React from 'react';
import styled, { css } from 'styled-components';

const stickyLeftStyle = css`
  position: sticky;
  left: 0px;
  z-index: 2;
  &:after {
    content: '';
    position: absolute;
    right: 0px;
    top: 0px;
    width: 30px;
    height: 100%;
    box-shadow: inset 10px 0 8px -8px #00000026;
    transform: translateX(100%);
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  * {
    border: 1px solid #000;
    box-sizing: border-box;
  }
`;

interface ITh extends React.ComponentPropsWithoutRef<'th'> {
  $width?: number;
  $fixed?: boolean;
}

const Th = styled.th<ITh>`
  width: ${(props) => props.$width}px;
  ${(props) => props.$fixed && stickyLeftStyle};
`;

interface ITd {
  $fixed?: boolean;
}

const Td = styled.td<ITd>`
  background: #fff;
  ${(props) => props.$fixed && stickyLeftStyle};
`;

type IColumns = {
  key?: string;
  width?: number;
  fixed?: boolean;
  title: React.ReactNode;
  dataIndex: string;
  render?: Function;
};

type IDataSource = {
  key: string;
  [x: string]: any;
};

export interface ITableProps {
  /**
   * 描述表格欄位的配置
   */
  columns: Array<IColumns>;
  /**
   * 指定表格的數據內容
   */
  dataSource: Array<IDataSource>;
}

/**
 * `Table` 顧名思義就是一個表格元件，用來整齊的顯示行列數據。
 */
export const InternalTable: React.ForwardRefRenderFunction<HTMLTableElement, ITableProps> = (
  { columns, dataSource, ...props },
  ref
) => (
  <div style={{ width: '100%', overflow: 'auto' }}>
    <StyledTable ref={ref} {...props}>
      <thead>
        <tr>
          {columns.map((column) => (
            <Th key={column.key ?? column.dataIndex} $width={column.width} $fixed={column.fixed}>
              {column.title}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data) => (
          <tr key={data.key}>
            {columns.map((column) => {
              const { dataIndex } = column;
              const foundCellData = column.render
                ? column.render(data[dataIndex])
                : data[dataIndex];
              return (
                <Td key={column.key} $fixed={column.fixed}>
                  {foundCellData}
                </Td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </div>
);

const Table =
  React.forwardRef<HTMLTableElement, ITableProps & extendElement<'table'>>(InternalTable);

export default Table;
