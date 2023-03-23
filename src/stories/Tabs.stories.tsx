import { useState } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import { ReactComponent as PhoneIcon } from '@/assets/SVG/phone.svg';
import { ReactComponent as FavoriteIcon } from '@/assets/SVG/favorite.svg';
import { ReactComponent as PersonPinIcon } from '@/assets/SVG/personPin.svg';

import Tabs, { ITabGroupProps, InternalTabs } from '@/components/Tabs';

import { disableArgs } from './utilityStory';

export default {
  title: '導航元件 /Tabs',
  component: InternalTabs,
  argTypes: disableArgs(
    {
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
        args: ['options', 'value', 'onChange'],
        type: 'control',
      },
    ]
  ),
};

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #eee;
`;

const StyledCentered = styled(Tabs)`
  border-bottom: 1px solid #eee;
  .tab__tab-group {
    justify-content: center;
  }
`;

const StyledIconTabs = styled(Tabs)`
  border-bottom: 1px solid #eee;
  .tab__tab-group {
    justify-content: center;
  }
  .tab__tab-button {
    color: #b9b9b9;
  }
`;

const TabPanel = styled.div`
  padding: 20px 0px;
`;

const tabOptions = [
  {
    value: 'item-one',
    label: 'ITEM ONE',
  },
  {
    value: 'item-two',
    label: 'ITEM TWO',
  },
  {
    value: 'item-three',
    label: 'ITEM THREE',
  },
  {
    value: 'item-four',
    label: 'ITEM FOUR',
  },
];

const iconTabOptions = [
  {
    value: 'phone',
    label: <PhoneIcon />,
  },
  {
    value: 'favorite',
    label: <FavoriteIcon />,
  },
  {
    value: 'person',
    label: <PersonPinIcon />,
  },
];

const Template: Story<ITabGroupProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(tabOptions[0].value);

  return (
    <>
      <StyledTabs
        {...args}
        value={selectedValue}
        options={tabOptions}
        onChange={(value) => setSelectedValue(value)}
      />
      <TabPanel>{`TabPanel of #${selectedValue}`}</TabPanel>
    </>
  );
};

const TemplateCentered: Story<ITabGroupProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(tabOptions[0].value);

  return (
    <>
      <StyledCentered
        options={tabOptions}
        {...args}
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
      />
      <TabPanel>{`TabPanel of #${selectedValue}`}</TabPanel>
    </>
  );
};

const TemplateIconTabs = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(iconTabOptions[0].value);

  return (
    <>
      <StyledIconTabs
        options={iconTabOptions}
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
      />
      <TabPanel>{`TabPanel of #${selectedValue}`}</TabPanel>
    </>
  );
};

export const Default = Template.bind({});

export const Centered = TemplateCentered.bind({});

export const IconTab = TemplateIconTabs.bind({});
