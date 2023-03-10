import React from 'react';
import styled from 'styled-components';

import Arrow from '../Arrow';

const StyledHeader = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ExpandIcon = styled(Arrow)`
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export interface IHeaderProps {
  /**
   * 是否展開
   */
  isExpand?: boolean;
  /**
   * 標題的點擊事件
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * 標題內容
   */
  header: React.ReactNode | string;
}

const Header = ({ header, isExpand = false, onClick }: IHeaderProps) => (
  <StyledHeader onClick={onClick}>
    {header}
    <ExpandIcon direction={isExpand ? 'up' : 'down'} />
  </StyledHeader>
);

export default Header;
