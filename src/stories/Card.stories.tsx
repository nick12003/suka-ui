import { Story } from '@storybook/react';
import styled from 'styled-components';

import { ReactComponent as Share } from '@/assets/share.svg';
import { ReactComponent as ThumbUp } from '@/assets/thumbUp.svg';
import { ReactComponent as Bell } from '@/assets/bell.svg';

import Card, { ICardProps } from '@/components/Card';
import Meta, { IMetaProps } from '@/components/Card/Meta';

export default {
  title: '數據展示元件/Card',
  component: Card,
};

const Actions = styled.div`
  padding: 16px 16px 4px 16px;
  color: #888;
  & > svg {
    cursor: pointer;
  }
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const VariantGroup = styled.div`
  display: inline-flex;
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const Template: Story<ICardProps> = (args) => <Card {...args} />;

const TemplateVariant: Story<ICardProps> = (args) => (
  <VariantGroup>
    <Card {...args} style={{ width: 300 }} />
    <Card {...args} variant="horizontal" />
    <Card {...args} variant="horizontal-reverse" />
  </VariantGroup>
);

const defaultArgs = {
  cover: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/League_of_Legends_2019_vector.svg/220px-League_of_Legends_2019_vector.svg.png"
      alt=""
      style={{ objectFit: 'cover' }}
    />
  ),
  children: (
    <Meta
      avatarUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/LoL_icon.svg/250px-LoL_icon.svg.png"
      title="2022英雄聯盟世界大賽"
      description="STAR WALKIN'"
    />
  ),
  footer: (
    <Actions>
      <ThumbUp />
      <Share />
      <Bell />
    </Actions>
  ),
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Variant = TemplateVariant.bind({});
Variant.args = {
  ...defaultArgs,
};
