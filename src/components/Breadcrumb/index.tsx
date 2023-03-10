import React from 'react';

import Arrow from '../Arrow';
import Breadcrumbs from './Breadcrumbs';
import BreadcrumbItem, { IBreadcrumbItemProps } from './BreadcrumbItem';

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
}: IBreadcrumbProps) => (
  <Breadcrumbs maxItems={maxItems} separator={separator}>
    {routes.map((route) => (
      <BreadcrumbItem key={route.label} label={route.label} icon={route.icon} to={route.to} />
    ))}
  </Breadcrumbs>
);

export default Breadcrumb;
