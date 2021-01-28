import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { PageMeta } from "@licenserocks/kit";

import { ExplorerLayout, ShowHome } from "components";
import { withTranslation } from "i18n";
import absoluteUrl from "utils/absoluteUrl";

export async function getServerSideProps({ req }) {
  const { fullPath } = absoluteUrl(req);

  return {
    props: {
      url: fullPath,
      namespacesRequired: ["index", "common"],
    },
  };
}

const IndexPage = withTranslation("details")(({ t, url }) => {
  return (
    <>
      <PageMeta
        description="MetaProof is an explorer to extract the metadata of NFTs that are secured with their JSON files on the Arweave permanent storage"
        title="MetaProof"
        url={url}
        Wrapper={(props) => <Head {...props} />}
      />

      <ShowHome />
    </>
  );
});

IndexPage.Layout = ExplorerLayout;

IndexPage.propTypes = {};

IndexPage.defaultProps = {};

export default IndexPage;
