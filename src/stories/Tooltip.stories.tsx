import { useState } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import Tooltip, { ITooltipProps, InternalTooltip } from '@/components/Tooltip';
import Button from '@/components/Button';

import { ReactComponent as InfoOutlinedIcon } from '@/assets/SVG/info.svg';

import { disableArgs } from './utilityStory';

export default {
  title: '數據展示元件/Tooltip',
  component: InternalTooltip,
  argTypes: disableArgs(
    {
      showArrow: {
        defaultValue: true,
      },
      placement: {
        defaultValue: 'top',
      },
      themeColor: {
        defaultValue: '#101010',
        control: {
          type: 'color',
          presetColors: ['#101010', 'primary', 'secondary', 'disable', 'error'],
        },
        table: {
          type: {
            summary: 'TThemeColor',
          },
        },
      },
      content: {
        type: { name: 'string' },
      },
    },
    [
      {
        args: ['children'],
        type: 'control',
      },
    ]
  ),
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const SpaceBetween = styled(Row)`
  justify-content: space-between;
`;

const PlacementWrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const Template: Story<ITooltipProps> = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', height: 160 }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      英雄聯盟2022世界大賽
      <Tooltip {...args} content="歡迎來挑戰">
        <span style={{ display: 'flex', alignItems: 'center', marginLeft: 4 }}>
          <InfoOutlinedIcon style={{ cursor: 'pointer' }} />
        </span>
      </Tooltip>
    </div>
  </div>
);

const defaultArgs = {
  children: 'Tooltip',
  content: (
    <div>
      <div>Tooltip</div>
      <div>Awesome!</div>
    </div>
  ),
};

const TemplatePlacement: Story<ITooltipProps> = (args) => (
  <PlacementWrapper>
    <Row>
      <Tooltip {...args} placement="bottom-left">
        <Button variant="outlined">Bottom Left</Button>
      </Tooltip>
      <Tooltip {...args} placement="bottom">
        <Button variant="outlined">Bottom</Button>
      </Tooltip>
      <Tooltip {...args} placement="bottom-right">
        <Button variant="outlined">Bottom Right</Button>
      </Tooltip>
    </Row>
    <SpaceBetween>
      <Tooltip {...args} placement="right-top">
        <Button variant="outlined">Right Top</Button>
      </Tooltip>
      <Tooltip {...args} placement="left-top">
        <Button variant="outlined">Left Top</Button>
      </Tooltip>
    </SpaceBetween>
    <SpaceBetween>
      <Tooltip {...args} placement="right">
        <Button variant="outlined">Right</Button>
      </Tooltip>
      <Tooltip {...args} placement="left">
        <Button variant="outlined">Left</Button>
      </Tooltip>
    </SpaceBetween>
    <SpaceBetween>
      <Tooltip {...args} placement="right-bottom">
        <Button variant="outlined">Right Bottom</Button>
      </Tooltip>
      <Tooltip {...args} placement="left-bottom">
        <Button variant="outlined">Left Bottom</Button>
      </Tooltip>
    </SpaceBetween>
    <Row>
      <Tooltip {...args} placement="top-left">
        <Button variant="outlined">Top Left</Button>
      </Tooltip>
      <Tooltip {...args} placement="top">
        <Button variant="outlined">Top</Button>
      </Tooltip>
      <Tooltip {...args} placement="top-right">
        <Button variant="outlined">Top Right</Button>
      </Tooltip>
    </Row>
  </PlacementWrapper>
);

export const Default = Template.bind({});

export const Placement = TemplatePlacement.bind({});
Placement.args = {
  ...defaultArgs,
};
