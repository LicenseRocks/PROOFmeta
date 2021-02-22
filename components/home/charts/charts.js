import React from "react";
import styled, { useTheme } from "styled-components";
import { Box, DetailsTable, Flex, H2, H3, H4, Text } from "@licenserocks/kit";
import { AreaChart, Area, XAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import useSWR from "swr";

import { withTranslation } from "i18n";
import { apiRoutes } from "routes";

const areaData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const getColors = ({ palette }) => ({
  unique: palette.success.main,
  limited: palette.warning.light,
  others: palette.primary.main,
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

const getPieData = (stats) => [
  { name: "unique", value: stats.nfts?.unique },
  { name: "rare", value: stats.nfts?.rare },
  { name: "unlimited", value: stats.nfts?.unlimited },
];

export const HomeCharts = withTranslation("home")(({ t }) => {
  const theme = useTheme();
  const { data = { stats: {} } } = useSWR(apiRoutes.creatorshub.getStats());

  const { stats } = data;
  const colors = getColors(theme);
  const pieData = getPieData(stats);
  return (
    <Flex container spacing={8}>
      <Flex item lg={4} xs={12}>
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
                      <Cell
                        key={entry.name}
                        fill={
                          Object.values(colors)[
                            index % Object.values(colors).length
                          ]
                        }
                      />
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
                    label: t("charts.unique"),
                    value: (
                      <Text content={stats.nfts?.unique} fontWeight="bold" />
                    ),
                  },
                  {
                    label: t("charts.rare"),
                    value: (
                      <Text content={stats.nfts?.rare} fontWeight="bold" />
                    ),
                  },
                  {
                    label: t("charts.unlimited"),
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

      <Flex item lg={8} xs={12}>
        <Box>
          <Flex alignItems="flex-start" container spacing={8}>
            <Flex item>
              <H3 content={t("charts.createdNfts")} />
            </Flex>

            <Flex item>
              <AreaChart width={500} height={120} data={areaData}>
                <XAxis
                  axisLine={false}
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke={theme.palette.primary.main}
                  fill={theme.palette.primary.light}
                />
              </AreaChart>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
});

HomeCharts.propTypes = {};

HomeCharts.defaultProps = {};
