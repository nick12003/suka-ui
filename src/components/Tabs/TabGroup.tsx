import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { ITabProps } from './Tab';

interface IIndicator {
  $left: number;
  $width: number;
  $color?: string;
}

export interface ITabGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactElement<ITabProps>[];
  handleChange: (value?: string) => void;
  value: string;
  color?: string;
}

const TabsScrollerWrapper = styled.div`
  position: relative;
`;

const Indicator = styled.div<IIndicator>`
  position: absolute;
  bottom: 0px;
  left: ${(props) => props.$left}px;
  height: 2px;
  width: ${(props) => props.$width}px;
  background: ${(props) => props.$color};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const StyledTabGroup = styled.div`
  display: flex;
`;

const InternalTabGroup: React.ForwardRefRenderFunction<HTMLTableElement, ITabGroupProps> = (
  { value, children, handleChange, color, ...props },
  ref
) => {
  const tabGroupRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tabAttrList, setTabAttrList] = useState<
    {
      width: number;
      left: number;
    }[]
  >([]);

  const handleClickTab = ({ tabValue, tabIndex }: { tabValue?: string; tabIndex: number }) => {
    handleChange(tabValue);
    setActiveIndex(tabIndex);
  };

  const handleUpdateTabAttr = useCallback(() => {
    const tabGroupCurrent = tabGroupRef.current;
    if (!tabGroupCurrent) return;
    const tabNumber = React.Children.count(children);

    setTabAttrList(
      [...Array(tabNumber).keys()].map((tabIndex) => ({
        width: (tabGroupCurrent.children[tabIndex] as HTMLElement).offsetWidth,
        left: (tabGroupCurrent.children[tabIndex] as HTMLElement).offsetLeft,
      }))
    );
  }, [children]);

  useEffect(() => {
    handleUpdateTabAttr();
    window.addEventListener('resize', handleUpdateTabAttr);
    return () => {
      window.removeEventListener('resize', handleUpdateTabAttr);
    };
  }, [handleUpdateTabAttr]);

  return (
    <TabsScrollerWrapper ref={ref} {...props}>
      <StyledTabGroup ref={tabGroupRef} className="tab__tab-group">
        {React.Children.map(children, (child, tabIndex) =>
          React.cloneElement(child, {
            onClick: () =>
              handleClickTab({
                tabValue: child.props.value,
                tabIndex,
              }),
            isActive: child.props.value === value,
            color,
          })
        )}
      </StyledTabGroup>
      <Indicator
        $left={tabAttrList[activeIndex]?.left || 0}
        $width={tabAttrList[activeIndex]?.width || 0}
        $color={color}
      />
    </TabsScrollerWrapper>
  );
};

const TabGroup = React.forwardRef(InternalTabGroup);

export default TabGroup;
