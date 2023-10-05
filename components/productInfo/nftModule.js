import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { H2, Image, Button } from "@licenserocks/kit";

function filterURL(url) {
  // Use a regular expression to extract the base URL
  const regex = /^(https?:\/\/[^/]+)/;
  const match = url.match(regex);

  if (match && match.length > 0) {
    return match[1];
  }

  // Return the original URL if no match found
  return url;
}
export const NftModule = ({ data, redirectUrl }) => {
  const router = useRouter();
  const { title, coverSrc, description } = data;
  const filteredURL = filterURL(redirectUrl);

  return (
    <>
      <NftWrapper>
        <H2 align="center" my={4} content={title} />
        <NftData>
          <Image src={coverSrc} />
          {description ?
            <NftContent dangerouslySetInnerHTML={{ __html: description?.slice(0, 400) + "..." }} />
            :
            <NftContent>No description provided.</NftContent>
          }
        </NftData>
      </NftWrapper>
      <BuyRow>
        <Button onClick={() => router.push(`${filteredURL}/nft/${nftId}`)}>Buy this NFT</Button>
      </BuyRow>
    </>
  );
};

const NftWrapper = styled.div`
  text-align: left;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 30px;
  }

  @media (max-width: 767px) {
    padding: 1rem;
  }

  h2 {
    width: 100%;
    text-align: start;

    @media (max-width: 767px) {
      text-align: center;
    }
  }
`;

const NftData = styled.div`
  width: 100%;
  display: flex;
  max-height: 200px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    max-height: 100%;
  }

  img {
    border-radius: 32px !important;
    object-fit: cover;
    width: 243px;
    max-height: 217px;
    flex-shrink: 0;
  }
`;

const NftContent = styled.div`
  flex: 1;
  margin-left: 24px;
  @media (max-width: 767px) {
    margin: 0;
  }
`;

const BuyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

  button {
    border-radius: 32px !important;
    background-color: blue !important;
  }
`;