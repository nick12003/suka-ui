import { useState } from 'react';
import { Story } from '@storybook/react';

import Modal, { IModalProps, InternalModal } from '@/components/Modal';
import Dialog from '@/components/Dialog';
import Button from '@/components/Button';

import { disableArgs } from './utilityStory';

export default {
  title: '反饋元件/Modal',
  component: InternalModal,
  argTypes: disableArgs(
    {
      isOpen: {
        defaultValue: false,
      },
      hasMask: {
        defaultValue: true,
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
        args: ['onClose'],
        type: 'control',
      },
    ]
  ),
};

const Template: Story<IModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ background: '#FFF' }}>Modal content</div>
      </Modal>
    </>
  );
};

const TemplateDialog: Story = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={<div style={{ fontWeight: 500 }}>Title</div>}
      >
        <div>
          <div>Some contents...</div>
          <div>Some contents...</div>
          <div>Some contents...</div>
        </div>
      </Dialog>
    </>
  );
};

export const Default = Template.bind({});

export const ModalAsDialog = TemplateDialog.bind({});
ModalAsDialog.storyName = 'Dialog';
