import styled from 'styled-components';
import { Story } from '@storybook/react';

import { ReactComponent as HomeIcon } from '@/assets/SVG/home.svg';
import { ReactComponent as SchoolIcon } from '@/assets/SVG/school.svg';
import { ReactComponent as SupervisorAccountIcon } from '@/assets/SVG/supervisor.svg';
import { ReactComponent as AssignmentIndIcon } from '@/assets/SVG/assignmentInd.svg';
import Breadcrumb, { IBreadcrumbProps, InternalBreadcrumb } from '@/components/Breadcrumb';

import { disableArgs } from './utilityStory';

export default {
  title: '導航元件/Breadcrumb',
  component: InternalBreadcrumb,
  argTypes: disableArgs(
    {
      separator: {
        control: 'text',
      },
      maxItems: {
        control: 'number',
        defaultValue: 8,
      },
    },
    [
      {
        args: ['routes'],
        type: 'control',
      },
    ]
  ),
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

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    font-size: 1.5rem;
    padding-right: 0.25rem;
  }
`;

const routesWithIcon = [
  {
    to: '/home',
    label: (
      <Label>
        <HomeIcon />
        首頁
      </Label>
    ),
  },
  {
    to: '/school',
    label: (
      <Label>
        <SchoolIcon />
        學校列表
      </Label>
    ),
  },
  {
    to: '/members',
    label: (
      <Label>
        <SupervisorAccountIcon />
        會員列表
      </Label>
    ),
  },
  {
    to: '/memberDetail',
    label: (
      <Label>
        <AssignmentIndIcon />
        會員資料
      </Label>
    ),
  },
];

const Template: Story<IBreadcrumbProps> = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  routes,
};

export const WithIcon = Template.bind({});
WithIcon.storyName = '加上Icon';
WithIcon.args = {
  routes: routesWithIcon,
};

export const WithCustomSeparator = Template.bind({});
WithCustomSeparator.storyName = '自訂分隔符號';
WithCustomSeparator.args = {
  separator: '/',
  routes: routesWithIcon,
};

export const WithMaxItems = Template.bind({});
WithMaxItems.storyName = '設定摺疊';
WithMaxItems.args = {
  maxItems: 2,
  routes: routesWithIcon,
};
