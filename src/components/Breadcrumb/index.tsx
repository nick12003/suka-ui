import React, { useState } from 'react';
import styled from 'styled-components';

import BreadcrumbItem, { IBreadcrumbItemProps } from './BreadcrumbItem';
import Arrow from '../Arrow';

const StyledMain = styled.div`
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

export interface IBreadcrumbProps {
  /**
   * 麵包屑的路由資訊及設定
   */
  routes?: IBreadcrumbItemProps[];
  /**
   * 分隔符號
   */
  separator?: React.ReactNode;
  /**
   * 指定最大麵包屑數量，超過就折疊
   */
  maxItems?: number;
}

/**
 * `Breadcrumb` 是一個導航元件，用於顯示當前系統層級結構中的路徑位置，並且點擊路徑能返回之前的頁面。
 * 在系統有多個層級架構，並且希望能幫助用戶清楚知道自己目前層級位置，
 * 及希望用戶能方便返回上面層級時，能夠使用麵包屑元件。
 */
const Breadcrumb = ({
  maxItems = 8,
  routes = [],
  separator = <Arrow direction="left" />,
}: IBreadcrumbProps) => {
  const [isCollapse, setIsCollapse] = useState(() => maxItems < routes.length);

  if (isCollapse) {
    return (
      <StyledMain>
        <BreadcrumbItem label={routes[0].label} to={routes[0].to} />
        <Separator>{separator}</Separator>
        <CollapsedContent onClick={() => setIsCollapse(false)}>...</CollapsedContent>
        <Separator>{separator}</Separator>
        <BreadcrumbItem label={routes[routes.length - 1].label} to={routes[routes.length - 1].to} />
      </StyledMain>
    );
  }

  return (
    <StyledMain>
      {routes.map((route, index) => {
        const isLast = index === routes.length - 1;
        return (
          <>
            <BreadcrumbItem key={index} label={route.label} to={route.to} />
            {isLast ? null : <Separator>{separator}</Separator>}
          </>
        );
      })}
    </StyledMain>
  );
};

export default Breadcrumb;
