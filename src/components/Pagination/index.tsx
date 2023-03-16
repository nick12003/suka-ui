import styled, { css } from 'styled-components';

import Arrow from '../Arrow';

import { usePagination } from './usePagination';
import { useColor } from '@/theme/useColor';

interface IArrowButton {
  $isDisabled: boolean;
}

interface ICurrentItemStyle {
  $color: string;
}

type IStyledItem = ICurrentItemStyle & {
  $isCurrent: boolean;
};

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

const buttonStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover {
    color: #222;
    background: #0000000a;
    transition: background 0.2s ease-in-out;
  }
`;

const disabledButtonStyle = css`
  color: #00000042;
  background: none;
  cursor: default;
  &:hover {
    color: #00000042;
    background: none;
  }
`;

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

const ArrowButton = styled.div<IArrowButton>`
  ${buttonStyle}
  ${(props) => (props.$isDisabled ? disabledButtonStyle : null)}
`;

const currentItemStyle = css<ICurrentItemStyle>`
  background: ${(props) => props.$color};
  color: #fff;
  &:hover {
    background: ${(props) => props.$color};
    color: #fff;
    transition: background 0.2s ease-in-out;
  }
`;

const StyledItem = styled.div<IStyledItem>`
  ${buttonStyle}
  ${(props) => (props.$isCurrent ? currentItemStyle : null)}
`;

/**
 * `Pagination` 是一個分頁元件，當頁面中一次要載入過多的資料時，載入及渲染將會花費更多的時間，
 * 因此，考慮分批載入資料的時候，需要分頁元件來幫助我們在不同頁面之間切換。
 */
const Pagination = ({
  themeColor = 'primary',
  withEllipsis = false,
  page = 1,
  pageSize = 20,
  total,
  onChange = () => {},
}: IPaginationProps) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });
  const { items, totalPage, handleClickNext, handleClickPrev } = usePagination({
    page,
    pageSize,
    total,
    withEllipsis,
    onChange,
  });

  return (
    <StyledPagination>
      <ArrowButton
        role="presentation"
        onClick={page === 1 ? undefined : handleClickPrev}
        $isDisabled={page === 1}
      >
        <Arrow direction="left" />
      </ArrowButton>
      {items.map((item) => {
        if (item.type === 'page') {
          return (
            <StyledItem
              key={item.page}
              $isCurrent={item.isCurrent}
              $color={color}
              onClick={item.onClick}
            >
              <span>{item.page}</span>
            </StyledItem>
          );
        }
        return <div key={item.page}>...</div>;
      })}
      <ArrowButton
        role="presentation"
        onClick={page === totalPage ? undefined : handleClickNext}
        $isDisabled={page === totalPage}
      >
        <Arrow direction="right" />
      </ArrowButton>
    </StyledPagination>
  );
};

export default Pagination;
