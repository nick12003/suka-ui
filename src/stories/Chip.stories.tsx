import { Story } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as FaceIcon } from '@/assets/SVG/face.svg';
import { ReactComponent as DoneIcon } from '@/assets/SVG/done.svg';

import Chip, { IChipProps, InternalChip } from '@/components/Chip';

import { disableArgs } from './utilityStory';

export default {
  title: '數據展示元件/Chip',
  component: InternalChip,
  argTypes: disableArgs(
    {
      children: {
        control: 'text',
      },
      variant: {
        control: 'radio',
        options: ['contained', 'outlined', 'horizontal-reverse'],
        defaultValue: 'contained',
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
        args: ['onDelete', 'icon', 'deleteIcon'],
        type: 'control',
      },
    ]
  ),
};

const VariantGroup = styled.div`
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const ChipsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  & > * {
    margin: 12px;
  }
`;

const Template: Story<IChipProps> = (args) => <Chip {...args} />;

const TemplateVariant: Story<IChipProps> = (args) => (
  <VariantGroup>
    <Chip {...args}>Contained style</Chip>
    <Chip {...args} variant="outlined">
      Outlined style
    </Chip>
  </VariantGroup>
);

const TemplateWithIcon: Story<IChipProps> = (args) => {
  return (
    <ChipsWrapper>
      <Chip {...args} onDelete={() => null}>
        with onDelete
      </Chip>
      <Chip {...args} onDelete={() => null} icon={<FaceIcon />}>
        icon with onDelete
      </Chip>
      <Chip {...args} deleteIcon={<DoneIcon />}>
        custom deleteIcon
      </Chip>
      <Chip {...args} deleteIcon={<DoneIcon />} icon={<FaceIcon />}>
        icon with deleteIcon
      </Chip>
      <Chip {...args} onDelete={() => null} variant="outlined">
        with onDelete outlined
      </Chip>
      <Chip {...args} onDelete={() => null} icon={<FaceIcon />} variant="outlined">
        icon with onDelete outlined
      </Chip>
      <Chip {...args} deleteIcon={<DoneIcon />} variant="outlined">
        custom deleteIcon outlined
      </Chip>
      <Chip {...args} deleteIcon={<DoneIcon />} icon={<FaceIcon />} variant="outlined">
        icon with deleteIcon outlined
      </Chip>
    </ChipsWrapper>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: 'Chip',
  onDelete: undefined,
};

export const Variant = TemplateVariant.bind({});
Variant.storyName = '外框樣式';
Variant.args = {
  onDelete: undefined,
};

export const WithIcon = TemplateWithIcon.bind({});
WithIcon.storyName = '搭配Icon';
WithIcon.args = {
  onDelete: undefined,
};
