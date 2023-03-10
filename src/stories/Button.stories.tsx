import { Story } from '@storybook/react';

import Button, { IButtonProps } from '@/components/Button';

export default {
  title: '數據輸入元件/Button',
  component: Button,
};

const Template: Story<IButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};

export const Outlined = Template.bind({});
Outlined.args = {
  children: 'Button',
  variant: 'outlined',
};

export const Text = Template.bind({});
Text.args = {
  children: 'Button',
  variant: 'text',
};

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  children: 'Button',
  isLoading: true,
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  children: 'Button',
  isDisabled: true,
};
