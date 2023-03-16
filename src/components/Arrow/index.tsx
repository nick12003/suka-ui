import React from 'react';
import styled from 'styled-components';

type TDirection = 'up' | 'down' | 'left' | 'right';
type TSize = 'small' | 'medium' | 'large';

const degreeMap = {
  up: '-135deg',
  down: '45deg',
  left: '135deg',
  right: '-45deg',
};

const sizeMap = {
  small: 0.125,
  medium: 0.25,
  large: 0.5,
};

export interface IArrowProps extends React.ComponentPropsWithoutRef<'span'> {
  direction?: TDirection;
  size?: TSize;
}

interface IStyledArrowProps {
  $direction: TDirection;
  $size: TSize;
}

const StyledArrow = styled.span<IStyledArrowProps>`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: ${({ $size }) => `${sizeMap[$size]}rem`};
  margin: 0.5rem;
  transform: ${({ $direction }) => `rotate(${degreeMap[$direction]})`};
  -webkit-transform: ${({ $direction }) => `rotate(${degreeMap[$direction]})`};
`;

const InternalArrow: React.ForwardRefRenderFunction<HTMLSpanElement, IArrowProps> = (
  { direction = 'up', size = 'medium', ...props },
  ref
) => <StyledArrow ref={ref} $direction={direction} $size={size} {...props} />;

const Arrow = React.forwardRef(InternalArrow);

export default Arrow;
