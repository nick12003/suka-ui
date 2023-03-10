import { Story } from '@storybook/react';

import { ReactComponent as Line } from '@/assets/line.svg';
import Badge, { IBadgeProps } from '@/components/Badge';

export default {
  title: '數據展示元件/Badge',
  component: Badge,
};

const Template: Story<IBadgeProps> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <Line />,
  value: 7,
};
