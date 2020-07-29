import React from "react";
import Head from "next/head";
import { ExplorerLayout } from "rockskit";

import {
  IndexContent,
  IndexExtraContent,
  IndexExtraSidebar,
  IndexSidebar,
} from "components";
import { getLicenseInfo } from "../utils/ethereum";

export async function getServerSideProps({ query }) {
  // Call smart contract to get files array on server side
  const { id } = query;
  const licenseInfo = await getLicenseInfo(id);

  return {
    props: {
      ...licenseInfo,
      id,
    },
  };
}

export default (props) => {
  console.log("props: ", props);
  return (
    <>
      <Head>
        <title>license.rocks | MetaProof</title>
      </Head>
      <ExplorerLayout
        content={IndexContent}
        extraContent={IndexExtraContent()}
        extraSidebar={IndexExtraSidebar}
        sidebar={IndexSidebar}
      />
    </>
  );
};
