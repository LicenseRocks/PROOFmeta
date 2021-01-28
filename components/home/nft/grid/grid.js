import React from "react";
import PropTypes from "prop-types";
import { Flex, NoItem } from "@licenserocks/kit";
import Masonry from "react-masonry-css";
import styled from "styled-components";

import { withTranslation } from "i18n";
import { NftItem, NftItemLoader } from "../item";
import { getBadges, getDetails } from "../helper";

const GridWrapper = styled.div`
  width: 100%;
  margin: ${({ theme }) => theme.spacing(4, 0)};

  .nft-masonry-grid {
    display: flex;
    margin-left: -${({ theme }) => theme.spacing(8)};
    width: auto;
  }
  .nft-masonry-grid_column {
    padding-left: ${({ theme }) => theme.spacing(8)}; /* gutter size */
  }

  /* Style your items */
  .nft-masonry-grid_column > a,
  .nft-masonry-grid_column > div {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing(8)};
  }
`;

const Wrapper = styled.div`
  position: relative;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const NftGrid = withTranslation("home")(
  ({ cols, items, loading, t }) => {
    const renderLoader = () =>
      [...new Array(10)].map((_, idx) => (
        <NftItemLoader idx={idx} key={`loader-${`${idx}`}`} />
      ));

    return (
      <Flex container direction="column">
        {items.length === 0 && !loading && <NoItem mt={4} />}

        <GridWrapper>
          <Masonry
            breakpointCols={
              cols || {
                default: 5,
                992: 3,
                768: 2,
                576: 1,
              }
            }
            className="nft-masonry-grid"
            columnClassName="nft-masonry-grid_column"
          >
            {loading
              ? renderLoader()
              : items.map((item) => {
                  const badges = getBadges(t, item);
                  const details = getDetails(t, item);
                  return (
                    <NftItem
                      key={item.id}
                      badges={badges}
                      coverSrc={item?.coverSrc}
                      details={details}
                      megaTitle={item?.vendor}
                      subTitle={item?.version}
                      title={item.title}
                      type="modern"
                      Wrapper={(props) => (
                        <Wrapper>
                          <a href="https://demo2-creatorshub.license.rocks">
                            {props.children}
                          </a>
                        </Wrapper>
                      )}
                    />
                  );
                })}
          </Masonry>
        </GridWrapper>
      </Flex>
    );
  }
);

NftGrid.propTypes = {
  cols: PropTypes.shape({}),
  items: PropTypes.arrayOf(PropTypes.shape),
  t: PropTypes.shape({}),
};

NftGrid.defaultProps = {
  items: [],
};
