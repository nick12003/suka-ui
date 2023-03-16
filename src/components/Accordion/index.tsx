import React, { useRef } from 'react';
import styled from 'styled-components';

import Arrow from '../Arrow';

interface IStyledPanelProps {
  $maxHeight: number;
}

export interface IAccordionProps extends React.ComponentPropsWithoutRef<'div'> {
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
  header: React.ReactNode;
  /**
   * 可被收合的 panel 內容
   */
  children: React.ReactNode;
  /**
   * header的ref
   */
  headerRef?: React.ForwardedRef<HTMLDivElement>;
  /**
   * panel的ref
   */
  panelRef?: React.ForwardedRef<HTMLDivElement>;
}

const StyledAccordion = styled.div`
  display: inline-flex;
  flex-direction: column;
  border: 1px solid #ddd;
`;

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

const StyledPanel = styled.div<IStyledPanelProps>`
  max-height: ${(props) => props.$maxHeight}px;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

/**
 * `Accordion` 是一個可折疊/展開內容區域的元件。
 * 主要是針對顯示內容複雜或很多的頁面進行分區塊的顯示及隱藏。
 */
const InternalAccordion: React.ForwardRefRenderFunction<HTMLDivElement, IAccordionProps> = (
  { isExpand = false, onClick, header, children, headerRef, panelRef, ...props },
  ref
) => {
  const basePanelRef = (panelRef as any) || useRef<HTMLDivElement>(null);
  const scrollHeight = basePanelRef.current?.scrollHeight ?? 0;

  return (
    <StyledAccordion ref={ref} {...props}>
      <StyledHeader onClick={onClick}>
        {header}
        <ExpandIcon direction={isExpand ? 'up' : 'down'} />
      </StyledHeader>
      <StyledPanel ref={basePanelRef} $maxHeight={isExpand ? scrollHeight : 0}>
        {children}
      </StyledPanel>
    </StyledAccordion>
  );
};

const Accordion = React.forwardRef(InternalAccordion);

export default Accordion;
