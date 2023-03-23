import styled from 'styled-components';
import { Story } from '@storybook/react';

import { message, IToastProps, InternalToast } from '@/components/Toast';
import Button from '@/components/Button';

import { disableArgs } from './utilityStory';

export default {
  title: '反饋元件/Toast',
  component: InternalToast,
  argTypes: disableArgs({}, [
    {
      args: ['type', 'content', 'duration'],
      type: 'control',
    },
  ]),
};

const ButtonGroup = styled.div`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const Template: Story<IToastProps> = () => (
  <ButtonGroup>
    <Button
      variant="outlined"
      onClick={() => message.success({ type: 'success', content: '新增成功' })}
    >
      Success1
    </Button>
    <Button
      variant="outlined"
      onClick={() => message.info({ type: 'info', content: 'Some information' })}
    >
      Information
    </Button>
    <Button
      variant="outlined"
      onClick={() => message.warn({ type: 'warn', content: '伺服器出了一點問題' })}
    >
      Warning
    </Button>
    <Button
      variant="outlined"
      onClick={() => message.error({ type: 'error', content: '刪除失敗' })}
    >
      Error
    </Button>
  </ButtonGroup>
);

export const Default = Template.bind({});
