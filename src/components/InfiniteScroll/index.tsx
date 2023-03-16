import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CircularProgress from '../CircularProgress';

interface IInfiniteScrollWrapperProps {
  $height: number;
}
export interface IInfiniteScrollProps {
  /**
   * 元件高度
   */
  height?: number;
  /**
   * 內容
   */
  children: ReactNode;
  /**
   * 載入中狀態
   */
  isLoading?: boolean;
  /**
   * 滑動到底部的 callback
   */
  onScrollBottom?: Function;
}

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

const InfiniteScrollWrapper = styled.div<IInfiniteScrollWrapperProps>`
  height: ${(props) => props.$height}px;
  overflow: auto;
`;

/**
 * `Infinite scroll` 能在面對多筆資料時，讓捲軸滑動到底部時再載入下一頁面的資料。
 */
const InfiniteScroll = ({
  height = 500,
  onScrollBottom,
  isLoading = false,
  children,
}: IInfiniteScrollProps) => {
  const infiniteScrollRef = useRef<HTMLDivElement>(null);

  const handleOnScroll = () => {
    const containerElem = infiniteScrollRef.current;
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
    <InfiniteScrollWrapper ref={infiniteScrollRef} $height={height} onScroll={handleOnScroll}>
      {children}
      {isLoading && (
        <Loading>
          <StyledCircularProgress />
        </Loading>
      )}
    </InfiniteScrollWrapper>
  );
};

export default InfiniteScroll;
