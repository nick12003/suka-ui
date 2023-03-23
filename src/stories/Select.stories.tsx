import { Story } from '@storybook/react';
import Select, { ISelectProps, InternalSelect } from '@/components/Select';

import { disableArgs } from './utilityStory';

export default {
  title: '導航元件/Select',
  component: InternalSelect,
  argTypes: disableArgs(
    {
      isDisabled: {
        defaultValue: false,
      },
      isLoading: {
        defaultValue: false,
      },
    },
    [
      {
        args: ['options', 'onSelect'],
        type: 'control',
      },
    ]
  ),
};

const options = [
  {
    value: 'all',
    label: '我全都要',
  },
  {
    value: 'AZ',
    label: 'AZ 疫苗',
  },
  {
    value: 'BNT',
    label: 'BNT 疫苗',
  },
  {
    value: 'Moderna',
    label: '莫德納疫苗',
  },
  {
    value: 'Vaccine',
    label: '高端疫苗',
  },
];

const Template: Story<ISelectProps> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '請選擇預約疫苗',
  options,
};

export const Disabled = Template.bind({});
Disabled.args = {
  options,
  placeholder: '請選擇預約疫苗',
  isDisabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  options,
  placeholder: '請選擇預約疫苗',
  isLoading: true,
};
