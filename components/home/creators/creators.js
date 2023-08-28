import React from "react";
import styled, { useTheme } from "styled-components";
import { H4, Image, PageFigure, Text } from "@licenserocks/kit";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTranslation } from "next-i18next";

import { apiRoutes } from "routes";
import { useRequest } from "hooks";

const StyledPageFigure = styled(PageFigure)`
  display: table;
`;

const StyledSlide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: initial;
  text-decoration: none;

  img {
    width: 72px;
    height: 72px;
    border-radius: 16px;
    margin-bottom: -36px;
    z-index: 1;
    object-fit: cover;
  }

  .card {
    position: relative;
    width: 172px;
    height: 172px;
    background-color: ${({ theme }) => theme.palette.common.white};
    box-shadow: 0px 8px 32px rgba(41, 40, 57, 0.08);
    border-radius: 16px;
    text-align: center;
    padding: ${({ theme }) => theme.spacing(12, 4, 4, 4)};
  }
`;

export const HomeCreators = () => {
  const { t } = useTranslation("home");
  const { items = [] } = useRequest(
    apiRoutes.creatorshub.getCreators(),
    "creators"
  );
  const theme = useTheme();

  let visibleSlides = 8;
  if (useMediaQuery(theme.breakpoints.down("xl"))) visibleSlides = 6;
  if (useMediaQuery(theme.breakpoints.down("md"))) visibleSlides = 2;
  if (useMediaQuery(theme.breakpoints.down("sm"))) visibleSlides = 1;

  return (
    <StyledPageFigure>
      <CarouselProvider
        infinite
        isPlaying
        interval={2000}
        visibleSlides={visibleSlides}
        totalSlides={items.length}
        naturalSlideWidth={205}
        naturalSlideHeight={205}
      >
        <Slider>
          {items.map((c) => (
            <Slide key={c.id}>
              <StyledSlide>
                <Image
                  src={c.profile?.avatar || "/images/user-placeholder.png"}
                />

                <div className="card">
                  <Text
                    content={c.name || c.ethereumPublicAddr}
                    fontWeight="bold"
                    fontSize="lg"
                    mb={1}
                    noWrap
                  />

                  <Text
                    content={c.profile.description || t("creators.creator")}
                    color="textSecondary"
                    fontSize="sm"
                    noWrap
                  />

                  <Text color="textSecondary" fontSize="sm" mt={10}>
                    <H4
                      content={c.nfts.length || "0"}
                      color="textPrimary"
                      dInline
                    />{" "}
                    {t("creators.nfts")}
                  </Text>
                </div>
              </StyledSlide>
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </StyledPageFigure>
  );
};

HomeCreators.propTypes = {};

HomeCreators.defaultProps = {};
