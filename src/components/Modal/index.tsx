import React, { useState, useEffect } from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';

import Portal from '../Portal';

type TShowAnimation = (isOpen: boolean) => Keyframes;

const showMask: TShowAnimation = (isOpen) => keyframes`
  0% {
    opacity: ${isOpen ? 0 : 1};
  }
  100% {
    opacity: ${isOpen ? 1 : 0};
  }
`;

interface IMask {
  $isOpen: boolean;
  $animationDuration: number;
}

const StyledMask = styled.div<IMask>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: #00000080;
  z-index: 2;
  animation: ${(props) => showMask(props.$isOpen)} ${(props) => props.$animationDuration}ms
    ease-in-out forwards;
`;

const StyledMain = styled.div`
  position: fixed;
  z-index: 3;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
`;

export interface IModalProps {
  /**
   * 抽屜是否顯示
   */
  isOpen?: boolean;
  /**
   * 是否顯示遮罩
   */
  hasMask?: boolean;
  /**
   * 觸發抽屜關閉
   */
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * 定義動畫完成一次週期的時間(ms)
   */
  animationDuration?: number;
  /**
   * 內容
   */
  children: React.ReactNode;
}

/**
 * `Modal` 元件為彈出相關元件提供了重要的基礎建設，
 * 例如 `對話框(Dialog)`、`彈出提示框(Popovers)`、`菜單(Menu)`、`抽屜(Drawer)`...等等元件。
 * 其使用時機是當系統流程當中需要用戶處理額外事務，但又不希望跳轉頁面以打斷目前工作流程時，提供一個彈出互動框解決方案。
 */
export const InternalModal: React.ForwardRefRenderFunction<HTMLDivElement, IModalProps> = ({
  isOpen = false,
  onClose,
  animationDuration = 200,
  children,
  hasMask = true,
}: IModalProps) => {
  const [removeDOM, setRemoveDOM] = useState(!isOpen);

  useEffect(() => {
    if (isOpen) {
      setRemoveDOM(false);
    } else {
      setTimeout(() => {
        setRemoveDOM(true);
      }, animationDuration + 100);
    }
  }, [animationDuration, isOpen]);

  return !removeDOM ? (
    <Portal>
      {hasMask && (
        <StyledMask $isOpen={isOpen} $animationDuration={animationDuration} onClick={onClose} />
      )}
      <StyledMain>{children}</StyledMain>
    </Portal>
  ) : (
    <></>
  );
};

const Modal = React.forwardRef<HTMLDivElement, IModalProps & extendElement<'div'>>(InternalModal);

export default Modal;
