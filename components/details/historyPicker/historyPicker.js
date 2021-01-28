import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PickerButton from "./PickerButton";
import Popover from "./Popover";

const Container = styled.div``;

export const HistoryPicker = ({ historyItems, activeHistory, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Container>
      <PickerButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        activeHistory={activeHistory}
      />
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        activeHistory={activeHistory}
        historyItems={historyItems}
        onSelect={onSelect}
      />
    </Container>
  );
};

HistoryPicker.propTypes = {
  historyItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeHistory: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func,
};

HistoryPicker.defaultProps = {
  onSelect: () => {},
};
