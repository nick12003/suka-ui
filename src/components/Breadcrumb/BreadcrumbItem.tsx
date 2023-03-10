import styled from 'styled-components';

interface ICustomer {
  $isClickable: boolean;
}

const StyledItem = styled.div<ICustomer>`
  display: flex;
  align-items: center;
  ${(props) => props.$isClickable && 'cursor: pointer;'}
  & > *:not(:first-child) {
    margin-left: 4px;
  }
`;

export interface IBreadcrumbItemProps {
  to?: string;
  label?: string;
  icon?: React.ReactNode;
}

const BreadcrumbItem = ({ label, icon, to = '' }: IBreadcrumbItemProps) => {
  /**
   * Note: 使用 react-router-dom 來轉換 route path，此 demo 僅以 console.log 展示代替
   */
  // eslint-disable-next-line no-console
  const navigate = console.log;

  const handleClickPath = (path: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <StyledItem role="presentation" $isClickable={!!to} onClick={() => handleClickPath(to)}>
      {icon}
      <span>{label}</span>
    </StyledItem>
  );
};

export default BreadcrumbItem;
