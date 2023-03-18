import { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import styled from 'styled-components';

import Collapse from '@/components/Collapse';
import Button from '@/components/Button';
import { disableArgs } from './utilityStory';

export default {
  title: '數據展示元件/Collapse',
  component: Collapse,
  argTypes: disableArgs(
    {
      isExpand: {
        control: 'boolean',
        defaultValue: false,
        table: {
          defaultValue: {
            summary: 'false',
          },
        },
      },
      children: {
        type: { name: 'string' },
        defaultValue: 'Panel',
      },
      header: {
        type: { name: 'string' },
        defaultValue: 'header',
      },
    },
    [
      {
        args: ['expandIcon', 'onClick'],
        type: 'control',
      },
      {
        args: ['headerRef', 'headerProps', 'panelRef', 'panelProps'],
        type: 'table',
      },
    ]
  ),
};

const Template: ComponentStory<typeof Collapse> = (args) => {
  return <Collapse {...args} />;
};

export const Default = Template.bind({});

const ControlWrapper = styled.div`
  border-top: 1px solid #587cb0;
  border-bottom: 1px solid #587cb0;
  & > *:not(:first-child) {
    margin-top: 1px;
  }
`;

const StyledAccordion = styled(Collapse)`
  border: none;
  .accordion__header {
    background: #587cb028;
    padding: 16px;
  }
`;

const Panel = styled.div`
  padding: 16px;
`;

const TemplateControl: ComponentStory<typeof Collapse> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ControlWrapper>
      <Button
        onClick={() => {
          setIsOpen((pre) => !pre);
        }}
      >
        click
      </Button>
      <StyledAccordion {...args} isExpand={isOpen} headerProps={{ className: 'accordion__header' }}>
        <Panel>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industrys standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Panel>
      </StyledAccordion>
    </ControlWrapper>
  );
};

export const Control = TemplateControl.bind({});
Control.storyName = '外部控制';

const AccordionGroup = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #587cb0;
  border-bottom: 1px solid #587cb0;
  & > *:not(:first-child) {
    margin-top: 1px;
  }
`;

const TemplateAccordion: ComponentStory<typeof Collapse> = (args) => {
  const [activeKey, setActiveKey] = useState<number | null>(null);

  return (
    <AccordionGroup>
      {[...Array(4).keys()].map((key) => (
        <StyledAccordion
          key={key}
          {...args}
          header={`header__${key + 1}`}
          isExpand={activeKey === key}
          onClick={() => {
            if (activeKey === key) {
              setActiveKey(null);
            } else {
              setActiveKey(key);
            }
          }}
          headerProps={{ className: 'accordion__header' }}
        >
          <Panel>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
          </Panel>
        </StyledAccordion>
      ))}
    </AccordionGroup>
  );
};

export const Accordion = TemplateAccordion.bind({});
Accordion.storyName = '手風琴';
