import { useState } from 'react';
import { Story } from '@storybook/react';
import styled, { keyframes } from 'styled-components';

import Spin, { ISpinProps, InternalSpin } from '@/components/Spin';
import Switch from '@/components/Switch';
import { ReactComponent as Spinner } from '@/assets/SVG/spinner.svg';

import { disableArgs } from './utilityStory';

export default {
  title: '反饋元件/Spin',
  component: InternalSpin,
  argTypes: disableArgs(
    {
      isLoading: {
        control: 'boolean',
        defaultValue: false,
      },
    },
    [
      {
        args: ['indicator', 'children'],
        type: 'control',
      },
    ]
  ),
};

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotateContainer = styled.div`
  width: 40px;
  height: 40px;
  animation: ${rotateAnimation} 1000ms ease-in-out infinite;
  & svg {
    height: 100%;
    width: 100%;
  }
`;

const MockContent = styled.div`
  max-width: 500px;
  padding: 20px;
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #b9b9b9;
`;

const Template: Story<ISpinProps> = (args) => <Spin {...args} />;

const TemplateSpinContainer: Story<ISpinProps> = (args) => {
  const [isChecked, setIsChecked] = useState(false);
  const [useCustomIndicator, setUseCustomIndicator] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Spin
        isLoading={isChecked}
        indicator={
          useCustomIndicator ? (
            <RotateContainer>
              <Spinner />
            </RotateContainer>
          ) : undefined
        }
      >
        <MockContent>
          <h1>Lorem Ipsum</h1>
          <p>
            Why do we use it? It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of using Lorem Ipsum is
            that it has a more-or-less normal distribution of letters, as opposed to using Content
            here, content here, making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for lorem ipsum will uncover many web sites still in their infancy. Various
            versions have evolved over the years, sometimes by accident, sometimes on purpose
            (injected humour and the like).
          </p>
          <p>
            Why do we use it? It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of using Lorem Ipsum is
            that it has a more-or-less normal distribution of letters, as opposed to using Content
            here, content here, making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for lorem ipsum will uncover many web sites still in their infancy. Various
            versions have evolved over the years, sometimes by accident, sometimes on purpose
            (injected humour and the like).
          </p>
          <p>
            Why do we use it? It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of using Lorem Ipsum is
            that it has a more-or-less normal distribution of letters, as opposed to using Content
            here, content here, making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for lorem ipsum will uncover many web sites still in their infancy. Various
            versions have evolved over the years, sometimes by accident, sometimes on purpose
            (injected humour and the like).
          </p>
        </MockContent>
      </Spin>
      <div>
        <div>
          <div>是否載入中</div>
          <Switch isChecked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
        </div>
        <div>
          <div> 自訂義符號</div>
          <Switch
            isChecked={useCustomIndicator}
            onChange={() => {
              setUseCustomIndicator((prev) => !prev);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: '背景',
  isLoading: true,
};

export const CustomIndicator = Template.bind({});
CustomIndicator.args = {
  indicator: (
    <RotateContainer>
      <Spinner />
    </RotateContainer>
  ),
};

export const SpinAsContainer = TemplateSpinContainer.bind({});
