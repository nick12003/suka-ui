import { Story } from '@storybook/react';
import styled from 'styled-components';

import { ReactComponent as Line } from '@/assets/line.svg';
import Badge, { IBadgeProps } from '@/components/Badge';
import { disableArgs } from './utilityStory';

export default {
  title: '數據展示元件/Badge',
  component: Badge,
  argTypes: disableArgs(
    {
      max: {
        control: 'number',
        defaultValue: 99,
      },
      themeColor: {
        defaultValue: '#F85149',
        control: { type: 'color', presetColors: ['#F85149'] },
      },
      placement: {
        defaultValue: 'top-right',
        control: 'radio',
        options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      },
      variant: {
        defaultValue: 'standard',
        control: 'radio',
        options: ['standard', 'dot'],
      },
      showZero: {
        control: 'boolean',
        defaultValue: false,
      },
    },
    [
      {
        args: ['children'],
        type: 'control',
      },
      {
        args: ['badgeRef', 'badgeProps'],
        type: 'table',
      },
    ]
  ),
};

const LineIcon = styled(Line)`
  font-size: 2rem;
  color: #06c152;
`;

const Template: Story<IBadgeProps> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 7,
  children: <LineIcon />,
};
