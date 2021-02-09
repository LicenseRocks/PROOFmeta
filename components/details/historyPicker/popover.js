import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Popover as MuiPopover } from "@material-ui/core";
import { Input } from "@licenserocks/kit";

import HistoryItem from "./item";

const Popover = styled(MuiPopover)``;

const SearchInputContainer = styled.div`
  padding: 16px;
  background: #fff;
`;

const SearchInput = styled(Input)`
  height: 40px;
`;

const HistoryPicker = ({
  anchorEl,
  onClose,
  activeHistory,
  historyItems,
  onSelect,
}) => {
  const [filteredItems, setFilteredItems] = useState(historyItems);
  return (
    <Popover
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <SearchInputContainer>
        <SearchInput
          onChange={(e) =>
            setFilteredItems(
              historyItems.filter((item) =>
                item.name.toLowerCase().startsWith(e.target.value.toLowerCase())
              )
            )
          }
        />
      </SearchInputContainer>
      {filteredItems.map((item) => (
        <HistoryItem
          isActive={activeHistory.id === item.id}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </Popover>
  );
};

HistoryPicker.propTypes = {
  anchorEl: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  activeHistory: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  historyItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default HistoryPicker;
