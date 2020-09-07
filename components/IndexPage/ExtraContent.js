import React, { useState } from "react";
import PropTypes from "prop-types";
import { FileManager, History, Tab } from "@licenserocks/kit";
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

/* eslint-disable react/prop-types */
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
          moreInfo: date.format(history.createdAt),
          title: history.title,
          ...getHistoryIconProps(history.name),
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
        name: document.filename,
        data: "-",
        description: "-",
        previewUrl: document.url,
      });

      return (
        <FileManager
          data={[
            {
              label: "Documents",
              files: documents.map((doc) => documentData(doc)),
            },
          ]}
        />
      );
    },
  },
];
/* eslint-enable react/prop-types */

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
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
