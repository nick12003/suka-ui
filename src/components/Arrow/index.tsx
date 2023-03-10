import styled from 'styled-components';

type IDirection = 'up' | 'down' | 'left' | 'right';
type ISize = 'small' | 'medium' | 'large';

function getDeg(direction: IDirection) {
  switch (direction) {
    case 'up':
      return '-135deg';
    case 'down':
      return '45deg';
    case 'left':
      return '135deg';
    case 'right':
      return '-45deg';
  }
}

function getSize(size: ISize) {
  switch (size) {
    case 'small':
      return 0.125;
    case 'medium':
      return 0.25;
    case 'large':
      return 0.5;
  }
}

interface ICustomer {
  $direction: IDirection;
  $size: ISize;
}

const StyledArrow = styled.span<ICustomer>`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: ${({ $size }) => `${getSize($size)}rem`};
  margin: 0.5rem;
  transform: ${({ $direction }) => `rotate(${getDeg($direction)})`};
  -webkit-transform: ${({ $direction }) => `rotate(${getDeg($direction)})`};
`;

export type IArrowProps = React.ComponentPropsWithoutRef<'span'> & {
  direction?: IDirection;
  size?: ISize;
};

const Arrow = ({ direction = 'up', size = 'medium', ...props }: IArrowProps) => {
  return <StyledArrow $direction={direction} $size={size} {...props} />;
};

export default Arrow;
