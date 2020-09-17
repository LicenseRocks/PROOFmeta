import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ExplorerLayout, Meta } from "@licenserocks/kit";

import {
  IndexContent,
  IndexExtraContent,
  IndexExtraSidebar,
  IndexSidebar,
} from "components";
import { getLicenseInfo, fetchMetaDataFile } from "utils/ethereum";

export async function getServerSideProps({ query }) {
  // Call smart contract to get files array on server side
  const { id, contractAddr, network } = query;
  const licenseInfo = await getLicenseInfo(id, contractAddr, network);

  return {
    props: {
      ...licenseInfo,
      id: id || null,
      url: `${process.env.NEXT_APP_DOMAIN}?id=${id}&network=${network}&contractAddr=${contractAddr}`,
      network,
      namespacesRequired: ["index", "common"],
    },
  };
}

const Index = ({ license, network, url, fileURIs, checksums }) => {
  const [licenseData, setLicenseData] = useState(license);
  const pageTitle = `${license.title} | MetaProof`;

  const {
    amount = 100,
    title = "No name",
    price,
    documents = [],
    histories = [],
    ...rest
  } = licenseData;

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
        <title>{pageTitle}</title>
        <Meta
          description="MetaProof is an explorer to extract the metadata of NFTs that are secured with their JSON files on the Arweave permanent storage"
          imgSrc="/images/lr-placeholder.jpg"
          title={pageTitle}
          url={url}
        />
      </Head>
      <ExplorerLayout
        content={
          <IndexContent
            amount={amount}
            title={title}
            price={price}
            network={network}
            fileURIs={fileURIs}
            onMetaDataChange={(fileUrl) =>
              fetchMetaDataFile(fileUrl).then((data) => setLicenseData(data))
            }
            {...rest}
          />
        }
        extraContent={IndexExtraContent({
          histories,
          documents,
          fileURIs,
          checksums,
        })}
        extraSidebar={IndexExtraSidebar({ url })}
        sidebar={IndexSidebar({ url })}
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
  url: PropTypes.string.isRequired,
  fileURIs: PropTypes.arrayOf(PropTypes.string).isRequired,
  checksums: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Index;
