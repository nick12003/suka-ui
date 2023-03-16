import styled from 'styled-components';

const StyledListItem = styled.div`
  border: 1px solid #eeeeee;
  display: flex;
  padding: 12px 8px;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

export interface IListItemProps {
  author: string;
}

const ListItem = ({ author }: IListItemProps) => (
  <StyledListItem>
    <div>{`Author: ${author}`}</div>
  </StyledListItem>
);

export default ListItem;
