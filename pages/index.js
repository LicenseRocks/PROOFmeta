import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { PageMeta, Button } from "@licenserocks/kit";
import qs from "qs";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  DetailsContent,
  DetailsExtraContent,
  DetailsExtraSidebar,
  DetailsSidebar,
  DetailsShow,
  MiningInProgress,
} from "components/details";
import { ExplorerLayout } from "components/layout";
import { getLicenseInfo, fetchMetaDataFile } from "utils/ethereum";
import absoluteUrl from "utils/absoluteUrl";
import { apiRoutes } from "routes";
import { getBaseUrl } from "utils/url";

const getCreatorUrl = (id, createdWith, licenseInfo) => {
  if (licenseInfo?.license?.buyNowUrl) {
    return licenseInfo.license.buyNowUrl;
  }

  const baseUrl = getBaseUrl(createdWith);
  if (createdWith === "licensecore") return `${baseUrl}/licenses/${id}`;
  return `${baseUrl}/nft/${id}`;
};

export async function getServerSideProps({ locale, query, req, res }) {
  const { id, contractAddr, network, createdWith, contractName } = query;

  // Redirect to home if NFT id is not present
  if (!id) {
    res.setHeader("Location", "/home");
    res.statusCode = 302;
    res.end();
  }

  // Call smart contract to get files array on server side
  const licenseInfo = await getLicenseInfo(
    id,
    contractAddr,
    contractName,
    network
  );
  const { origin } = absoluteUrl(req);

  const coverKey = licenseInfo.license?.documents?.find(
    (doc) => doc.type === "cover"
  )?.key;

  return {
    props: {
      ...licenseInfo,
      createdWith,
      coverSrc: coverKey ? `${process.env.BUCKET_URL}/${coverKey}` : "",
      creatorUrl: getCreatorUrl(id, createdWith, licenseInfo),
      id: id || null,
      url:
        origin +
        qs.stringify(query, {
          addQueryPrefix: true,
        }),
      network: network || null,
      ...(await serverSideTranslations(locale, [
        "common",
        "details",
        "layout",
      ])),
    },
  };
}

const generateUrl = (path, i18n) => {
  if (typeof window === "undefined") return "";

  return `${path}?${qs.stringify({
    ...qs.parse(window.location.search.slice(1)),
    locale: i18n.language,
  })}`;
};

const DetailsPage = ({
  childId,
  createdWith,
  coverSrc,
  fileURI,
  id,
  license,
  network,
  url,
}) => {
  const { i18n } = useTranslation("details");
  const [licenseData, setLicenseData] = useState(license);
  const pageTitle = `${license.title} | ProofMeta`;
  const nftUrl = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/${generateUrl("", i18n)}`
  );
  const qrCodeUrl = `api/export/qrcode?id=${id}&targetUrl=${nftUrl}`;

  const {
    amountOfThisGood = 0,
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
        description="ProofMeta is an explorer to extract the metadata of NFTs that are secured with their JSON files on the Arweave permanent storage"
        imgSrc={coverSrc}
        title={pageTitle}
        url={url}
        Wrapper={(props) => <Head {...props} />}
      />
      <DetailsShow
        content={
          <DetailsContent
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
        extraContent={DetailsExtraContent({
          createdWith,
          nftId: id,
          documents,
          fileURI,
        })}
        extraSidebar={DetailsExtraSidebar({
          pdfUrl: apiRoutes.creatorshub.getNftPdf(
            id,
            createdWith,
            i18n.language
          ),
          qrCodeUrl,
          qrCodeValue: generateUrl(process.env.NEXT_PUBLIC_APP_DOMAIN, i18n),
        })}
        sidebar={DetailsSidebar({ url })}
      />
    </>
  );
};

DetailsPage.Layout = (props) => {
  const { t } = useTranslation("details");

  const {
    children: {
      props: { creatorUrl },
    },
  } = props;

  return (
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
      {...props}
    />
  );
};

DetailsPage.propTypes = {
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

DetailsPage.defaultProps = {
  coverSrc: null,
};

export default DetailsPage;
