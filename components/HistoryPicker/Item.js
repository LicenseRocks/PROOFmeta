import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import date from "utils/date";
import { Icon, Text } from "@licenserocks/kit";

const Container = styled.div`
  height: 51px;
  background: ${({ isActive }) => (isActive ? "#f7f7f9" : "#fff")};
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 16px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ActiveIcon = styled(Icon).attrs(() => ({
  icon: "check-circle",
}))`
  color: #6ad19c;
  margin-right: 6px;
`;

const ItemName = styled(Text)`
  font-size: 14px;
  font-weight: 600;
`;

const Date = styled(Text)`
  && {
    font-size: 12px;
    font-weight: 400;
  }
  padding-top: 2px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.primary.main : theme.palette.text.secondary};
`;

const HistoryItem = ({ item, isActive, onSelect }) => {
  return (
    <Container isActive={isActive} onClick={() => onSelect(item)}>
      <ItemName>
        {isActive && <ActiveIcon />}
        {item.name}
      </ItemName>
      <Date isActive={isActive}>
        {date.format(item.createdAt, { withTime: false })}
      </Date>
    </Container>
  );
};

HistoryItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool,
  onSelect: PropTypes.func,
};

HistoryItem.defaultProps = {
  isActive: false,
  onSelect: () => {},
};

export default HistoryItem;
