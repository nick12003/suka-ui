import styled from 'styled-components';
import { Story } from '@storybook/react';

import { ReactComponent as HomeIcon } from '@/assets/SVG/home.svg';
import { ReactComponent as SchoolIcon } from '@/assets/SVG/school.svg';
import { ReactComponent as SupervisorAccountIcon } from '@/assets/SVG/supervisor.svg';
import { ReactComponent as AssignmentIndIcon } from '@/assets/SVG/assignmentInd.svg';
import Breadcrumb, { IBreadcrumbProps } from '@/components/Breadcrumb';

export default {
  title: '導航元件/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    separator: {
      control: 'text',
    },
    maxItems: {
      control: 'number',
      defaultValue: 8,
    },
  },
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
