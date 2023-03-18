import styled from 'styled-components';

interface IMain extends extendElement<'div'> {
  $isClickable: boolean;
}

const StyledMain = styled.div<IMain>`
  display: flex;
  align-items: center;
  ${(props) => props.$isClickable && 'cursor: pointer;'}
`;

export interface IBreadcrumbItemProps {
  /**
   * 連結
   */
  to?: string;
  /**
   * 點擊事件
   */
  label: React.ReactNode;
  /**
   * 點擊事件
   */
  onClick?: (to: string) => void;
}

const BreadcrumbItem = ({ label, to = '', onClick }: IBreadcrumbItemProps) => {
  const handleClickPath = (path: string) => {
    if (path && onClick) {
      onClick(path);
    }
  };

  return (
    <StyledMain role="presentation" $isClickable={!!to} onClick={() => handleClickPath(to)}>
      {label}
    </StyledMain>
  );
};

export default BreadcrumbItem;
