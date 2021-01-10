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
  // Call smart contract to get files array on server side
  const { coverKey, id, contractAddr, network, createdWith } = query;
  const {
    BUCKET_URL,
    NEXT_CREATORS_HUB_URL,
    NEXT_LICENSE_CORE_URL,
  } = process.env;
  const licenseInfo = await getLicenseInfo(id, contractAddr, network);
  const { fullPath } = absoluteUrl(req);

  const creatorUrl =
    createdWith && createdWith === "creatorshub"
      ? `${NEXT_CREATORS_HUB_URL}/nft/${id}`
      : `${NEXT_LICENSE_CORE_URL}/licenses/${id}`;

  return {
    props: {
      ...licenseInfo,
      coverSrc: coverKey
        ? `${BUCKET_URL}/${coverKey}`
        : "/images/lr-placeholder.jpg",
      creatorUrl,
      id: id || null,
      url: fullPath,
      network,
      namespacesRequired: ["index", "common"],
    },
  };
}

const generateUrl = (path) => {
  if (typeof window === "undefined") return "";

  return `${path}?${qs.stringify({
    ...qs.parse(window.location.search.slice(1)),
    locale: i18n.language,
  })}`;
};

const Index = withTranslation("index")(
  ({
    childId,
    checksums,
    coverSrc,
    creatorUrl,
    fileURI,
    license,
    network,
    t,
    url,
  }) => {
    const [licenseData, setLicenseData] = useState(license);
    const pageTitle = `${license.title} | MetaProof`;

    const {
      amountOfThisGood = 0,
      amount = 0,
      title = "No name",
      price,
      documents = [],
      cover = [],
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
              href={creatorUrl}
              target="_blank"
            />
          }
          content={
            <IndexContent
              childId={childId}
              coverSrc={coverSrc}
              amount={amountOfThisGood || amount}
              title={title}
              price={price}
              network={network}
              fileURI={fileURI}
              histories={histories}
              onMetaDataChange={(fileUrl) =>
                fetchMetaDataFile(fileUrl).then((data) => setLicenseData(data))
              }
              {...rest}
            />
          }
          extraContent={IndexExtraContent({
            histories,
            documents: [...documents, ...cover],
            fileURI,
            checksums,
          })}
          extraSidebar={IndexExtraSidebar({
            pdfUrl: generateUrl("api/export/pdf"),
            qrcodeUrl: generateUrl("api/export/qrcode"),
            qrcodeValue: generateUrl("https://https://explorer.license.rocks/"),
          })}
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
  pdfUrl: PropTypes.string.isRequired,
  fileURI: PropTypes.string.isRequired,
  checksums: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Index.defaultProps = {
  coverSrc: null,
};

export default Index;
