import React from "react";
import Head from "next/head";
import { PageMeta } from "@licenserocks/kit";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ExplorerLayout, ShowHome } from "components";

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home", "layout"])),
    },
  };
};

const IndexPage = () => {
  return (
    <>
      <PageMeta
        description="ProofMeta is an explorer to extract the metadata of NFTs that are secured with their JSON files on the Arweave permanent storage"
        title="ProofMeta"
        url="/home"
        Wrapper={(props) => <Head {...props} />}
      />

      <ShowHome />
    </>
  );
};

IndexPage.Layout = ExplorerLayout;

IndexPage.propTypes = {};

IndexPage.defaultProps = {};

export default IndexPage;
