import { Story } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as FaceIcon } from '@/assets/SVG/face.svg';
import { ReactComponent as DoneIcon } from '@/assets/SVG/done.svg';

import Chip, { IChipProps } from '@/components/Chip';

export default {
  title: '數據展示元件/Chip',
  component: Chip,
};

const VariantGroup = styled.div`
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const SpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    <Chip {...args} label="Contained style" />
    <Chip {...args} label="Outlined style" variant="outlined" />
  </VariantGroup>
);

const TemplateCustomColor: Story<IChipProps> = (args) => {
  const [pickedColor, setPickedColor] = useState('#FE6B8B');

  return (
    <SpaceBetween>
      <VariantGroup>
        <Chip {...args} themeColor={pickedColor} label="Contained style" />
        <Chip {...args} themeColor={pickedColor} label="Outlined style" variant="outlined" />
      </VariantGroup>
      <input
        type="color"
        value={pickedColor}
        onChange={(event) => setPickedColor(event.target.value)}
      />
    </SpaceBetween>
  );
};

const TemplateWithDeleteIcon = () => {
  const args = {
    onDelete: undefined,
    defaultColor: '#1976d2',
  };
  return (
    <ChipsWrapper>
      <Chip {...args} label="with onDelete" onDelete={() => null} />
      <Chip {...args} label="icon with onDelete" onDelete={() => null} icon={<FaceIcon />} />
      <Chip {...args} label="custom deleteIcon" deleteIcon={<DoneIcon />} />
      <Chip {...args} label="icon with deleteIcon" deleteIcon={<DoneIcon />} icon={<FaceIcon />} />
      <Chip {...args} label="with onDelete outlined" onDelete={() => null} variant="outlined" />
      <Chip
        {...args}
        label="icon with onDelete outlined"
        onDelete={() => null}
        icon={<FaceIcon />}
        variant="outlined"
      />
      <Chip
        {...args}
        label="custom deleteIcon outlined"
        deleteIcon={<DoneIcon />}
        variant="outlined"
      />
      <Chip
        {...args}
        label="icon with deleteIcon outlined"
        deleteIcon={<DoneIcon />}
        icon={<FaceIcon />}
        variant="outlined"
      />
    </ChipsWrapper>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Chip',
  onDelete: undefined,
};

export const Variant = TemplateVariant.bind({});
Variant.args = {
  onDelete: undefined,
};

export const CustomColor = TemplateCustomColor.bind({});
CustomColor.args = {
  onDelete: undefined,
};

export const WithIcon = TemplateWithDeleteIcon.bind({});
