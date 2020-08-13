import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ExplorerLayout } from "@licenserocks/kit";

import {
  IndexContent,
  IndexExtraContent,
  IndexExtraSidebar,
  IndexSidebar,
} from "components";
import { getLicenseInfo } from "utils/ethereum";

export async function getServerSideProps({ query }) {
  // Call smart contract to get files array on server side
  const { id, contractAddr, network } = query;
  const licenseInfo = await getLicenseInfo(id, contractAddr, network);

  return {
    props: {
      ...licenseInfo,
      id: id || null,
    },
  };
}

const Index = ({ license, fileURIs }) => {
  console.log('fileURIs', fileURIs)
  console.log('license', license)

  if (!license) {
    return <div><b>Cannot fetch this license</b></div>
  }

  return (
    <>
      <Head>
        <title>{license.spProduct} | MetaProof</title>
      </Head>
      <ExplorerLayout
        content={
          <IndexContent amount={license.slCount} title={license.spProduct} />
        }
        extraContent={IndexExtraContent()}
        extraSidebar={IndexExtraSidebar}
        sidebar={IndexSidebar}
      />
    </>
  );
};

Index.propTypes = {
  license: PropTypes.shape({
    spProduct: PropTypes.string,
    slCount: PropTypes.number,
  }).isRequired,
};

export default Index;
