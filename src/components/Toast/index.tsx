import React, { useRef, useEffect, useState } from 'react';
import styled, { css, keyframes, Keyframes } from 'styled-components';
import { render } from 'react-dom';

import { ReactComponent as SuccessIcon } from '@/assets/SVG/done.svg';
import { ReactComponent as InfoIcon } from '@/assets/SVG/info.svg';
import { ReactComponent as WarnIcon } from '@/assets/SVG/warn.svg';
import { ReactComponent as ErrorIcon } from '@/assets/SVG/error.svg';

type TType = keyof typeof iconMap;

const rootId = 'toast-root';

const iconMap = {
  success: <SuccessIcon />,
  info: <InfoIcon />,
  warn: <WarnIcon />,
  error: <ErrorIcon />,
};

const topIn: (isVisible: boolean) => Keyframes = (isVisible) => keyframes`
  0% {
    transform: translateY(${isVisible ? '-50' : '100'}%);
    opacity: ${isVisible ? 0 : 1};
  }
  100% {
    transform: translateY(${isVisible ? '100' : '-50'}%);
    opacity: ${isVisible ? 1 : 0};
  }
`;

interface ITopStyle {
  $isVisible: boolean;
}

const topStyle = css<ITopStyle>`
  animation: ${(props) => topIn(props.$isVisible)} 200ms ease-in-out forwards;
`;

const ToastWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-top: 20px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  min-width: 300px;
  min-height: 52px;
  box-sizing: border-box;
  padding: 16px 20px;
  border-radius: 4px;
  background: #fff;
  & > *:first-child {
    margin-right: 12px;
  }
  ${topStyle}
`;

interface IIcon {
  $color: string;
}

const StyledIcon = styled.div<IIcon>`
  width: 24px;
  height: 24px;
  color: ${(prop) => prop.$color};
  & svg {
    width: 100%;
    height: 100%;
  }
`;

const getColor = (type: TType) => {
  if (type === 'success') {
    return '#52c41a';
  }
  if (type === 'info') {
    return '#1890ff';
  }
  if (type === 'warn') {
    return '#faad14';
  }
  if (type === 'error') {
    return '#d9363e';
  }
  return '#1890ff';
};

export interface IToastProps {
  /**
   * 訊息的種類
   */
  type?: TType;
  /**
   * 訊息內容
   */
  content: React.ReactNode;
  /**
   * 訊息存在時間 (ms)
   */
  duration?: number;
}

/**
 * `Toast` 可以提供使用者操作的反饋訊息。包含一般資訊、操作成功、操作失敗、警告訊息等。
 * 預設為在頂部置中顯示並自動消失，是一種不打斷用戶操作的輕量級提示方式。
 */
export const InternalToast: React.ForwardRefRenderFunction<HTMLDivElement, IToastProps> = (
  { type = 'info', content, duration = 2000 },
  ref
) => {
  const toastRef = (ref as any) || useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const color = getColor(type);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
    setTimeout(() => {
      const currentDOM = toastRef.current;
      const parentDOM = currentDOM?.parentElement;
      parentDOM?.parentElement?.removeChild(parentDOM);
    }, duration + 200);
  }, [duration]);

  return (
    <ToastWrapper ref={toastRef} $isVisible={isVisible}>
      <StyledIcon $color={color}>{iconMap[type]}</StyledIcon>
      {content}
    </ToastWrapper>
  );
};

interface IToastWithDiv extends IToastProps, extendElement<'div'> {}

const Toast = React.forwardRef<HTMLDivElement, IToastWithDiv>(InternalToast);

const getContainer = () => {
  let toastRoot: HTMLElement;
  let toastContainer: HTMLElement;
  if (document.getElementById(rootId)) {
    toastRoot = document.getElementById(rootId) as HTMLElement;
  } else {
    const divDOM = document.createElement('div');
    divDOM.id = rootId;
    document.body.appendChild(divDOM);
    toastRoot = divDOM;
  }

  if (toastRoot.firstChild) {
    toastContainer = toastRoot.firstChild as HTMLElement;
  } else {
    const divDOM = document.createElement('div');
    toastRoot.appendChild(divDOM);
    toastContainer = divDOM;
  }
  const divDOM = document.createElement('div');
  toastContainer.appendChild(divDOM);

  toastRoot.style.position = 'absolute';
  toastRoot.style.top = '0px';
  toastRoot.style.left = '0px';
  toastRoot.style.width = '100vw';

  toastContainer.style.position = 'absolute';
  toastContainer.style.top = '0px';
  toastContainer.style.left = '50%';
  toastContainer.style.transform = 'translateX(-50%)';
  toastContainer.style.display = 'flex';
  toastContainer.style.zIndex = '9999';
  toastContainer.style.flexDirection = 'column';
  toastContainer.style.alignItems = 'center';

  return divDOM;
};

export const message = {
  success: (props: IToastWithDiv) => {
    render(<Toast {...props} type="success" />, getContainer());
  },
  info: (props: IToastWithDiv) => {
    render(<Toast {...props} type="info" />, getContainer());
  },
  warn: (props: IToastWithDiv) => {
    render(<Toast {...props} type="warn" />, getContainer());
  },
  error: (props: IToastWithDiv) => {
    render(<Toast {...props} type="error" />, getContainer());
  },
};

export default Toast;
