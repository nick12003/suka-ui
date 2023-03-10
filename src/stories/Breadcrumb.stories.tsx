import { Story } from '@storybook/react';

import { ReactComponent as Line } from '@/assets/line.svg';
import Breadcrumb, { IBreadcrumbProps } from '@/components/Breadcrumb';

export default {
  title: '導航元件/Breadcrumb',
  component: Breadcrumb,
};

const routes = [
  {
    to: '/home',
    label: '首頁',
  },
  {
    to: '/school',
    label: '學校列表',
  },
  {
    to: '/members',
    label: '會員列表',
  },
  {
    to: '/memberDetail',
    label: '會員資料',
  },
];

const routesWithIcon = [
  {
    to: '/home',
    label: '首頁',
    icon: <Line />,
  },
  {
    to: '/school',
    label: '學校列表',
    icon: <Line />,
  },
  {
    to: '/members',
    label: '會員列表',
    icon: <Line />,
  },
  {
    to: '/memberDetail',
    label: '會員資料',
    icon: <Line />,
  },
];

const Template: Story<IBreadcrumbProps> = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  routes,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  routes: routesWithIcon,
};

export const WithCustomSeparator = Template.bind({});
WithCustomSeparator.args = {
  separator: '/',
  routes: routesWithIcon,
};

export const WithMaxItems = Template.bind({});
WithMaxItems.args = {
  maxItems: 2,
  routes: routesWithIcon,
};
