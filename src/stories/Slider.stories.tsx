import { useState, useEffect } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import Slider, { ISliderProps, InternalSlider } from '@/components/Slider';

import { disableArgs } from './utilityStory';

export default {
  title: '數據輸入元件/Slider',
  component: InternalSlider,
  argTypes: disableArgs(
    {
      defaultValue: {
        defaultValue: 0,
      },
      min: {
        defaultValue: 0,
      },
      max: {
        defaultValue: 100,
      },
      step: {
        defaultValue: 1,
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

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const Template: Story<ISliderProps> = (args) => {
  const [value, setValue] = useState(args.defaultValue ?? 0);

  useEffect(() => {}, []);
  return (
    <SliderWrapper>
      <Slider
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
      <span>{value}</span>
    </SliderWrapper>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithStep = Template.bind({});
WithStep.args = {
  min: 0,
  max: 8,
  step: 2,
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  defaultValue: 50,
};
