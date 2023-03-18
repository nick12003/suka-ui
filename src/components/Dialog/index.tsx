import React from 'react';
import styled, { keyframes } from 'styled-components';

import Modal, { IModalProps } from '../Modal';

import Button from '../Button';

import { ReactComponent as CloseIcon } from '@/assets/SVG/close.svg';

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.div`
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

const FooterWrapper = styled.div`
  padding: 12px 20px;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

const hideDialog = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0;
  }
`;

const showDialog = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

interface IDialogWrapper {
  $isOpen: boolean;
}

const DialogWrapper = styled.div<IDialogWrapper>`
  width: calc(100vw - 40px);
  max-width: 520px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  animation: ${(props) => (props.$isOpen ? showDialog : hideDialog)} 200ms ease-in-out forwards;
`;

const Content = styled.div`
  padding: 20px;
`;

export interface IDialogProps extends Pick<IModalProps, 'isOpen'> {
  /**
   * 標頭內容
   */
  title?: React.ReactNode;
  /**
   * 內容
   */
  children: React.ReactNode;
  /**
   * 觸發抽屜關閉
   */
  onClose?: React.MouseEventHandler<HTMLDivElement> | React.MouseEventHandler<HTMLButtonElement>;
  /**
   * 送出事件
   */
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
}

const InternalDialog: React.ForwardRefRenderFunction<HTMLDivElement, IDialogProps> = (
  { isOpen = false, onClose, onSubmit, title, children, ...props },
  ref
) => (
  <Modal isOpen={isOpen} onClose={onClose as React.MouseEventHandler<HTMLDivElement>}>
    <DialogWrapper ref={ref} $isOpen={isOpen} {...props}>
      <HeaderWrapper>
        {title}
        <CloseButton onClick={onClose as React.MouseEventHandler<HTMLDivElement>}>
          <CloseIcon />
        </CloseButton>
      </HeaderWrapper>
      <Content>{children}</Content>
      <FooterWrapper>
        <ButtonGroup>
          <Button
            variant="outlined"
            onClick={onClose as React.MouseEventHandler<HTMLButtonElement>}
          >
            取消
          </Button>
          <Button onClick={onSubmit}>確認</Button>
        </ButtonGroup>
      </FooterWrapper>
    </DialogWrapper>
  </Modal>
);

const Dialog = React.forwardRef(InternalDialog);

export default Dialog;
