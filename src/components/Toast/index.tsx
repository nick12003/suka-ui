import { useRef, useEffect, useState, CSSProperties } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { render } from 'react-dom';

import { ReactComponent as SuccessIcon } from '@/assets/SVG/done.svg';
import { ReactComponent as InfoIcon } from '@/assets/SVG/info.svg';
import { ReactComponent as WarnIcon } from '@/assets/SVG/warn.svg';
import { ReactComponent as ErrorIcon } from '@/assets/SVG/error.svg';

interface IIconProps {
  $color: string;
}

interface ITopStyleProps {
  $isVisible: boolean;
}

type TType = 'success' | 'info' | 'warn' | 'error';
export interface IToastProps {
  type: TType;
  content: React.ReactNode;
  duration?: number;
}

const rootId = 'toast-root';

const iconMap = {
  success: <SuccessIcon />,
  info: <InfoIcon />,
  warn: <WarnIcon />,
  error: <ErrorIcon />,
};

const topIn = keyframes`
  0% {
    transform: translateY(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(100%);
    opacity: 1;
  }
`;

const topOut = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 1;
  }
  100% {
    transform: translateY(-50%);
    opacity: 0;
  }
`;

const topStyle = css<ITopStyleProps>`
  animation: ${(props) => (props.$isVisible ? topIn : topOut)} 200ms ease-in-out forwards;
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

const Icon = styled.div<IIconProps>`
  width: 24px;
  height: 24px;
  color: ${(prop) => prop.$color};
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

/**
 * `Toast` 可以提供使用者操作的反饋訊息。包含一般資訊、操作成功、操作失敗、警告訊息等。
 * 預設為在頂部置中顯示並自動消失，是一種不打斷用戶操作的輕量級提示方式。
 */
const Toast = ({ type, content, duration = 2000 }: IToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
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
      <Icon $color={color}>{iconMap[type]}</Icon>
      {content}
    </ToastWrapper>
  );
};

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
  success: (props: IToastProps) => {
    render(<Toast {...props} type="success" />, getContainer());
  },
  info: (props: IToastProps) => {
    render(<Toast {...props} type="info" />, getContainer());
  },
  warn: (props: IToastProps) => {
    render(<Toast {...props} type="warn" />, getContainer());
  },
  error: (props: IToastProps) => {
    render(<Toast {...props} type="error" />, getContainer());
  },
};

export default Toast;
