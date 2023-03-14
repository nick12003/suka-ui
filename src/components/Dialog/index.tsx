import React from 'react';
import styled, { keyframes } from 'styled-components';

import Modal, { IModalProps } from '../Modal';
import Header, { IHeaderProps } from './Header';
import Footer from './Footer';

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

export type IDialogProps = Pick<IModalProps, 'isOpen' | 'onClose'> &
  Pick<IHeaderProps, 'title'> & {
    /**
     * 內容
     */
    children: React.ReactNode;
    /**
     * 確認事件
     */
    onSubmit?: React.MouseEventHandler<HTMLDivElement>;
  };

const Dialog = ({ isOpen = false, onClose, onSubmit, title, children }: IDialogProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <DialogWrapper $isOpen={isOpen}>
      <Header title={title} onClose={onClose} />
      <Content>{children}</Content>
      <Footer onClose={onClose} onSubmit={onSubmit} />
    </DialogWrapper>
  </Modal>
);

export default Dialog;
