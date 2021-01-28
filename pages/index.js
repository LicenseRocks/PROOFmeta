import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ExplorerLayout, PageMeta, Button } from "@licenserocks/kit";
import qs from "qs";

import { i18n, withTranslation } from "i18n";
import {
  IndexContent,
  IndexExtraContent,
  IndexExtraSidebar,
  IndexSidebar,
  MiningInProgress,
} from "components";
import { getLicenseInfo, fetchMetaDataFile } from "utils/ethereum";
import absoluteUrl from "utils/absoluteUrl";

export async function getServerSideProps({ query, req }) {
  const { fullPath } = absoluteUrl(req);

  return {
    props: {
      url: fullPath,
      namespacesRequired: ["index", "common"],
    },
  };
}

const Index = withTranslation("index")(({ t, url }) => {
  return (
    <>
      <PageMeta
        description="MetaProof is an explorer to extract the metadata of NFTs that are secured with their JSON files on the Arweave permanent storage"
        title="MetaProof"
        url={url}
        Wrapper={(props) => <Head {...props} />}
      />
      <ExplorerLayout content="Content" />
    </>
  );
});

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
