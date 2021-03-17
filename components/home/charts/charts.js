import React from "react";
import styled, { useTheme } from "styled-components";
import { Box, DetailsTable, Flex, H2, H3, H4, Text } from "@licenserocks/kit";
import { PieChart, Pie, Cell } from "recharts";
import useSWR from "swr";
import { useTranslation } from "next-i18next";

import { apiRoutes } from "routes";

const getColors = ({ palette }) => ({
  unique: palette.success.main,
  rare: palette.warning.light,
  unlimited: palette.primary.main,
});

const PieWrapper = styled.div`
  position: relative;
  width: fit-content;

  .title {
    position: absolute;
    width: 120px;
    height: 120px;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Label = styled.div`
  position: relative;
  ::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${({ color }) => color};
    display: inline-block;
    margin-right: 8px;
    margin-left: -16px;
  }
`;

const getPieData = (stats) => [
  { name: "unique", value: stats.nfts?.unique },
  { name: "rare", value: stats.nfts?.rare },
  { name: "unlimited", value: stats.nfts?.unlimited },
];

const renderPieLabel = (label, color) => {
  return <Label color={color}>{label}</Label>;
};

export const HomeCharts = () => {
  const { t } = useTranslation("home");
  const theme = useTheme();
  const { data = { stats: {} } } = useSWR(apiRoutes.creatorshub.getStats());

  const { stats } = data;
  const colors = getColors(theme);
  const pieData = getPieData(stats);
  return (
    <Flex container justify="center" spacing={8}>
      <Flex item md={4} xs={12}>
        <Box>
          <Flex container spacing={8}>
            <Flex item>
              <PieWrapper>
                <PieChart width={120} height={120}>
                  <Pie
                    data={pieData}
                    innerRadius={45}
                    outerRadius={56}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={colors[entry.name]} />
                    ))}
                  </Pie>
                </PieChart>

                <div className="title">
                  <H3 content={t("charts.nfts")} />
                </div>
              </PieWrapper>
            </Flex>

            <Flex item>
              <DetailsTable
                justifyBetween
                labelWidth={80}
                rows={[
                  {
                    label: <H4 color="textPrimary" content={t("charts.all")} />,
                    value: <H2 content={stats.nfts?.total} />,
                  },
                  {
                    label: renderPieLabel(t("charts.unique"), colors.unique),
                    value: (
                      <Text content={stats.nfts?.unique} fontWeight="bold" />
                    ),
                  },
                  {
                    label: renderPieLabel(t("charts.rare"), colors.rare),
                    value: (
                      <Text content={stats.nfts?.rare} fontWeight="bold" />
                    ),
                  },
                  {
                    label: renderPieLabel(
                      t("charts.unlimited"),
                      colors.unlimited
                    ),
                    value: (
                      <Text content={stats.nfts?.unlimited} fontWeight="bold" />
                    ),
                  },
                ]}
                size="sm"
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

HomeCharts.propTypes = {};

HomeCharts.defaultProps = {};
