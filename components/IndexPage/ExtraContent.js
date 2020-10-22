import React, { useState } from "react";
import PropTypes from "prop-types";
import { FileManager, History, Tab } from "@licenserocks/kit";
import date from "utils/date";

import { withTranslation } from "i18n";

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
const getTabs = ({ t }) => [
  {
    index: 0,
    value: "itemHistory",
    label: t("itemHistory"),
    showTab: true,
    showContent: true,
    render: ({ histories }) => (
      <History
        rows={histories.map((history) => ({
          moreInfo: date.format(history.created_at),
          title: history.title,
          ...getHistoryIconProps(history.name),
        }))}
      />
    ),
  },
  {
    index: 1,
    value: "files",
    label: t("files"),
    showTab: true,
    showContent: true,
    render: ({ documents, fileURIs, checksums }) => {
      const documentData = (document) => ({
        name: document.filename || document.path,
        data: "-",
        description: "-",
        previewUrl: document.url,
      });

      const publicUrlData = (uri) => ({
        name: (
          <a href={uri} target="_blank" rel="noreferrer">
            {uri}
          </a>
        ),
        data: "-",
        description: "-",
        previewUrl: uri,
      });

      const checksumData = (checksum) => ({
        name: checksum,
        data: "-",
        description: "-",
        previewUrl: "#",
      });

      return (
        <FileManager
          data={[
            {
              label: "Documents",
              files: documents.map((doc) => documentData(doc)),
            },
            {
              label: "Public URLs",
              files: fileURIs.map((uri) => publicUrlData(uri)),
            },
            {
              label: "File checksums",
              files: checksums.map((checksum) => checksumData(checksum)),
            },
          ]}
        />
      );
    },
  },
];
/* eslint-enable react/prop-types */

export const IndexExtraContent = withTranslation("index")(
  ({ histories, documents, checksums, fileURIs, t }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const tabs = getTabs({ t });

    return (
      <>
        <Tab currentTab={currentTab} onChange={setCurrentTab} tabs={tabs} />
        {tabs[currentTab].render({ histories, documents, checksums, fileURIs })}
      </>
    );
  }
);

IndexExtraContent.propTypes = {
  histories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
