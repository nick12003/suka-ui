import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import CircularProgress from '../CircularProgress';

interface IIndicator {
  $indicatorSize: {
    height: number;
    width: number;
  };
}

export interface ISpinProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * 自定義載入符號
   */
  indicator?: string | React.ReactElement;
  /**
   * 是否載入中
   */
  isLoading: boolean;
  /**
   * 內容
   */
  children: React.ReactNode;
}

const StyledSpin = styled.div`
  display: inline-flex;
  svg {
    color: ${(props) => props.theme.color.primary};
  }
`;

const SpinContainer = styled.div`
  display: inline-flex;
  svg {
    color: ${(props) => props.theme.color.primary};
  }
  position: relative;
`;

const Indicator = styled.div<IIndicator>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  display: block;
  width: 100%;
  height: 100%;
  max-height: 400px;
  & > * {
    position: absolute;
    top: calc(50% - ${(props) => props.$indicatorSize.height / 2}px);
    left: calc(50% - ${(props) => props.$indicatorSize.width / 2}px);
  }
`;

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0.8;
`;

/**
 * `Spin` 是一個載入狀態元件，當頁面正在處理非同步行為，
 * 或需要讓用戶等待的作業時，用來顯示以緩解用戶等待的焦慮。
 */
const Spin = ({
  indicator = <CircularProgress />,
  isLoading = false,
  children,
  ...props
}: ISpinProps) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorSize, setIndicatorSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const indicatorElem = indicatorRef.current?.children[0];
    setIndicatorSize({
      width: indicatorElem?.clientWidth ?? 0,
      height: indicatorElem?.clientHeight ?? 0,
    });
  }, [indicatorRef, isLoading]);

  if (!children) {
    return <StyledSpin {...props}>{indicator}</StyledSpin>;
  }
  return (
    <SpinContainer {...props}>
      {children}
      {isLoading && (
        <>
          <Mask />
          <Indicator ref={indicatorRef} className="spin__indicator" $indicatorSize={indicatorSize}>
            {indicator}
          </Indicator>
        </>
      )}
    </SpinContainer>
  );
};

export default Spin;
