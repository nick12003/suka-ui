import React from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';

import Modal, { IModalProps } from '../Modal';

import Button from '../Button';

import { ReactComponent as CloseIcon } from '@/assets/SVG/close.svg';

const StyledHeader = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCloseButton = styled.div`
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

const StyledFooter = styled.div`
  padding: 12px 20px;
`;

const StyledButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

type TShowAnimation = (isOpen: boolean) => Keyframes;

const showDialog: TShowAnimation = (isOpen) => keyframes`
  0% {
    transform: scale(${isOpen ? 0.9 : 1});
    opacity: ${isOpen ? 0 : 1};
  }
  100% {
    transform: scale(${isOpen ? 1 : 0.9});
    opacity: ${isOpen ? 1 : 0};
  }
`;

interface IMain {
  $isOpen: boolean;
}

const StyledMain = styled.div<IMain>`
  width: calc(100vw - 40px);
  max-width: 520px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  animation: ${(props) => showDialog(props.$isOpen)} 200ms ease-in-out forwards;
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
  onClose?: Function;
  /**
   * 送出事件
   */
  onSubmit?: Function;
}

export const InternalDialog: React.ForwardRefRenderFunction<HTMLDivElement, IDialogProps> = (
  { isOpen = false, onClose, onSubmit, title, children, ...props },
  ref
) => (
  <Modal isOpen={isOpen} onClose={onClose as React.MouseEventHandler<HTMLDivElement>}>
    <StyledMain ref={ref} $isOpen={isOpen} {...props}>
      <StyledHeader>
        {title}
        <StyledCloseButton onClick={onClose as React.MouseEventHandler<HTMLDivElement>}>
          <CloseIcon />
        </StyledCloseButton>
      </StyledHeader>
      <Content>{children}</Content>
      <StyledFooter>
        <StyledButtonGroup>
          <Button
            variant="outlined"
            onClick={onClose as React.MouseEventHandler<HTMLButtonElement>}
          >
            取消
          </Button>
          <Button onClick={onSubmit as React.MouseEventHandler<HTMLButtonElement>}>確認</Button>
        </StyledButtonGroup>
      </StyledFooter>
    </StyledMain>
  </Modal>
);

const Dialog =
  React.forwardRef<HTMLDivElement, IDialogProps & Omit<extendElement<'div'>, 'title'>>(
    InternalDialog
  );

export default Dialog;
