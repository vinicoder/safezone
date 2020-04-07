import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 100%;
  padding: 20px 20px;
  min-height: 150px;
  margin: 9px 0px;
  border-radius: 10px;
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};

  .title {
    font-family: 'Poppins';
    font-size: 1.5em;
    font-weight: 500;
    width: 100%;
    margin-bottom: 10px;
  }

  .tag-list {
    width: 100%;
    min-height: 30px;
    ul {
      list-style-type: none;
    }
  }

  .updated-info {
    width: 100%;
    color: rgb(160, 163, 165);
    font-size: 12px;
    font-style: italic;
  }
`;

export const Tag = styled.li`
  float: left;
  display: block;
  background: rgb(238, 66, 102);
  border-radius: 24px;
  color: #fff;
  font-weight: 600;
  padding: 2px 20px;
  margin-right: 5px;
  margin-bottom: 5px;
`;
