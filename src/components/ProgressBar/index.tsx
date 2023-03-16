import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import { useColor } from '@/theme/useColor';

interface ITrack {
  $color: string;
  $value: number;
  $isStatusActive: boolean;
}

export interface IProgressBarProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * 進度
   */
  value?: number;
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: string;
  /**
   * 是否顯示進度數值
   */
  showInfo?: boolean;
  /**
   * 是否顯示等待進度動畫
   */
  isStatusActive?: boolean;
}

const slide = keyframes`
  from {
    left: -150%;
  }
  to {
    left: 100%;
  }
`;

const activeAnimation = css`
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 80px;
    top: 0px;
    background: linear-gradient(to right, transparent 0%, #ffffff99 50%, transparent 100%);
    animation: ${slide} 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    box-shadow: 0 4px 10px 0 #ffffff33;
  }
`;

const StyledProgressBar = styled.div`
  display: flex;
  align-items: center;
`;

const Trail = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 50px;
`;

const Track = styled.div<ITrack>`
  background: ${(props) => props.$color};
  width: ${(props) => props.$value}%;
  height: 8px;
  border-radius: 50px;
  transition: width 0.2s;
  ${(props) => props.$isStatusActive && activeAnimation}
`;

const Info = styled.div`
  flex: 0 0 50px;
  text-align: right;
  margin-left: 4px;
`;

const formatValue = (value: number) => {
  if (value > 100) {
    return 100;
  }
  if (value < 0) {
    return 0;
  }
  return value;
};

const InternalProgressBar: React.ForwardRefRenderFunction<HTMLDivElement, IProgressBarProps> = (
  { value = 0, themeColor = 'primary', showInfo = true, isStatusActive = false, ...props },
  ref
) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });

  return (
    <StyledProgressBar ref={ref} {...props}>
      <Trail className="progress-bar__trail">
        <Track
          className="progress-bar__track"
          $color={color}
          $value={formatValue(value)}
          $isStatusActive={isStatusActive}
        />
      </Trail>
      {showInfo && <Info className="progress-bar__info">{`${value}%`}</Info>}
    </StyledProgressBar>
  );
};

/**
 * `Progress bar` 是能夠展示當前進度的進度條元件。
 * 當一個操作需要顯示目前百分比，或是需要較長時間等待運行的時候，
 * 能夠使用這樣的元件提示用戶目前進度，藉此來緩解用戶等待的焦慮感，
 * 或者提供使用者完成複雜任務的成就感。
 */
const ProgressBar = React.forwardRef(InternalProgressBar);

export default ProgressBar;
