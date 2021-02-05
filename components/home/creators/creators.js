import React, { useEffect } from "react";
import styled from "styled-components";
import { H4, Image, Text } from "@licenserocks/kit";
import { useKeenSlider } from "keen-slider/react";

import { withTranslation } from "i18n";

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
    padding-top: ${({ theme }) => theme.spacing(12)};
  }
`;

export const HomeCreators = withTranslation("home")(({ t }) => {
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
    slidesPerView: 7,
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

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {[...new Array(20)].map((s, idx) => (
          <Slide key={`slide${idx}`} className="keen-slider__slide">
            <Image src="/images/user-placeholder.png" />

            <div className="card">
              <Text content="Name" fontWeight="bold" fontSize="lg" mb={1} />

              <Text
                content="Tehran, Iran"
                color="textSecondary"
                fontSize="sm"
              />

              <Text color="textSecondary" fontSize="sm" mt={10}>
                <H4 content="65" color="textPrimary" dInline />{" "}
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
