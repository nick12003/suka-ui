import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import Portal from '../Portal';

export type TPlacement = 'top' | 'right' | 'bottom' | 'left';

interface IPlacementProps {
  $isOpen: boolean;
  $animationDuration: number;
}

interface IMaskProps {
  $isOpen: boolean;
  $animationDuration: number;
}

interface IDrawerWrapperProps extends IPlacementProps {
  $placement: TPlacement;
}

const hideMask = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const showMask = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const leftShowDrawer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 0%;
  }
`;

const leftHideDrawer = keyframes`
  0% {
    left: 0%;
  }
  100% {
    left: -100%;
  }
`;

const rightShowDrawer = keyframes`
  0% {
    right: -100%;
  }
  100% {
    right: 0%;
  }
`;

const rightHideDrawer = keyframes`
  0% {
    right: 0%;
  }
  100% {
    right: -100%;
  }
`;

const bottomShowDrawer = keyframes`
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 0%;
  }
`;

const bottomHideDrawer = keyframes`
  0% {
    bottom: 0%;
  }
  100% {
    bottom: -100%;
  }
`;

const topShowDrawer = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 0%;
  }
`;

const topHideDrawer = keyframes`
  0% {
    top: 0%;
  }
  100% {
    top: -100%;
  }
`;

const topStyle = css<IPlacementProps>`
  top: 0px;
  left: 0px;
  width: 100vw;
  animation: ${(props) => (props.$isOpen ? topShowDrawer : topHideDrawer)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`;

const bottomStyle = css<IPlacementProps>`
  bottom: 0px;
  left: 0px;
  width: 100vw;
  animation: ${(props) => (props.$isOpen ? bottomShowDrawer : bottomHideDrawer)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`;

const leftStyle = css<IPlacementProps>`
  top: 0px;
  left: 0px;
  height: 100vh;
  animation: ${(props) => (props.$isOpen ? leftShowDrawer : leftHideDrawer)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`;

const rightStyle = css<IPlacementProps>`
  top: 0px;
  right: 0px;
  height: 100vh;
  animation: ${(props) => (props.$isOpen ? rightShowDrawer : rightHideDrawer)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`;

const placementMap = {
  top: topStyle,
  right: rightStyle,
  bottom: bottomStyle,
  left: leftStyle,
};

const Mask = styled.div<IMaskProps>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: #00000080;
  z-index: 2;
  animation: ${(props) => (props.$isOpen ? showMask : hideMask)}
    ${(props) => props.$animationDuration}ms ease-in-out forwards;
`;

const DrawerWrapper = styled.div<IDrawerWrapperProps>`
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

const InternalDrawer: React.ForwardRefRenderFunction<HTMLDivElement, IDrawerProps> = (
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
      <Mask $isOpen={isOpen} $animationDuration={animationDuration} onClick={onClose} />
      <DrawerWrapper
        ref={ref}
        $isOpen={isOpen}
        $placement={placement}
        $animationDuration={animationDuration}
        {...props}
      >
        {children}
      </DrawerWrapper>
    </Portal>
  ) : (
    <></>
  );
};

/**
 * `Drawer` 抽屜元件，由螢幕邊緣滑出的浮動面版，
 * 常見的應用是作為導航用途，例如 Navigation drawers。
 */
const Drawer = React.forwardRef(InternalDrawer);

export default Drawer;
