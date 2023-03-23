import React, { useRef, useEffect, useState } from 'react';
import styled, { css, keyframes, Keyframes } from 'styled-components';

import Portal from '../Portal';
import { useColor } from '@/theme/useColor';

type TPlacement = keyof typeof placementStyleMap;

interface IPlacementStyle {
  $childrenSize: {
    width: number;
    height: number;
  };
  $gap: number;
  $color: string;
}

const placementStyleMap = {
  top: css<IPlacementStyle>`
    transform: translate(
      calc(${(props) => props.$childrenSize.width / 2}px - 50%),
      calc(-100% - ${(props) => props.$gap}px)
    );
    .tooltip__arrow {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 40%);
    }
    .tooltip__arrow-content {
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
      background: ${(props) => props.$color};
    }
  `,
  'top-left': css<IPlacementStyle>`
    transform: translate(0px, calc(-100% - ${(props) => props.$gap}px));
    .tooltip__arrow {
      position: absolute;
      left: 12px;
      transform: translate(0%, 40%);
    }
  `,
  'top-right': css<IPlacementStyle>`
    transform: translate(
      calc(-100% + ${(props) => props.$childrenSize.width}px),
      calc(-100% - ${(props) => props.$gap}px)
    );
    .tooltip__arrow {
      position: absolute;
      right: 12px;
      transform: translate(0%, 40%);
    }
  `,
  'bottom-left': css<IPlacementStyle>`
    transform: translate(0px, ${(props) => props.$childrenSize.height + props.$gap}px);
    .tooltip__arrow {
      position: absolute;
      top: 0px;
      left: 12px;
      transform: translate(0%, -50%);
    }
  `,
  'bottom-right': css<IPlacementStyle>`
    transform: translate(
      calc(-100% + ${(props) => props.$childrenSize.width}px),
      ${(props) => props.$childrenSize.height + props.$gap}px
    );
    .tooltip__arrow {
      position: absolute;
      top: 0px;
      right: 12px;
      transform: translate(0%, -50%);
    }
  `,
  bottom: css<IPlacementStyle>`
    transform: translate(
      calc(${(props) => props.$childrenSize.width / 2}px - 50%),
      ${(props) => props.$childrenSize.height + props.$gap}px
    );
    .tooltip__arrow {
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `,
  'right-top': css<IPlacementStyle>`
    transform: translate(${(props) => props.$childrenSize.width + props.$gap}px, 0px);
    .tooltip__arrow {
      position: absolute;
      top: 12px;
      left: 0px;
      transform: translate(-50%, 0%);
    }
  `,
  'left-top': css<IPlacementStyle>`
    transform: translate(calc(-100% - ${(props) => props.$gap}px), 0px);
    .tooltip__arrow {
      position: absolute;
      top: 12px;
      right: 0px;
      transform: translate(50%, 0%);
    }
  `,
  'right-bottom': css<IPlacementStyle>`
    transform: translate(
      ${(props) => props.$childrenSize.width + props.$gap}px,
      calc(-100% + ${(props) => props.$childrenSize.height}px)
    );
    .tooltip__arrow {
      position: absolute;
      bottom: 12px;
      left: 0px;
      transform: translate(-50%, 0%);
    }
  `,
  'left-bottom': css<IPlacementStyle>`
    transform: translate(
      calc(-100% - ${(props) => props.$gap}px),
      calc(-100% + ${(props) => props.$childrenSize.height}px)
    );
    .tooltip__arrow {
      position: absolute;
      bottom: 12px;
      right: 0px;
      transform: translate(50%, 0%);
    }
  `,
  left: css<IPlacementStyle>`
    transform: translate(
      calc(-100% - ${(props) => props.$gap}px),
      calc(-50% + ${(props) => props.$childrenSize.height / 2}px)
    );
    .tooltip__arrow {
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translate(50%, -50%);
    }
  `,
  right: css<IPlacementStyle>`
    transform: translate(
      ${(props) => props.$childrenSize.width + props.$gap}px,
      calc(-50% + ${(props) => props.$childrenSize.height / 2}px)
    );
    .tooltip__arrow {
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translate(-50%, -50%);
    }
  `,
};

const fadeIn: (isVisible: boolean) => Keyframes = (isVisible) => keyframes`
  0% {
    opacity: ${isVisible ? 0 : 1};
  }
  100% {
    opacity: ${isVisible ? 1 : 0};
  }
`;

interface IAnimationStyle {
  $isVisible: boolean;
}

const animationStyle = css<IAnimationStyle>`
  animation: ${(props) => fadeIn(props.$isVisible)} 0.3s ease-in-out forwards;
`;

interface IMain extends IPlacementStyle {
  $position: {
    top: number;
    left: number;
  };
  $color: string;
  $isVisible: boolean;
  $isShowed: boolean;
  $placement: TPlacement;
}

const StyledMain = styled.div<IMain>`
  position: absolute;
  z-index: 999;
  top: ${(props) => props.$position.top}px;
  left: ${(props) => props.$position.left}px;
  background: ${(props) => props.$color};
  color: white;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  opacity: 0;
  ${(props) => (props.$isShowed ? animationStyle : null)};

  ${(props) => placementStyleMap[props.$placement] || placementStyleMap.top}

  .tooltip__arrow-content {
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    background: ${(props) => props.$color};
  }
`;

export interface ITooltipProps {
  /**
   * 是否出現箭頭
   */
  showArrow?: boolean;
  /**
   * 出現位置
   */
  placement?: TPlacement;
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: TThemeColor;
  /**
   * 提示文字
   */
  content: React.ReactNode;
  /**
   * 需要彈出提示字的子元件
   */
  children: React.ReactNode;
}

/**
 * `Tooltip` 是一個文字彈出提醒元件，當 active 狀態時，會顯示對該子元件描述的文字。
 */
export const InternalTooltip: React.ForwardRefRenderFunction<HTMLDivElement, ITooltipProps> = (
  { children, placement = 'top', themeColor = '#101010', content, showArrow = true, ...props },
  ref
) => {
  const isShowed = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const childrenRef = useRef<HTMLSpanElement>(null);
  const [childrenSize, setChildrenSize] = useState({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });

  const handleOnResize = () => {
    if (!childrenRef.current) return;
    setChildrenSize({
      width: childrenRef.current.offsetWidth,
      height: childrenRef.current.offsetHeight,
    });
    setPosition({
      top: childrenRef.current.getBoundingClientRect().top,
      left: childrenRef.current.getBoundingClientRect().left,
    });
  };

  useEffect(() => {
    handleOnResize();
    window.addEventListener('resize', handleOnResize);
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, []);

  return (
    <>
      <span
        ref={childrenRef}
        onMouseOver={() => {
          isShowed.current = true;
          setIsVisible(true);
        }}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      <Portal customRootId="tooltip">
        <StyledMain
          ref={ref}
          $isShowed={isShowed.current}
          $isVisible={isVisible}
          $position={position}
          $placement={placement}
          $childrenSize={childrenSize}
          $gap={12}
          $color={color}
          {...props}
        >
          {content}
          {showArrow && (
            <div className="tooltip__arrow">
              <div className="tooltip__arrow-content" />
            </div>
          )}
        </StyledMain>
      </Portal>
    </>
  );
};

const Tooltip =
  React.forwardRef<HTMLDivElement, ITooltipProps & extendElement<'div'>>(InternalTooltip);

export default Tooltip;
