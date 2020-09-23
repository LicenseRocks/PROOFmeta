import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ExplorerLayout, PageMeta, Button } from "@licenserocks/kit";
import { withTranslation } from "i18n";

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
      url: `${NEXT_APP_DOMAIN}?id=${id}&network=${network}&contractAddr=${contractAddr}${
        coverKey ? `&coverKey=${coverKey}` : null
      }`,
      network,
      namespacesRequired: ["index", "common"],
    },
  };
}

const Index = withTranslation("index")(
  ({ id, coverSrc, license, network, url, fileURIs, checksums, t }) => {
    const [licenseData, setLicenseData] = useState(license);
    const pageTitle = `${license.title} | MetaProof`;

    const {
      amount = 0,
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
          headerRight={
            <Button
              content={t("buyLicense")}
              size="sm"
              // NOTE: buy URL should be added to JSON metadata file.
              href={`https://creators-hub.vercel.app/nft/${id}`}
              target="_blank"
            />
          }
          content={
            <IndexContent
              coverSrc={coverSrc}
              amount={amount}
              title={title}
              price={price}
              network={network}
              fileURIs={fileURIs}
              histories={histories}
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
  }
);

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
