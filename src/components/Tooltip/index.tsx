/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useRef, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import Portal from '../Portal';
import { useColor } from '@/theme/useColor';

type TPlacement =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left'
  | 'left-bottom'
  | 'right-top'
  | 'right'
  | 'right-bottom';

interface IPlacementStyle {
  $childrenSize: {
    width: number;
    height: number;
  };
  $gap: number;
  $color: string;
}

interface ITooltipWrapper extends IPlacementStyle {
  $position: {
    top: number;
    left: number;
  };
  $color: string;
  $isVisible: boolean;
  $placement: TPlacement;
}

export interface ITooltipProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * 客製化樣式
   */
  className?: string;
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
  themeColor?: string;
  /**
   * 提示文字
   */
  content: React.ReactNode;
  /**
   * 需要彈出提示字的子元件
   */
  children: React.ReactNode;
}

const topStyle = css<IPlacementStyle>`
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
`;

const topLeftStyle = css<IPlacementStyle>`
  transform: translate(0px, calc(-100% - ${(props) => props.$gap}px));
  .tooltip__arrow {
    position: absolute;
    left: 12px;
    transform: translate(0%, 40%);
  }
`;

const topRightStyle = css<IPlacementStyle>`
  transform: translate(
    calc(-100% + ${(props) => props.$childrenSize.width}px),
    calc(-100% - ${(props) => props.$gap}px)
  );
  .tooltip__arrow {
    position: absolute;
    right: 12px;
    transform: translate(0%, 40%);
  }
`;

const bottomStyle = css<IPlacementStyle>`
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
`;

const bottomLeftStyle = css<IPlacementStyle>`
  transform: translate(0px, ${(props) => props.$childrenSize.height + props.$gap}px);
  .tooltip__arrow {
    position: absolute;
    top: 0px;
    left: 12px;
    transform: translate(0%, -50%);
  }
`;

const bottomRightStyle = css<IPlacementStyle>`
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
`;

const rightTopStyle = css<IPlacementStyle>`
  transform: translate(${(props) => props.$childrenSize.width + props.$gap}px, 0px);
  .tooltip__arrow {
    position: absolute;
    top: 12px;
    left: 0px;
    transform: translate(-50%, 0%);
  }
`;

const rightBottomStyle = css<IPlacementStyle>`
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
`;

const leftBottomStyle = css<IPlacementStyle>`
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
`;

const leftTopStyle = css<IPlacementStyle>`
  transform: translate(calc(-100% - ${(props) => props.$gap}px), 0px);
  .tooltip__arrow {
    position: absolute;
    top: 12px;
    right: 0px;
    transform: translate(50%, 0%);
  }
`;

const leftStyle = css<IPlacementStyle>`
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
`;

const rightStyle = css<IPlacementStyle>`
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
`;

const placementStyleMap = {
  top: topStyle,
  'top-left': topLeftStyle,
  'top-right': topRightStyle,
  'bottom-left': bottomLeftStyle,
  'bottom-right': bottomRightStyle,
  bottom: bottomStyle,
  'right-top': rightTopStyle,
  'left-top': leftTopStyle,
  'right-bottom': rightBottomStyle,
  'left-bottom': leftBottomStyle,
  left: leftStyle,
  right: rightStyle,
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const TooltipWrapper = styled.div<ITooltipWrapper>`
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
  animation: ${(props) => (props.$isVisible ? fadeIn : fadeOut)} 0.3s ease-in-out forwards;
  ${(props) => placementStyleMap[props.$placement] || placementStyleMap.top}

  .tooltip__arrow-content {
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    background: ${(props) => props.$color};
  }
`;

/**
 * `Tooltip` 是一個文字彈出提醒元件，當 active 狀態時，會顯示對該子元件描述的文字。
 */
const Tooltip = ({
  children,
  placement = 'top',
  themeColor = '#101010',
  content,
  showArrow = true,
  className,
  ...props
}: ITooltipProps) => {
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
        onMouseOver={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      <Portal customRootId="tooltip">
        <TooltipWrapper
          $isVisible={isVisible}
          $position={position}
          $placement={placement}
          $childrenSize={childrenSize}
          $gap={12}
          $color={color}
          className={className}
          {...props}
        >
          {content}
          {showArrow && (
            <div className="tooltip__arrow">
              <div className="tooltip__arrow-content" />
            </div>
          )}
        </TooltipWrapper>
      </Portal>
    </>
  );
};

export default Tooltip;