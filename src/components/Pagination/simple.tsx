import React from 'react';
import styled, { css } from 'styled-components';

import { usePagination } from './usePagination';

const StyledPagination = styled.div`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

const currentItemStyle = css`
  background: ${(props) => props.theme.color.primary};
  color: #fff;
`;

type IStyledItem = {
  $isCurrent: boolean;
};

const StyledItem = styled.div<IStyledItem>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #bbb;
  ${(props) => (props.$isCurrent ? currentItemStyle : null)}
`;

export interface IPaginationProps {
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: string;
  /**
   * 當前頁數
   */
  page?: number;
  /**
   * 每一頁資料筆數
   */
  pageSize?: number;
  /**
   * 數據總數
   */
  total: number;
  /**
   * 頁數過多是否省略
   */
  withEllipsis?: boolean;
  /**
   * 頁碼以及 pageSize 改變時的 callback
   */
  onChange?: Function;
}

/**
 * `Pagination` 是一個分頁元件，當頁面中一次要載入過多的資料時，載入及渲染將會花費更多的時間，
 * 因此，考慮分批載入資料的時候，需要分頁元件來幫助我們在不同頁面之間切換。
 */
export const InternalPagination: React.ForwardRefRenderFunction<HTMLDivElement, IPaginationProps> =
  ({ page = 1, pageSize = 20, total, onChange = () => {} }: IPaginationProps) => {
    const { items, handleClickNext, handleClickPrev } = usePagination({
      page,
      pageSize,
      total,
      onChange,
    });

    return (
      <StyledPagination>
        <button type="button" onClick={handleClickPrev}>
          prev
        </button>
        {items.map((item) => (
          <StyledItem key={item.page} $isCurrent={item.isCurrent} onClick={item.onClick}>
            <span>{item.page}</span>
          </StyledItem>
        ))}
        <button type="button" onClick={handleClickNext}>
          next
        </button>
      </StyledPagination>
    );
  };

const Pagination =
  React.forwardRef<HTMLDivElement, IPaginationProps & Omit<extendElement<'div'>, 'onChange'>>(
    InternalPagination
  );

export default Pagination;
