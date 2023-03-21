import { Story } from '@storybook/react';
import { ReactComponent as SearchIcon } from '@/assets/SVG/search.svg';

import TextField, { ITextFieldProps, InternalTextField } from '@/components/TextField';

import { disableArgs } from './utilityStory';

export default {
  title: '數據輸入元件/TextField',
  component: InternalTextField,
  argTypes: disableArgs(
    {
      isError: {
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
        args: ['prefix', 'suffix'],
        type: 'control',
      },
    ]
  ),
};

const Template: Story<ITextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Text Field',
};

export const WithPrefix = Template.bind({});
WithPrefix.storyName = '前綴';
WithPrefix.args = {
  prefix: <div style={{ fontSize: '1.5rem', marginRight: '0.25rem' }}>$</div>,
  placeholder: '請輸入金額',
};

export const WithSuffix = Template.bind({});
WithSuffix.storyName = '後綴';
WithSuffix.args = {
  suffix: <SearchIcon style={{ fontSize: '1.5rem', color: '#0000008a' }} />,
  placeholder: '搜尋',
};

export const ErrorStyle = Template.bind({});
ErrorStyle.storyName = '錯誤';
ErrorStyle.args = {
  placeholder: 'Error Text Field',
  isError: true,
};

export const DisabledStyle = Template.bind({});
DisabledStyle.storyName = '禁用';
DisabledStyle.args = {
  placeholder: 'Disabled Text Field',
  isDisabled: true,
};
