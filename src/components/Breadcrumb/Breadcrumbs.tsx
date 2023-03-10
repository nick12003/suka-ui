import React, { useState } from 'react';
import styled from 'styled-components';

import Arrow from '../Arrow';

const StyledBreadcrumbs = styled.div`
  display: flex;
  align-items: center;
`;

const Separator = styled.span`
  margin: 0px 8px;
  display: flex;
  align-items: center;
`;

const CollapsedContent = styled.span`
  cursor: pointer;
`;

export interface IBreadcrumbsProps {
  /**
   * 路由
   */
  children: React.ReactNode;
  /**
   * 分隔符號
   */
  separator?: React.ReactNode;
  /**
   * 指定最大麵包屑數量，超過就折疊
   */
  maxItems?: number;
}

const Breadcrumb = ({
  children,
  maxItems = 8,
  separator = <Arrow direction="left" />,
}: IBreadcrumbsProps) => {
  const [isCollapse, setIsCollapse] = useState(maxItems < React.Children.count(children));

  const ChildrenArray = React.Children.toArray(children);

  if (isCollapse) {
    return (
      <StyledBreadcrumbs>
        {ChildrenArray[0]}
        <Separator>{separator}</Separator>
        <CollapsedContent role="presentation" onClick={() => setIsCollapse(false)}>
          ...
        </CollapsedContent>
        <Separator>{separator}</Separator>
        {ChildrenArray[ChildrenArray.length - 1]}
      </StyledBreadcrumbs>
    );
  }

  return (
    <StyledBreadcrumbs>
      {React.Children.map(children, (child, index) => {
        const isLast = index === React.Children.count(children) - 1;
        return (
          <>
            {child}
            {isLast ? null : <Separator>{separator}</Separator>}
          </>
        );
      })}
    </StyledBreadcrumbs>
  );
};

export default Breadcrumb;
