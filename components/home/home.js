import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Flex, H1, H2, H5, Paragraph } from "@licenserocks/kit";

import { withTranslation } from "i18n";
import { HomeCharts } from "./charts";
import { TransactionsTable } from "./transactionsTable";
import { NftGrid } from "./nft";

const NFTS = [
  {
    amount: 1,
    arweaveTx: null,
    biddingEnabled: true,
    chainTx: null,
    id: 77,
    price: 165000,
    title: "Trump Era",
    discounts: [],
    Files: [
      {
        key:
          "0xffd1d254f5499dc82619d63d168485abd6b97e44/nftFiles/77/cover/Trump Era v4. - by TNFTM.png",
        public: true,
        storageType: "s3",
      },
    ],
    coverSrc:
      "https://creatorshub.s3.eu-central-1.amazonaws.com/0xffd1d254f5499dc82619d63d168485abd6b97e44/nftFiles/77/cover/Trump Era v4. - by TNFTM.png",
    slug: "77-trump-era",
  },
  {
    amount: 1,
    arweaveTx: null,
    biddingEnabled: true,
    chainTx: null,
    id: 76,
    price: 165000,
    title: "Trump Era",
    discounts: [],
    Files: [
      {
        key:
          "0xffd1d254f5499dc82619d63d168485abd6b97e44/nftFiles/76/cover/Trump Era v4. - by TNFTM.png",
        public: true,
        storageType: "s3",
      },
    ],
    coverSrc:
      "https://creatorshub.s3.eu-central-1.amazonaws.com/0xffd1d254f5499dc82619d63d168485abd6b97e44/nftFiles/76/cover/Trump Era v4. - by TNFTM.png",
    slug: "76-trump-era",
  },
  {
    amount: 1,
    arweaveTx: "wFJOMYZy6X3hAOduKz_lRMFO6z3vKB6na_vgmsxON9E",
    biddingEnabled: false,
    chainTx: null,
    id: 75,
    price: 10000,
    title: "Daud Screensoot",
    discounts: [],
    Files: [
      {
        key:
          "0xfaE0be50ae6b4A2bdD5D4F8e0600fa1363722d33/nftFiles/75/cover/Bildschirmfoto 2021-01-11 um 16.31.19.png",
        public: true,
        storageType: "s3",
      },
    ],
    coverSrc:
      "https://creatorshub.s3.eu-central-1.amazonaws.com/0xfaE0be50ae6b4A2bdD5D4F8e0600fa1363722d33/nftFiles/75/cover/Bildschirmfoto 2021-01-11 um 16.31.19.png",
    slug: "75-daud-screensoot",
  },
  {
    amount: 1,
    arweaveTx: "hTM2V2l3LApKIuQCwed15qMopBNeLjzpWCj9I_DIoII",
    biddingEnabled: false,
    chainTx: null,
    id: 74,
    price: 1000,
    title: "Fly guy",
    discounts: [],
    Files: [
      {
        key:
          "0xfaE0be50ae6b4A2bdD5D4F8e0600fa1363722d33/nftFiles/74/cover/E162002A-4656-4468-8005-F6FDB3290FC9.gif",
        public: true,
        storageType: "s3",
      },
    ],
    coverSrc:
      "https://creatorshub.s3.eu-central-1.amazonaws.com/0xfaE0be50ae6b4A2bdD5D4F8e0600fa1363722d33/nftFiles/74/cover/E162002A-4656-4468-8005-F6FDB3290FC9.gif",
    slug: "74-fly-guy",
  },
  {
    amount: 1,
    arweaveTx: "_-OG7XfZekXkeksgGxOA98Hy61YMMMTnuTPdHV1tY1Y",
    biddingEnabled: true,
    chainTx: null,
    id: 67,
    price: 1200,
    title: "Artur Test",
    discounts: [],
    Files: [
      {
        key:
          "0xC127FA9bAb208Aeff081aD1C712688f8f2bD71F9/nftFiles/67/cover/nauka-2021.jpg",
        public: true,
        storageType: "s3",
      },
    ],
    coverSrc:
      "https://creatorshub.s3.eu-central-1.amazonaws.com/0xC127FA9bAb208Aeff081aD1C712688f8f2bD71F9/nftFiles/67/cover/nauka-2021.jpg",
    slug: "67-artur-test",
  },
  {
    amount: 1,
    arweaveTx: "vkonnMisJfj-6DUjSNb1ty_dAcAe4G9UNLuP0tfF3R8",
    biddingEnabled: false,
    chainTx: null,
    id: 66,
    price: 10,
    title: "Rings",
    discounts: [],
    Files: [
      {
        key:
          "0xfaE0be50ae6b4A2bdD5D4F8e0600fa1363722d33/nftFiles/66/cover/Bildschirmfoto 2020-10-09 um 16.58.23.png",
        public: true,
        storageType: "s3",
      },
    ],
    coverSrc:
      "https://creatorshub.s3.eu-central-1.amazonaws.com/0xfaE0be50ae6b4A2bdD5D4F8e0600fa1363722d33/nftFiles/66/cover/Bildschirmfoto 2020-10-09 um 16.58.23.png",
    slug: "66-rings",
  },
  {
    amount: 1,
    arweaveTx: "bT0C1va163_4-5bhE5AAAuQbl25Y-0ig2cGF9DU22-0",
    biddingEnabled: false,
    chainTx: null,
    id: 61,
    price: 100000,
    title: "Watch the dog",
    discounts: [],
    Files: [
      {
        key:
          "0xfaE0be50ae6b4A2bdD5D4F8e0600fa1363722d33/nftFiles/61/cover/25989424636_46f28f7c13_k.jpg",
        public: true,
        storageType: "s3",
      },
    ],
    coverSrc:
      "https://creatorshub.s3.eu-central-1.amazonaws.com/0xfaE0be50ae6b4A2bdD5D4F8e0600fa1363722d33/nftFiles/61/cover/25989424636_46f28f7c13_k.jpg",
    slug: "61-watch-the-dog",
  },
  {
    amount: 2,
    arweaveTx: "UaAf07CyQ60dMjmloqEWhegWfYtubqnX1pXOKy7ADqg",
    biddingEnabled: false,
    chainTx: null,
    id: 60,
    price: 999,
    title: "Hamburg's Beach Boys",
    discounts: [],
    Files: [
      {
        key:
          "0xfaE0be50ae6b4A2bdD5D4F8e0600fa1363722d33/nftFiles/60/cover/Bildschirmfoto 2020-12-03 um 21.07.13.png",
        public: true,
        storageType: "s3",
      },
    ],
    coverSrc:
      "https://creatorshub.s3.eu-central-1.amazonaws.com/0xfaE0be50ae6b4A2bdD5D4F8e0600fa1363722d33/nftFiles/60/cover/Bildschirmfoto 2020-12-03 um 21.07.13.png",
    slug: "60-hamburgs-beach-boys",
  },
];

const ContentContainer = styled(Flex).attrs(() => ({
  container: true,
  direction: "column",
  xs: 12,
  md: 8,
}))`
  text-align: center;
  margin: auto;

  .bg {
    background: url("/images/home-bg.svg") no-repeat center;
    background-size: contain;
    width: 100%;
    height: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ShowHome = withTranslation("home")(({ t }) => {
  return (
    <>
      <ContentContainer mb={12}>
        <H1
          align="center"
          content="Lorem ipsum dolor sit consectetur adipiscing elit"
          mb={6}
        />

        <Paragraph
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut netus proin sociis dolor netus. Adipiscing consequat maecenas non tortor. Velit cursus at blandit eu senectus. Convallis vestibulum mattis aliquet sed. Feugiat in varius aliquet sit diam vel hendrerit vitae."
          fontWeight="light"
        />
      </ContentContainer>

      <HomeCharts />

      <ContentContainer mt={30}>
        <H1 align="center" content="The Latest Transactions" mb={6} />

        <Paragraph
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut netus proin sociis dolor netus Convallis vestibulum mattis. "
          fontWeight="light"
          mb={12}
        />
      </ContentContainer>

      <TransactionsTable data={NFTS} />

      <ContentContainer mt={30} mb={12}>
        <H1 align="center" content="Latest NFTs" />
      </ContentContainer>

      <NftGrid items={NFTS} />

      <ContentContainer mb={12}>
        <Button content="See More" endIcon="arrow-right" size="lg" />
      </ContentContainer>

      <ContentContainer mt={20}>
        <div className="bg">
          <H5
            content="If you are interested in becoming a creator or buyer,"
            mb={2}
          />

          <H2 content="Do you want to create a NFTs?" mb={2} />

          <Paragraph
            content="You can easily create any NFT with high security!"
            fontWeight="light"
            mb={8}
          />
          <Button content="Create a NFT" size="lg" />
        </div>
      </ContentContainer>
    </>
  );
});

ShowHome.propTypes = {};

ShowHome.defaultProps = {};
