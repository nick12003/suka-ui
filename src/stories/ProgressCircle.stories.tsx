import { useState } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import ProgressCircle, {
  IProgressCircleProps,
  InternalProgressCircle,
} from '@/components/ProgressCircle';

import { disableArgs } from './utilityStory';

export default {
  title: '反饋元件/ProgressCircle',
  component: InternalProgressCircle,
  argTypes: disableArgs(
    {
      value: {
        defaultValue: 0,
      },
      isClockwise: {
        defaultValue: true,
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
      isStatusActive: {
        defaultValue: true,
      },
      strokeColor: {
        table: {
          type: {
            detail: `{'0%': '#108ee9','100%': '#87d068'}`,
          },
        },
      },
    },
    [
      {
        args: ['strokeColor'],
        type: 'control',
      },
    ]
  ),
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 20px;
`;

const ResizeProgressCircle = styled(ProgressCircle)<{ $size?: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`;

const Template: Story<IProgressCircleProps> = (args) => <ProgressCircle {...args} />;

const TemplateDiffValueDemo: Story<IProgressCircleProps> = (args) => (
  <Container>
    <ProgressCircle {...args} />
    <ProgressCircle {...args} value={25} />
    <ProgressCircle {...args} value={50} />
    <ProgressCircle {...args} value={75} />
    <ProgressCircle {...args} value={100} />
    <ProgressCircle {...args} value={120} />
  </Container>
);

const TemplateGradientTrack = () => {
  const strokeColor = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  return (
    <Container>
      <ProgressCircle strokeColor={strokeColor} />
      <ProgressCircle strokeColor={strokeColor} value={25} />
      <ProgressCircle strokeColor={strokeColor} value={50} />
      <ProgressCircle strokeColor={strokeColor} value={75} />
      <ProgressCircle strokeColor={strokeColor} value={100} />
      <ProgressCircle strokeColor={strokeColor} value={120} />
    </Container>
  );
};

const TemplateDiffSize: Story<IProgressCircleProps> = (args) => (
  <Container>
    <ResizeProgressCircle {...args} $size={60} />
    <ResizeProgressCircle {...args} />
    <ResizeProgressCircle {...args} $size={200} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  value: 20,
};

export const LimitValue = TemplateDiffValueDemo.bind({});

export const GradientTrack = TemplateGradientTrack.bind({});

export const CounterClockwise = TemplateDiffValueDemo.bind({});
CounterClockwise.args = {
  isClockwise: false,
};

export const Size = TemplateDiffSize.bind({});
Size.args = {
  value: 87,
};
