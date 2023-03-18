import { useState } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import { ReactComponent as FavoriteBorderIcon } from '@/assets/SVG/favoriteBorder.svg';
import { ReactComponent as SentimentVerySatisfiedOutlinedIcon } from '@/assets/SVG/sentimentVerySatisfied.svg';

import Rate, { IRateProps } from '../components/Rate';

export default {
  title: '數據輸入元件/Rate',
  component: Rate,
};

const Template: Story<IRateProps> = (args) => <Rate {...args} />;

const Row = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

const TemplateWithState: Story<IRateProps> = (args) => {
  const [value, setValue] = useState(3.5);
  return (
    <Row>
      <Rate {...args} onChange={setValue} />
      <div>{value}</div>
    </Row>
  );
};

const CharacterGroup = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const TemplateWithDiffCharacter: Story<IRateProps> = (args) => (
  <CharacterGroup>
    <Rate {...args} character={<FavoriteBorderIcon />} />
    <Rate {...args} character={<SentimentVerySatisfiedOutlinedIcon />} />
    <Rate {...args} character="好" />
  </CharacterGroup>
);

const TemplateWithCount: Story<IRateProps> = (args) => (
  <CharacterGroup>
    <Rate {...args} count={1} />
    <Rate {...args} count={3} />
    <Rate {...args} count={5} />
    <Rate {...args} count={7} />
  </CharacterGroup>
);

export const Default = Template.bind({});
Default.args = {};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  defaultValue: 2.5,
};

export const WithCount = TemplateWithCount.bind({});
WithCount.args = {};

export const DisableInteraction = Template.bind({});
DisableInteraction.args = {
  defaultValue: 4,
  isDisabled: true,
};

export const WithOnChange = TemplateWithState.bind({});
WithOnChange.args = {
  defaultValue: 3,
};

export const AllowHalf = TemplateWithState.bind({});
AllowHalf.args = {
  defaultValue: 3.5,
  allowHalf: true,
};

export const WithSize = Template.bind({});
WithSize.args = {
  defaultValue: 3,
  size: 48,
};

export const WithColor = Template.bind({});
WithColor.args = {
  defaultValue: 3,
  themeColor: '#ff389c',
};

export const CustomCharacter = TemplateWithDiffCharacter.bind({});
CustomCharacter.args = {
  allowHalf: true,
  defaultValue: 2.5,
};
