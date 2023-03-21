import React, { useRef } from 'react';
import styled from 'styled-components';

import CircularProgress from '../CircularProgress';

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: ${(props) => props.theme.color.primary} !important;
  margin: 40px 0px;
`;

interface IMain {
  $height: number;
}

const StyledMain = styled.div<IMain>`
  height: ${(props) => props.$height}px;
  overflow: auto;
`;

export interface IInfiniteScrollProps {
  /**
   * 元件高度
   */
  height?: number;
  /**
   * 內容
   */
  children: React.ReactNode;
  /**
   * 載入中狀態
   */
  isLoading?: boolean;
  /**
   * 滑動到底部的 callback
   */
  onScrollBottom?: Function;
}

/**
 * `Infinite scroll` 能在面對多筆資料時，讓捲軸滑動到底部時再載入下一頁面的資料。
 */
export const InternalInfiniteScroll: React.ForwardRefRenderFunction<
  HTMLDivElement,
  IInfiniteScrollProps
> = ({ height = 500, onScrollBottom, isLoading = false, children }, ref) => {
  const internalRef = (ref as any) || useRef<HTMLDivElement>(null);

  const handleOnScroll = () => {
    const containerElem = internalRef.current;
    if (containerElem) {
      const scrollPos = containerElem.scrollTop + containerElem.clientHeight;
      const divHeight = containerElem.scrollHeight;

      // 滾過的距離加上自己元素的高度，大於等於可滾動範圍的高度
      if (scrollPos >= divHeight && onScrollBottom) {
        onScrollBottom();
      }
    }
  };

  return (
    <StyledMain ref={internalRef} $height={height} onScroll={handleOnScroll}>
      {children}
      {isLoading && (
        <Loading>
          <StyledCircularProgress />
        </Loading>
      )}
    </StyledMain>
  );
};

const InfiniteScroll =
  React.forwardRef<HTMLDivElement, IInfiniteScrollProps & extendElement<'div'>>(
    InternalInfiniteScroll
  );

export default InfiniteScroll;
