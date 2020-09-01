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
  if (!license) {
    return (
      <div>
        <b>Cannot fetch this license</b>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{license.sp_product} | MetaProof</title>
      </Head>
      <ExplorerLayout
        content={
          <IndexContent
            amount={license.sl_count}
            title={license.sp_product}
            creator={license.user.full_name}
            network={network}
            price={license.price_formatted}
            updatedAt={license.updated_at}
          />
        }
        extraContent={IndexExtraContent({
          histories: license.histories,
          documents: license.documents,
        })}
        extraSidebar={IndexExtraSidebar}
        sidebar={IndexSidebar}
      />
    </>
  );
};

Index.propTypes = {
  license: PropTypes.shape({
    sp_product: PropTypes.string,
    sl_count: PropTypes.number,
    histories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    user: PropTypes.shape({
      full_name: PropTypes.string,
    }),
    price_formatted: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  network: PropTypes.string.isRequired,
};

export default Index;
