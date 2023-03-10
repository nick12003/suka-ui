import React, { FC } from 'react';
import styled from 'styled-components';

import Header, { IHeaderProps } from './header';
import Panel from './panel';

const StyledAccordion = styled.div`
  display: inline-flex;
  flex-direction: column;
  border: 1px solid #ddd;
`;

export interface IAccordionProps {
  /**
   * 客製化樣式
   */
  className?: string;
  /**
   * 可被收合的 panel 內容
   */
  children: React.ReactNode;
}

/**
 * `Accordion` 是一個可折疊/展開內容區域的元件。
 * 主要是針對顯示內容複雜或很多的頁面進行分區塊的顯示及隱藏。
 */
const Accordion = ({
  header,
  children,
  isExpand = false,
  onClick,
  className,
}: IAccordionProps & IHeaderProps) => (
  <StyledAccordion className={className}>
    <Header isExpand={isExpand} onClick={onClick} header={header} />
    <Panel isExpand={isExpand}>{children}</Panel>
  </StyledAccordion>
);

export default Accordion;
