import { useState } from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import Button from '@/components/Button';
import Drawer, { IDrawerProps, TPlacement, InternalDrawer } from '@/components/Drawer';

import { disableArgs } from './utilityStory';

export default {
  title: '導航元件/Drawer',
  component: InternalDrawer,
  argTypes: disableArgs(
    {
      placement: {
        control: 'radio',
        options: ['top', 'right', 'bottom-reverse', 'left'],
        defaultValue: 'left',
      },
      isOpen: {
        defaultValue: false,
      },
      animationDuration: {
        defaultValue: 200,
      },
      children: {
        type: { name: 'string' },
      },
    },
    [
      {
        args: ['onClose', 'isOpen', 'children'],
        type: 'control',
      },
    ]
  ),
};

const ButtonGroup = styled.div`
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const Template: Story<IDrawerProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ width: 300 }}>Drawer content</div>
      </Drawer>
    </>
  );
};

const TemplatePlacement: Story<IDrawerProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<TPlacement>('top');
  const [drawerStyle, setDrawerStyle] = useState({});

  const handleOpenDrawer = ({ clickedPlacement }: { clickedPlacement: TPlacement }) => {
    setIsOpen(true);
    setPlacement(clickedPlacement);
    if (['left', 'right'].indexOf(clickedPlacement) > -1) {
      setDrawerStyle({
        width: 300,
      });
    }
    if (['top', 'bottom'].indexOf(clickedPlacement) > -1) {
      setDrawerStyle({
        height: 300,
      });
    }
  };

  return (
    <>
      <ButtonGroup>
        <Button variant="outlined" onClick={() => handleOpenDrawer({ clickedPlacement: 'top' })}>
          Top
        </Button>
        <Button variant="outlined" onClick={() => handleOpenDrawer({ clickedPlacement: 'right' })}>
          Right
        </Button>
        <Button variant="outlined" onClick={() => handleOpenDrawer({ clickedPlacement: 'bottom' })}>
          Bottom
        </Button>
        <Button variant="outlined" onClick={() => handleOpenDrawer({ clickedPlacement: 'left' })}>
          Left
        </Button>
      </ButtonGroup>
      <Drawer {...args} isOpen={isOpen} placement={placement} onClose={() => setIsOpen(false)}>
        <div style={drawerStyle}>{`${placement} drawer`}</div>
      </Drawer>
    </>
  );
};

export const Default = Template.bind({});

export const Placement = TemplatePlacement.bind({});
