import { Story } from '@storybook/react';

import Switch, { ISwitchProps, InternalSwitch } from '@/components/Switch';

import { disableArgs } from './utilityStory';

export default {
  title: '數據輸入元件/Switch',
  component: InternalSwitch,
  argTypes: disableArgs(
    {
      isChecked: {
        control: 'boolean',
        defaultValue: false,
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
      size: {
        control: 'radio',
        options: ['small', 'default'],
        defaultValue: 'default',
      },
    },
    [
      {
        args: ['defaultChecked', 'onChange'],
        type: 'control',
      },
    ]
  ),
};

const Template: Story<ISwitchProps> = (args) => <Switch {...args} />;

export const Default = Template.bind({});

export const withCallBack = Template.bind({});
withCallBack.storyName = '使用OnChange回調';
withCallBack.args = {
  onChange: (isChecked) => {
    alert(`更改為 ${isChecked ? '開啟' : '關閉'} 狀態`);
  },
};

export const WithLabel = Template.bind({});
WithLabel.storyName = '包含內容文字';
WithLabel.args = {
  checkedChildren: '開啟',
  unCheckedChildren: '關閉',
};
