/* eslint-disable react/destructuring-assignment */
import { useState, useEffect } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import ProgressBar, { IProgressBarProps } from '../components/ProgressBar';
import Button from '../components/Button';

export default {
  title: '反饋元件/ProgressBar',
  component: ProgressBar,
};

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const GradientProgressBar = styled(ProgressBar)`
  .progress-bar__track {
    background: linear-gradient(45deg, #ff8e53 30%, #fe6b8b 90%);
  }
`;

const Template: Story<IProgressBarProps> = (args) => (
  <Container>
    <ProgressBar {...args} />
    <ProgressBar {...args} value={50} />
    <ProgressBar {...args} value={75} />
    <ProgressBar {...args} value={100} />
    {args.showInfo && <ProgressBar {...args} value={120} />}
  </Container>
);

const TemplateGradient: Story<IProgressBarProps> = (args) => (
  <Container>
    <GradientProgressBar {...args} />
    <GradientProgressBar {...args} value={50} />
    <GradientProgressBar {...args} value={75} />
    <GradientProgressBar {...args} value={100} />
    {args.showInfo && <GradientProgressBar {...args} value={120} />}
  </Container>
);

const TemplateCustomColor: Story<IProgressBarProps> = (args) => {
  const defaultColor = '#FE6B8B';
  const [pickedColor, setPickedColor] = useState(defaultColor);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <input
          type="color"
          value={pickedColor}
          onChange={(event) => setPickedColor(event.target.value)}
        />
      </div>
      <Container>
        <ProgressBar {...args} themeColor={pickedColor} />
        <ProgressBar {...args} value={50} themeColor={pickedColor} />
        <ProgressBar {...args} value={75} themeColor={pickedColor} />
        <ProgressBar {...args} value={100} themeColor={pickedColor} />
        {args.showInfo && <ProgressBar {...args} value={120} themeColor={pickedColor} />}
      </Container>
    </div>
  );
};

const TemplateTransition: Story<IProgressBarProps> = (args) => {
  const [playKey, setPlayKey] = useState(true);
  const [transitionValue, setTransitionValue] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    setTransitionValue(0);
    if (playKey) {
      setPlayKey(false);
      intervalId = setInterval(() => {
        setTransitionValue((prev) => {
          if (prev >= 120) {
            clearInterval(intervalId);
          }
          return prev + 1;
        });
      }, 30);
    }
  }, [playKey]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <Button onClick={() => setPlayKey(true)}>重播</Button>
      </div>
      <Container>
        <ProgressBar {...args} />
        <ProgressBar {...args} value={transitionValue < 50 ? transitionValue : 50} />
        <ProgressBar {...args} value={transitionValue < 75 ? transitionValue : 75} />
        <ProgressBar {...args} value={transitionValue < 100 ? transitionValue : 100} />
        {args.showInfo && (
          <ProgressBar {...args} value={transitionValue < 120 ? transitionValue : 120} />
        )}
      </Container>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  showInfo: true,
};

export const WithoutInfo = Template.bind({});
WithoutInfo.args = {
  showInfo: false,
};

export const CustomColor = TemplateCustomColor.bind({});
CustomColor.args = {
  showInfo: true,
  themeColor: '',
};

export const GradientTrack = TemplateGradient.bind({});
GradientTrack.args = {
  showInfo: true,
};

export const HasActiveAnimation = Template.bind({});
HasActiveAnimation.args = {
  showInfo: true,
  isStatusActive: true,
};

export const HasTransition = TemplateTransition.bind({});
HasTransition.args = {
  showInfo: true,
  isStatusActive: true,
};