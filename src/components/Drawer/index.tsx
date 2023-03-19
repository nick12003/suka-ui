import React, { useEffect, useState } from 'react';
import styled, { css, keyframes, Keyframes } from 'styled-components';

import Portal from '../Portal';

export type TPlacement = keyof typeof placementMap;

type TShowAnimation = (isOpen: boolean) => Keyframes;

const showMask: TShowAnimation = (isOpen) => keyframes`
  0% {
    opacity: ${isOpen ? 0 : 1};
  }
  100% {
    opacity: ${isOpen ? 1 : 0};
  }
`;

const leftShowDrawer: TShowAnimation = (isOpen) => keyframes`
  0% {
    left: ${isOpen ? -100 : 0}%;
  }
  100% {
    left: ${isOpen ? 0 : -100}%;
  }
`;

const rightShowDrawer: TShowAnimation = (isOpen) => keyframes`
  0% {
    right: ${isOpen ? -100 : 0}%;
  }
  100% {
    right: ${isOpen ? 0 : -100}%;
  }
`;

const bottomShowDrawer: TShowAnimation = (isOpen) => keyframes`
  0% {
    bottom: ${isOpen ? -100 : 0}%;
  }
  100% {
    bottom: ${isOpen ? 0 : -100}%;
  }
`;

const topShowDrawer: TShowAnimation = (isOpen) => keyframes`
  0% {
    top: ${isOpen ? -100 : 0}%;
  }
  100% {
    top: ${isOpen ? 0 : -100}%;
  }
`;

interface IPlacement {
  $isOpen: boolean;
  $animationDuration: number;
}

const placementMap = {
  top: css<IPlacement>`
    top: 0px;
    left: 0px;
    width: 100vw;
    animation: ${(props) => topShowDrawer(props.$isOpen)} ${(props) => props.$animationDuration}ms
      ease-in-out forwards;
  `,
  right: css<IPlacement>`
    top: 0px;
    right: 0px;
    height: 100vh;
    animation: ${(props) => rightShowDrawer(props.$isOpen)} ${(props) => props.$animationDuration}ms
      ease-in-out forwards;
  `,
  bottom: css<IPlacement>`
    bottom: 0px;
    left: 0px;
    width: 100vw;
    animation: ${(props) => bottomShowDrawer(props.$isOpen)}
      ${(props) => props.$animationDuration}ms ease-in-out forwards;
  `,
  left: css<IPlacement>`
    top: 0px;
    left: 0px;
    height: 100vh;
    animation: ${(props) => leftShowDrawer(props.$isOpen)} ${(props) => props.$animationDuration}ms
      ease-in-out forwards;
  `,
};

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

interface IMain extends IPlacement {
  $placement: TPlacement;
}

const StyledMain = styled.div<IMain>`
  position: fixed;
  z-index: 3;
  background: #fff;
  ${(props) => placementMap[props.$placement] || placementMap.left}
`;

export interface IDrawerProps {
  /**
   * 抽屜的方向
   */
  placement?: TPlacement;
  /**
   * 抽屜是否顯示
   */
  isOpen?: boolean;
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
 * `Drawer` 抽屜元件，由螢幕邊緣滑出的浮動面版，
 * 常見的應用是作為導航用途，例如 Navigation drawers。
 */
export const InternalDrawer: React.ForwardRefRenderFunction<HTMLDivElement, IDrawerProps> = (
  { children, isOpen = false, placement = 'left', onClose, animationDuration = 200, ...props },
  ref
) => {
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
      <StyledMask $isOpen={isOpen} $animationDuration={animationDuration} onClick={onClose} />
      <StyledMain
        ref={ref}
        $isOpen={isOpen}
        $placement={placement}
        $animationDuration={animationDuration}
        {...props}
      >
        {children}
      </StyledMain>
    </Portal>
  ) : (
    <></>
  );
};

const Drawer =
  React.forwardRef<HTMLDivElement, IDrawerProps & extendElement<'div'>>(InternalDrawer);

export default Drawer;
