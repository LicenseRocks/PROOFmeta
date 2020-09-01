import React, { useState } from "react";
import PropTypes from "prop-types";
import { FileManager, History, Tab, Text } from "@licenserocks/kit";
import date from "utils/date";

const getHistoryIconProps = (historyName) => {
  let icon;
  let iconColor;

  switch (historyName) {
    case "created":
      icon = "plus";
      iconColor = "secondary";
      break;
    case "verified":
      icon = "check-circle";
      iconColor = "success";
      break;
    case "published":
      icon = "copy";
      iconColor = "warning";
      break;
    default:
      icon = "check-circle";
      iconColor = "success";
      break;
  }

  return {
    icon,
    iconColor,
  };
};

const TABS = [
  {
    index: 0,
    value: "itemHistory",
    label: "Item History",
    showTab: true,
    showContent: true,
    render: ({ histories }) => (
      <History
        rows={histories.map((history) => ({
          id: history.id,
          description: history.description,
          moreInfo: date.format(history.timestamp),
          title: history.title,
          ...getHistoryIconProps(history.name),
          collapsible: history.description !== "-",
          collapseContent: <Text>{history.description}</Text>,
        }))}
      />
    ),
  },
  {
    index: 1,
    value: "files",
    label: "Files",
    showTab: true,
    showContent: true,
    render: ({ documents }) => {
      const documentData = (document) => ({
        id: document.id,
        name: document.name,
        data: date.format(document.createdAt),
        description: document.documentType,
        previewUrl: document.url,
      });

      return (
        <FileManager
          data={[
            {
              label: "Proof documents",
              files: documents.proofs.map(doc => documentData(doc))
            },
            {
              label: "Contracts",
              files: documents.contracts.map(doc => documentData(doc))
            },
            {
              label: "Transfer documents",
              files: documents.transfer.map(doc => documentData(doc))
            },
          ]}
        />
      );
    },
  },
];

export const IndexExtraContent = ({ histories, documents }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <Tab currentTab={currentTab} onChange={setCurrentTab} tabs={TABS} />
      {TABS[currentTab].render({ histories, documents })}
    </>
  );
};

IndexExtraContent.propTypes = {
  histories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  documents: PropTypes.shape({
    contracts: PropTypes.arrayOf(PropTypes.shape({})),
    proofs: PropTypes.arrayOf(PropTypes.shape({})),
    transfer: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};
