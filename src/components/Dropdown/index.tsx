import React, { useRef, useState, useEffect, useCallback } from 'react';
import styled, { css, keyframes, Keyframes } from 'styled-components';

import Portal from '../Portal';

/**
 * 透過觸發點擊的物件往父層搜尋，若未找到指定的ID則表示點擊的物件非DropDown
 */
const findAttributeInEvent = (event: MouseEvent, attr: string) => {
  const end = event.currentTarget as HTMLElement;

  let temp: HTMLElement | null = event.target as HTMLElement;
  let dataId: string | null = temp.getAttribute(attr);

  while (temp !== end && !dataId) {
    temp = temp.parentElement;
    if (temp === null) {
      break;
    }
    dataId = temp.getAttribute(attr);
  }
  return dataId;
};

export type TPlacement = keyof typeof placementStyleMap;
interface IPlacement {
  $childrenSize: {
    width: number;
    height: number;
  };
  $gap: number;
  $position: {
    top: number;
    left: number;
  };
  $isOpen: boolean;
}

const topStyle = css<IPlacement>`
  transform: translate(
    calc(${(props) => props.$childrenSize.width / 2}px - 50%),
    calc(-100% - ${(props) => props.$gap}px)
  );
`;

const topLeftStyle = css<IPlacement>`
  transform: translate(0px, calc(-100% - ${(props) => props.$gap}px));
`;

const topRightStyle = css<IPlacement>`
  transform: translate(
    calc(-100% + ${(props) => props.$childrenSize.width}px),
    calc(-100% - ${(props) => props.$gap}px)
  );
`;

const bottomStyle = css<IPlacement>`
  transform: translate(
    calc(${(props) => props.$childrenSize.width / 2}px - 50%),
    ${(props) => props.$childrenSize.height + props.$gap}px
  );
`;

const bottomLeftStyle = css<IPlacement>`
  transform: translate(0px, ${(props) => props.$childrenSize.height + props.$gap}px);
`;

const bottomRightStyle = css<IPlacement>`
  transform: translate(
    calc(-100% + ${(props) => props.$childrenSize.width}px),
    ${(props) => props.$childrenSize.height + props.$gap}px
  );
`;

const rightTopStyle = css<IPlacement>`
  transform: translate(${(props) => props.$childrenSize.width + props.$gap}px, 0px);
`;

const rightBottomStyle = css<IPlacement>`
  transform: translate(
    ${(props) => props.$childrenSize.width + props.$gap}px,
    calc(-100% + ${(props) => props.$childrenSize.height}px)
  );
`;

const leftBottomStyle = css<IPlacement>`
  transform: translate(
    calc(-100% - ${(props) => props.$gap}px),
    calc(-100% + ${(props) => props.$childrenSize.height}px)
  );
`;

const leftTopStyle = css<IPlacement>`
  transform: translate(calc(-100% - ${(props) => props.$gap}px), 0px);
`;

const leftStyle = css<IPlacement>`
  transform: translate(
    calc(-100% - ${(props) => props.$gap}px),
    calc(-50% + ${(props) => props.$childrenSize.height / 2}px)
  );
`;

const rightStyle = css<IPlacement>`
  transform: translate(
    ${(props) => props.$childrenSize.width + props.$gap}px,
    calc(-50% + ${(props) => props.$childrenSize.height / 2}px)
  );
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

const fadeInOrOut: (isOpen: boolean) => Keyframes = (isOpen) => keyframes`
  from {
    opacity: ${isOpen ? 0 : 1};
  }
  to {
    opacity: ${isOpen ? 1 : 0};
  }
`;

const fadeAnimation = css<IPlacement>`
  animation: ${(props) => fadeInOrOut(props.$isOpen)} 0.3s ease-in-out forwards;
`;

interface IMain extends IPlacement {
  $isMount: boolean;
  $placement: TPlacement;
}

const StyledMain = styled.div<IMain>`
  position: absolute;
  z-index: 999;
  top: ${(props) => props.$position.top}px;
  left: ${(props) => props.$position.left}px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  opacity: 0;
  ${(props) => (props.$isMount ? fadeAnimation : undefined)}
  ${(props) => placementStyleMap[props.$placement]}
`;

export interface IDropdownProps {
  /**
   * 出現位置
   */
  placement?: TPlacement;
  /**
   * 是否顯示菜單
   */
  isOpen?: boolean;
  /**
   * 點擊事件
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * 關閉菜單事件
   */
  onClose?: () => void;
  /**
   * 菜單內容
   */
  overlay: React.ReactNode;
  /**
   * 觸發元件
   */
  children: React.ReactNode;
}

/**
 * `Dropdown` 是一個下拉選單元件，當頁面上的選項過多時，
 * 可以用這個元件來收納選項，透過滑鼠事件來觸發選單彈出，
 * 點擊選項會執行相對應的命令。
 */
export const InternalDropdown: React.ForwardRefRenderFunction<HTMLDivElement, IDropdownProps> = (
  { children, placement = 'bottom', overlay, isOpen = false, onClick, onClose, ...props },
  ref
) => {
  /** 暫時使用isMount控制防止初次載入時預先跑一次動畫 */
  const [isMount, setIsMount] = useState(false);
  const childrenRef = useRef<HTMLSpanElement>(null);
  const [childrenSize, setChildrenSize] = useState({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleOnResize = () => {
    setChildrenSize({
      width: childrenRef.current?.offsetWidth as number,
      height: childrenRef.current?.offsetHeight as number,
    });
    setPosition({
      top: childrenRef.current?.getBoundingClientRect().top as number,
      left: childrenRef.current?.getBoundingClientRect().left as number,
    });
  };

  const handleOnClick = useCallback(
    (event: MouseEvent) => {
      setIsMount(true);
      const dropdownId = findAttributeInEvent(event, 'data-dropdown-id');
      if (!dropdownId && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('click', handleOnClick);
    return () => {
      document.removeEventListener('click', handleOnClick);
    };
  }, [handleOnClick]);

  useEffect(() => {
    handleOnResize();
    window.addEventListener('resize', handleOnResize);
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, []);

  return (
    <>
      <span role="presentation" ref={childrenRef} data-dropdown-id="dropdown" onClick={onClick}>
        {children}
      </span>
      <Portal>
        <StyledMain
          ref={ref}
          {...props}
          data-dropdown-id="dropdown"
          $isMount={isMount}
          $isOpen={isOpen}
          $position={position}
          $placement={placement}
          $childrenSize={childrenSize}
          $gap={12}
        >
          {overlay}
        </StyledMain>
      </Portal>
    </>
  );
};

const Dropdown =
  React.forwardRef<HTMLDivElement, IDropdownProps & extendElement<'div'>>(InternalDropdown);

export default Dropdown;
