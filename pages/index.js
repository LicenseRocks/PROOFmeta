import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ExplorerLayout, PageMeta } from "@licenserocks/kit";

import { withTranslation } from "i18n";
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

const Index = withTranslation("details")(({ t, url }) => {
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
