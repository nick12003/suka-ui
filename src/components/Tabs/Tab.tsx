import React from 'react';
import styled, { css } from 'styled-components';
interface IActiveStyle {
  $color?: string;
}

const activeStyle = css<IActiveStyle>`
  color: ${(props) => props.$color} !important;
`;

interface IStyledTab extends IActiveStyle {
  $isActive?: boolean;
}

const StyledTab = styled.div<IStyledTab>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 120px;
  height: 48px;
  &:hover {
    background: #eeeeee55;
  }
  ${(props) => (props.$isActive ? activeStyle : null)}
`;

export interface ITabProps {
  label?: React.ReactNode;
  isActive?: boolean;
  value?: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Tab = ({ label, value, isActive, onClick, color, ...props }: ITabProps) => (
  <StyledTab
    $isActive={isActive}
    $color={color}
    onClick={onClick}
    className="tab__tab-button"
    {...props}
  >
    <span>{label}</span>
  </StyledTab>
);

export default Tab;
