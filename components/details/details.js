import React from "react";
import { Flex, Hidden } from "@licenserocks/kit";

export const DetailsShow = ({
  ads,
  content,
  extraContent,
  sidebar,
  extraSidebar,
}) => {
  return (
    <>
      {/* Desktop */}
      <Hidden mdDown>
        <Flex item lg={9}>
          {content}
          {extraContent}
        </Flex>

        <Flex item lg={3}>
          {sidebar}
          {extraSidebar}
          {ads}
        </Flex>
      </Hidden>

      {/* Tablet and Mobile */}
      <Hidden lgUp>
        <Flex item xs={12}>
          {content}
        </Flex>

        <Flex container alignItems="center" justify="space-between" spacing={4}>
          <Flex item md={6} xs={12}>
            {sidebar}
          </Flex>

          <Flex item md={6} xs={12}>
            {extraSidebar}
          </Flex>
        </Flex>

        <Flex item xs={12}>
          {extraContent}
          {ads}
        </Flex>
      </Hidden>
    </>
  );
};
