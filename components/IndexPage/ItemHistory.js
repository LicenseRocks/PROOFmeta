import React, { useState } from "react";
import { Tab, Text } from "@licenserocks/kit";
import { withTranslation } from "i18n";
import styled from "styled-components";

const HistoryWrapper = styled.div`
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 0;
    display: block;
    border-bottom: 2px dashed ${({ theme }) => theme.palette.gray.regular};
    position: absolute;
    bottom: calc(22px + 8px - 1px);
  }
`;

const HistroyItemsContainer = styled.div`
  height: 82px;
  white-space: nowrap;
  display: flex;
  overflow-x: scroll;
  margin-bottom: ${({ theme }) => theme.spacing(12)};
`;

const HistoryItem = styled(Text)`
  margin-right: ${({ theme }) => theme.spacing(5)};
  flex: 0 0 80px;
  position: relative;
  text-align: center;
  z-index: 1;
  && {
    margin-right: ${({ theme }) => theme.spacing(14)};
  }
  cursor: pointer;

  &:hover {
    &::after {
      background-color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: ${({ theme, active }) =>
      active ? theme.palette.primary.main : theme.palette.gray.regular};
    bottom: 22px;
    left: calc(50% - 8px);
    border-radius: 50%;
  }
`;

const HistoryTitle = styled(Text)`
  color: ${({ active }) => (active ? "#4d4b63, 100%" : "#8685a6")};
  && {
    font-weight: 600;
    font-size: 12px;
    line-height: 120%;
  }
`;

const HistoryDate = styled(Text)`
  font-style: italic;
  && {
    font-weight: normal;
    font-size: 12px;
    line-height: 120%;
    font-style: italic;
  }

  position: absolute;
  bottom: 0;
  display: block;
  width: 100%;
  color: ${({ theme, active }) =>
    active ? theme.palette.primary.main : theme.palette.gray.regular};
`;

const getTabs = ({
  t,
  histories,
  activeHistory,
  setActiveHistory,
  onChange,
}) => {
  return [
    {
      index: 0,
      value: "versionHistory",
      label: t("versionHistory"),
      showTab: true,
      showContent: true,
      render: () => (
        <HistoryWrapper>
          <HistroyItemsContainer>
            {histories.map((history, index) => (
              <HistoryItem
                key={history.id}
                onClick={() => {
                  setActiveHistory(index);
                  onChange(history);
                }}
                active={activeHistory === index}
              >
                <HistoryTitle active={activeHistory === index}>
                  {history.title}
                </HistoryTitle>
                <HistoryDate active={activeHistory === index}>
                  {new Date(
                    history.createdAt || history.created_at
                  ).toLocaleDateString()}
                </HistoryDate>
              </HistoryItem>
            ))}
          </HistroyItemsContainer>
        </HistoryWrapper>
      ),
    },
  ];
};

export const VersionHistory = withTranslation("index")(
  ({ t, histories, onChange }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [activeHistory, setActiveHistory] = useState(0);
    const tabs = getTabs({
      t,
      histories,
      activeHistory,
      setActiveHistory,
      onChange,
    });

    return (
      <>
        <Tab currentTab={currentTab} onChange={setCurrentTab} tabs={tabs} />
        {tabs[currentTab].render({ histories })}
      </>
    );
  }
);
