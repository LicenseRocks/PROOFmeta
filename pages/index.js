import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ExplorerLayout, PageMeta } from "@licenserocks/kit";

import {
  IndexContent,
  IndexExtraContent,
  IndexExtraSidebar,
  IndexSidebar,
  MiningInProgress,
} from "components";
import { getLicenseInfo, fetchMetaDataFile } from "utils/ethereum";

export async function getServerSideProps({ query }) {
  // Call smart contract to get files array on server side
  const { coverKey, id, contractAddr, network } = query;
  const { BUCKET_URL, NEXT_APP_DOMAIN } = process.env;
  const licenseInfo = await getLicenseInfo(id, contractAddr, network);

  return {
    props: {
      ...licenseInfo,
      coverSrc: coverKey
        ? `${BUCKET_URL}/${coverKey}`
        : "/images/lr-placeholder.jpg",
      id: id || null,
      url: `${NEXT_APP_DOMAIN}?id=${id}&network=${network}&contractAddr=${contractAddr}`,
      network,
      namespacesRequired: ["index", "common"],
    },
  };
}

const Index = ({ coverSrc, license, network, url, fileURIs, checksums }) => {
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
    return <MiningInProgress />;
  }

  return (
    <>
      <PageMeta
        description="MetaProof is an explorer to extract the metadata of NFTs that are secured with their JSON files on the Arweave permanent storage"
        imgSrc={coverSrc}
        title={pageTitle}
        url={url}
        Wrapper={(props) => <Head {...props} />}
      />
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
  coverSrc: PropTypes.string,
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

Index.defaultProps = {
  coverSrc: null,
};

export default Index;
