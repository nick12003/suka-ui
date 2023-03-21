import { Story } from '@storybook/react';

import Checkbox, { ICheckboxProps, InternalCheckbox } from '@/components/Checkbox';

import { disableArgs } from './utilityStory';

export default {
  title: '數據輸入元件/Checkbox',
  component: InternalCheckbox,
  argTypes: disableArgs(
    {
      children: {
        type: { name: 'string' },
      },
      defaultChecked: {
        control: 'boolean',
        defaultValue: false,
      },
      size: {
        control: 'radio',
        options: ['small', 'medium', 'large'],
        defaultValue: 'medium',
      },
      isDisabled: {
        control: 'boolean',
        defaultValue: false,
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
    },
    [
      {
        args: ['onChange'],
        type: 'control',
      },
    ]
  ),
};

const Template: Story<ICheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Checkbox',
};

export const DisabledCheckbox = Template.bind({});
DisabledCheckbox.args = {
  isDisabled: true,
  children: 'Checkbox',
};
