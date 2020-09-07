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
      network,
    },
  };
}

const Index = ({ license, network }) => {
  const {
    amount = 100,
    title = "No name",
    price,
    documents = [],
    histories = [],
    ...rest
  } = license;

  if (!license || Object.keys(license).length === 0) {
    return (
      <div>
        <b>Cannot fetch this license</b>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{license.title} | MetaProof</title>
      </Head>
      <ExplorerLayout
        content={
          <IndexContent
            amount={amount}
            title={title}
            price={price}
            network={network}
            {...rest}
          />
        }
        extraContent={IndexExtraContent({
          histories,
          documents,
        })}
        extraSidebar={IndexExtraSidebar}
        sidebar={IndexSidebar}
      />
    </>
  );
};

Index.propTypes = {
  license: PropTypes.shape({
    histories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    amount: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  network: PropTypes.string.isRequired,
};

export default Index;
