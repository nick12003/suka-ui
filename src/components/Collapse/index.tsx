import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import Arrow from '../Arrow';

interface IMain extends extendElement<'div'> {}

const StyledMain = styled.div<IMain>`
  display: inline-flex;
  flex-direction: column;
`;

interface IHeader extends extendElement<'div'> {}

const StyledHeader = styled.div<IHeader>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  /* padding: 0.25rem 1rem; */
`;

const StyledExpandIcon = styled(Arrow)`
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StyledExpandIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 0.5rem;
`;

interface IPanel extends extendElement<'div'> {
  $maxHeight: number;
}

const StyledPanel = styled.div<IPanel>`
  max-height: ${(props) => props.$maxHeight}px;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* padding 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${(props) => (props.$maxHeight === 0 ? 0 : 0.25)}rem 0.5rem;
  border: 1px solid #ddd;
  border-top: 0;
  border-bottom-width: ${(props) => (props.$maxHeight === 0 ? 0 : 1)}px; */
`;

export interface ICollapseProps {
  /**
   * 是否展開
   */
  isExpand?: boolean;
  /**
   * 展開開關的Icon
   */
  expandIcon?: (isExpand: boolean) => React.ReactNode;
  /**
   * 標題的點擊事件
   */
  onClick?: (isExpand: boolean) => void;
  /**
   * 標題內容
   */
  header: React.ReactNode;
  /**
   * header的ref
   */
  headerRef?: React.ForwardedRef<HTMLDivElement>;
  /**
   * header區塊的prop 不包含onClick
   */
  headerProps?: Omit<IHeader, 'onClick'>;
  /**
   * 可被收合的 panel 內容
   */
  children: React.ReactNode;
  /**
   * panel的ref
   */
  panelRef?: React.ForwardedRef<HTMLDivElement>;
  /**
   * panel的prop
   */
  panelProps?: Omit<IPanel, '$maxHeight'>;
}

const InternalCollapse: React.ForwardRefRenderFunction<HTMLDivElement, ICollapseProps> = (
  {
    isExpand: isExpandOuter,
    expandIcon,
    onClick: onClickOuter,
    header,
    children,
    headerRef,
    headerProps,
    panelRef,
    ...props
  },
  ref
) => {
  const [isExpand, setIsExpand] = useState(() => {
    if (isExpandOuter !== undefined) return isExpandOuter;
    return false;
  });
  const baseHeaderRef = (headerRef as any) || useRef<HTMLDivElement>(null);
  const basePanelRef = (panelRef as any) || useRef<HTMLDivElement>(null);
  const scrollHeight = basePanelRef.current?.scrollHeight ?? 0;
  useEffect(() => {
    setIsExpand(isExpandOuter ?? false);
  }, [isExpandOuter]);

  const handleClick = () => {
    setIsExpand((pre) => !pre);
    if (onClickOuter) {
      onClickOuter(isExpand);
    }
  };

  const renderExpandIcon = () => {
    return expandIcon
      ? expandIcon(isExpand)
      : ((<StyledExpandIcon direction={isExpand ? 'down' : 'left'} />) as React.ReactNode);
  };

  return (
    <StyledMain ref={ref} {...props}>
      <StyledHeader ref={baseHeaderRef} onClick={handleClick} {...headerProps}>
        {header}
        <StyledExpandIconWrapper>{renderExpandIcon()}</StyledExpandIconWrapper>
      </StyledHeader>
      <StyledPanel ref={basePanelRef} $maxHeight={isExpand ? scrollHeight : 0}>
        {children}
      </StyledPanel>
    </StyledMain>
  );
};

/**
 * `Collapse` 是一個可折疊/展開內容區域的元件。
 * 主要是針對顯示內容複雜或很多的頁面進行分區塊的顯示及隱藏。
 */
const Collapse = React.forwardRef(InternalCollapse);

export default Collapse;
