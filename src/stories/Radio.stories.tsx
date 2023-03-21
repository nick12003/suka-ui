import { useState, useEffect } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import Button from '@/components/Button';
import { TOnChange, TValue } from '@/components/Radio/RadioContext';
import Radio, { IRadioProps, InternalRadio } from '@/components/Radio';
import RadioGroup, { IRadioGroupProps } from '@/components/Radio/RadioGroup';

import { disableArgs } from './utilityStory';

export default {
  title: '數據輸入元件/Radio',
  component: InternalRadio,
  argTypes: disableArgs(
    {
      children: {
        type: { name: 'string' },
      },
      value: {
        type: { name: 'string' },
        defaultValue: 'radio',
      },
      isChecked: {
        control: 'boolean',
        defaultValue: false,
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
        args: ['onChange', 'checkedIcon', 'unCheckedIcon'],
        type: 'control',
      },
    ]
  ),
};

const Template: Story<IRadioProps> = (args) => <Radio {...args} />;

const TemplateWithRadioGroup: Story<IRadioGroupProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<TValue>('others');

  const handleOnChange: TOnChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <RadioGroup
      value={selectedValue}
      onChange={handleOnChange}
      columns={2}
      style={{
        maxWidth: 500,
      }}
      {...args}
    >
      <Radio value="male">Male</Radio>
      <Radio value="female">Female</Radio>
      <Radio value="others">Others</Radio>
    </RadioGroup>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: 'Radio',
};

export const DisabledRadio = Template.bind({});
DisabledRadio.storyName = '禁用';
DisabledRadio.args = {
  isDisabled: true,
  children: 'Radio',
};

export const WithRadioGroup = TemplateWithRadioGroup.bind({});
WithRadioGroup.storyName = '群組';
