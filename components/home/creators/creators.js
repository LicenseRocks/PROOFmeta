import React, { useEffect } from "react";
import styled from "styled-components";
import { H4, Image, Text } from "@licenserocks/kit";
import { useKeenSlider } from "keen-slider/react";
import useSWR from "swr";

import { withTranslation } from "i18n";
import { apiRoutes } from "routes";

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 72px;
    height: 72px;
    border-radius: 16px;
    margin-bottom: -36px;
    z-index: 1;
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

export const HomeCreators = withTranslation("home")(({ t }) => {
  const { data = { creators: [] } } = useSWR(
    apiRoutes.creatorshub.getCreators()
  );
  const [pause, setPause] = React.useState(false);
  const timer = React.useRef();
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    duration: 1000,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
    slidesPerView: 6,
    spacing: 16,
  });

  useEffect(() => {
    sliderRef.current.addEventListener("mouseover", () => {
      setPause(true);
    });
    sliderRef.current.addEventListener("mouseout", () => {
      setPause(false);
    });
  }, [sliderRef]);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 2000);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider]);

  const { creators } = data;

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {creators.map((c) => (
          <Slide key={c.id} className="keen-slider__slide">
            <Image src={c.profile.avatar || "/images/user-placeholder.png"} />

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
          </Slide>
        ))}
      </div>
    </>
  );
});

HomeCreators.propTypes = {};

HomeCreators.defaultProps = {};
