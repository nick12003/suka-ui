import React, { useRef } from 'react';
import styled from 'styled-components';

interface ICustomer {
  $maxHeight: number;
}

const StyledPanel = styled.div<ICustomer>`
  max-height: ${(props) => props.$maxHeight}px;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export interface PanelProps {
  /**
   * 是否展開
   */
  isExpand?: boolean;
  /**
   * 可被收合的 panel 內容
   */
  children: React.ReactNode;
}

const Panel = ({ children, isExpand = false }: PanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollHeight = panelRef.current?.scrollHeight ?? 0;

  return (
    <StyledPanel
      ref={panelRef}
      className="accordion__panel"
      $maxHeight={isExpand ? scrollHeight : 0}
    >
      {children}
    </StyledPanel>
  );
};

export default Panel;
