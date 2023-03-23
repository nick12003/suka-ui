import React from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import Skeleton, { ISkeletonProps } from '@/components/Skeleton';

export default {
  title: '反饋元件/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: {
      defaultValue: 'slide',
    },
  },
};

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 16px;
  }
`;

const TextLineWrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 12px;
  }
`;

const Avatar: Story<ISkeletonProps & React.ComponentPropsWithoutRef<'div'>> = (args) => (
  <Skeleton style={{ width: 50, height: 50 }} {...args} />
);

const TextLine: Story<ISkeletonProps & React.ComponentPropsWithoutRef<'div'>> = (args) => (
  <Skeleton style={{ width: 50, height: 12 }} {...args} />
);

const Template: Story<ISkeletonProps & React.ComponentPropsWithoutRef<'div'>> = ({ variant }) => (
  <SkeletonWrapper>
    <Avatar variant={variant} />
    <TextLineWrapper>
      <TextLine variant={variant} style={{ width: 300 }} />
      <TextLine variant={variant} style={{ width: 230 }} />
    </TextLineWrapper>
  </SkeletonWrapper>
);

export const Default = Template.bind({});
