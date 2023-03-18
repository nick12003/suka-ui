import { Story } from '@storybook/react';

import Button, { IButtonProps } from '@/components/Button';
import { disableArgs } from './utilityStory';

export default {
  title: '數據輸入元件/Button',
  component: Button,
  argTypes: disableArgs(
    {
      children: {
        type: { name: 'string' },
        defaultValue: 'Button',
      },
      themeColor: {
        defaultValue: 'primary',
        control: { type: 'color', presetColors: ['primary', 'secondary', 'disable', 'error'] },
        table: {
          type: {
            summary: 'TThemeColor',
          },
        },
      },
      variant: {
        control: 'radio',
        options: ['text', 'contained', 'outlined'],
        defaultValue: 'contained',
      },
      isLoading: {
        control: 'boolean',
        defaultValue: false,
      },
      isDisabled: {
        control: 'boolean',
        defaultValue: false,
      },
    },
    [
      {
        args: ['onClick', 'startIcon', 'endIcon'],
        type: 'control',
      },
    ]
  ),
};

const Template: Story<IButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});

export const Outlined = Template.bind({});
Outlined.storyName = '外框樣式';
Outlined.args = {
  variant: 'outlined',
};

export const Text = Template.bind({});
Text.storyName = '文字樣式';
Text.args = {
  variant: 'text',
};

export const LoadingButton = Template.bind({});
LoadingButton.storyName = '載入中';
LoadingButton.args = {
  isLoading: true,
};

export const DisabledButton = Template.bind({});
DisabledButton.storyName = '禁用';
DisabledButton.args = {
  isDisabled: true,
};
