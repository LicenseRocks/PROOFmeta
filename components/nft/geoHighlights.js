import React, { useEffect } from "react";
import { Mercator, Graticule } from "@visx/geo";
import * as topojson from "topojson-client";

import topology from "./world-topology.json";
import { GEO_VISUALIZATION_COUNTRY_CODES, isValidGeoVisualizationCountryCode } from "./geoDetails";

export const background = "#f9f7e8";
const world = topojson.feature(topology, topology.objects.units);

export const GeoHighlight = ({ width, height, highlightedCountries }) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / 630) * 100;

  const finalHighlightedCountries =
    !Array.isArray(highlightedCountries) && highlightedCountries === "all"
      ? GEO_VISUALIZATION_COUNTRY_CODES
      : highlightedCountries;

  useEffect(() => {
    if(highlightedCountries){
      for (const highlightedCountry of finalHighlightedCountries) {
        if (!isValidGeoVisualizationCountryCode(highlightedCountry)) {
          throw new Error(
            `${highlightedCountry} is not valid country to be highlighted. Possible options: ${GEO_VISUALIZATION_COUNTRY_CODES.join(
              ", "
            )}`
          );
        }
      }
    }

  }, [finalHighlightedCountries]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="transparent"
        rx={14}
      />
      <Mercator
        data={world.features}
        scale={scale}
        translate={[centerX, centerY + 30]}
      >
        {(mercator) => (
          <g>
            <Graticule
              graticule={(g) => mercator.path(g) || ""}
              stroke="rgba(33,33,33,0.00)"
            />
            {mercator.features.map(({ feature, path }, i) => {
              return (
                <path
                  key={`map-feature-${i}`}
                  d={path || ""}
                  fill={
                    finalHighlightedCountries?.includes(feature.id)
                      ? "orange"
                      : "lightgray"
                  }
                  stroke={background}
                  strokeWidth={0.15}
                />
              );
            })}
          </g>
        )}
      </Mercator>
    </svg>
  );
};
