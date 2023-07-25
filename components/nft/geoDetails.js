import { isEmpty, isNil } from "lodash/lang";

export function isValidGeoVisualizationCountryCode(
  code
) {
  return GEO_VISUALIZATION_COUNTRY_CODES.includes(
    code
);
}

export function getGeoVisualizationCountryName(
  code
) {
  const filteredCountries = GEO_VISUALIZATION_COUNTRIES.filter(
    (geoVisualizationCountry) =>
      geoVisualizationCountry.value.toLowerCase() === code.toLowerCase()
  );

  if (!isNil(filteredCountries) && !isEmpty(filteredCountries)) {
    const [{ label: countryName }] = filteredCountries;
    return countryName;
  }

  throw new Error(`Could not find geo visualization country by code = ${code}`);
}


export const GEO_VISUALIZATION_COUNTRY_CODES = [
  "AFG",
  "AGO",
  "ALB",
  "ALD",
  "AND",
  "ARE",
  "ARG",
  "ARM",
  "ATA",
  "ATF",
  "AUS",
  "AUT",
  "AZE",
  "BDI",
  "BEL",
  "BEN",
  "BFA",
  "BGD",
  "BGR",
  "BHR",
  "BHS",
  "BIH",
  "BLR",
  "BLZ",
  "BOL",
  "BRA",
  "BRB",
  "BRN",
  "BTN",
  "BWA",
  "CAF",
  "CAN",
  "CHE",
  "CHL",
  "CHN",
  "CIV",
  "CMR",
  "CNM",
  "COD",
  "COG",
  "COL",
  "COM",
  "CPV",
  "CRI",
  "CUB",
  "CUW",
  "CYN",
  "CYP",
  "CZE",
  "DEU",
  "DJI",
  "DMA",
  "DNK",
  "DOM",
  "DZA",
  "ECU",
  "EGY",
  "ERI",
  "ESB",
  "ESP",
  "EST",
  "ETH",
  "FIN",
  "FJI",
  "FLK",
  "FRA",
  "FRO",
  "FSM",
  "GAB",
  "GBR",
  "GEO",
  "GHA",
  "GIB",
  "GIN",
  "GMB",
  "GNB",
  "GNQ",
  "GRC",
  "GRD",
  "GRL",
  "GTM",
  "GUM",
  "GUY",
  "HKG",
  "HMD",
  "HND",
  "HRV",
  "HTI",
  "HUN",
  "IDN",
  "IMN",
  "IND",
  "IRL",
  "IRN",
  "IRQ",
  "ISL",
  "ISR",
  "ITA",
  "JAM",
  "JOR",
  "JPN",
  "KAB",
  "KAS",
  "KAZ",
  "KEN",
  "KGZ",
  "KHM",
  "KIR",
  "KOR",
  "XKX",
  "KWT",
  "LAO",
  "LBN",
  "LBR",
  "LBY",
  "LCA",
  "LIE",
  "LKA",
  "LSO",
  "LTU",
  "LUX",
  "LVA",
  "MAF",
  "MAR",
  "MCO",
  "MDA",
  "MDG",
  "MEX",
  "MKD",
  "MLI",
  "MMR",
  "MNE",
  "MNG",
  "MOZ",
  "MRT",
  "MUS",
  "MWI",
  "MYS",
  "NAM",
  "NCL",
  "NER",
  "NGA",
  "NIC",
  "NLD",
  "NOR",
  "NPL",
  "NZL",
  "OMN",
  "PAK",
  "PAN",
  "PER",
  "PHL",
  "PLW",
  "PNG",
  "POL",
  "PRI",
  "PRK",
  "PRT",
  "PRY",
  "PSX",
  "PYF",
  "QAT",
  "ROU",
  "RUS",
  "RWA",
  "ESH",
  "SAU",
  "SDN",
  "SSD",
  "SEN",
  "SGP",
  "SGS",
  "SLB",
  "SLE",
  "SLV",
  "SMR",
  "SOL",
  "SOM",
  "SRB",
  "STP",
  "SUR",
  "SVK",
  "SVN",
  "SWE",
  "SWZ",
  "SXM",
  "SYR",
  "TCD",
  "TGO",
  "THA",
  "TJK",
  "TKM",
  "TLS",
  "TON",
  "TTO",
  "TUN",
  "TUR",
  "TWN",
  "TZA",
  "UGA",
  "UKR",
  "URY",
  "USA",
  "USG",
  "UZB",
  "VAT",
  "VCT",
  "VEN",
  "VNM",
  "VUT",
  "WSB",
  "WSM",
  "YEM",
  "ZAF",
  "ZMB",
  "ZWE",
];


export const GEO_VISUALIZATION_COUNTRIES = [
  {
    value: "AFG",
    label: "Afghanistan",
  },
  {
    value: "AGO",
    label: "Angola",
  },
  {
    value: "ALB",
    label: "Albania",
  },
  {
    value: "ALD",
    label: "Aland",
  },
  {
    value: "AND",
    label: "Andorra",
  },
  {
    value: "ARE",
    label: "United Arab Emirates",
  },
  {
    value: "ARG",
    label: "Argentina",
  },
  {
    value: "ARM",
    label: "Armenia",
  },
  {
    value: "ATA",
    label: "Antarctica",
  },
  {
    value: "ATF",
    label: "Fr. S. Antarctic Lands",
  },
  {
    value: "AUS",
    label: "Australia",
  },
  {
    value: "AUT",
    label: "Austria",
  },
  {
    value: "AZE",
    label: "Azerbaijan",
  },
  {
    value: "BDI",
    label: "Burundi",
  },
  {
    value: "BEL",
    label: "Belgium",
  },
  {
    value: "BEN",
    label: "Benin",
  },
  {
    value: "BFA",
    label: "Burkina Faso",
  },
  {
    value: "BGD",
    label: "Bangladesh",
  },
  {
    value: "BGR",
    label: "Bulgaria",
  },
  {
    value: "BHR",
    label: "Bahrain",
  },
  {
    value: "BHS",
    label: "Bahamas",
  },
  {
    value: "BIH",
    label: "Bosnia and Herz.",
  },
  {
    value: "BLR",
    label: "Belarus",
  },
  {
    value: "BLZ",
    label: "Belize",
  },
  {
    value: "BOL",
    label: "Bolivia",
  },
  {
    value: "BRA",
    label: "Brazil",
  },
  {
    value: "BRB",
    label: "Barbados",
  },
  {
    value: "BRN",
    label: "Brunei",
  },
  {
    value: "BTN",
    label: "Bhutan",
  },
  {
    value: "BWA",
    label: "Botswana",
  },
  {
    value: "CAF",
    label: "Central African Rep.",
  },
  {
    value: "CAN",
    label: "Canada",
  },
  {
    value: "CHE",
    label: "Switzerland",
  },
  {
    value: "CHL",
    label: "Chile",
  },
  {
    value: "CHN",
    label: "China",
  },
  {
    value: "CIV",
    label: "Côte d'Ivoire",
  },
  {
    value: "CMR",
    label: "Cameroon",
  },
  {
    value: "CNM",
    label: "Cyprus U.N. Buffer Zone",
  },
  {
    value: "COD",
    label: "Dem. Rep. Congo",
  },
  {
    value: "COG",
    label: "Congo",
  },
  {
    value: "COL",
    label: "Colombia",
  },
  {
    value: "COM",
    label: "Comoros",
  },
  {
    value: "CPV",
    label: "Cape Verde",
  },
  {
    value: "CRI",
    label: "Costa Rica",
  },
  {
    value: "CUB",
    label: "Cuba",
  },
  {
    value: "CUW",
    label: "Curaçao",
  },
  {
    value: "CYN",
    label: "N. Cyprus",
  },
  {
    value: "CYP",
    label: "Cyprus",
  },
  {
    value: "CZE",
    label: "Czech Rep.",
  },
  {
    value: "DEU",
    label: "Germany",
  },
  {
    value: "DJI",
    label: "Djibouti",
  },
  {
    value: "DMA",
    label: "Dominica",
  },
  {
    value: "DNK",
    label: "Denmark",
  },
  {
    value: "DOM",
    label: "Dominican Rep.",
  },
  {
    value: "DZA",
    label: "Algeria",
  },
  {
    value: "ECU",
    label: "Ecuador",
  },
  {
    value: "EGY",
    label: "Egypt",
  },
  {
    value: "ERI",
    label: "Eritrea",
  },
  {
    value: "ESB",
    label: "Dhekelia",
  },
  {
    value: "ESP",
    label: "Spain",
  },
  {
    value: "EST",
    label: "Estonia",
  },
  {
    value: "ETH",
    label: "Ethiopia",
  },
  {
    value: "FIN",
    label: "Finland",
  },
  {
    value: "FJI",
    label: "Fiji",
  },
  {
    value: "FLK",
    label: "Falkland Is.",
  },
  {
    value: "FRA",
    label: "France",
  },
  {
    value: "FRO",
    label: "Faeroe Is.",
  },
  {
    value: "FSM",
    label: "Micronesia",
  },
  {
    value: "GAB",
    label: "Gabon",
  },
  {
    value: "GBR",
    label: "United Kingdom",
  },
  {
    value: "GEO",
    label: "Georgia",
  },
  {
    value: "GHA",
    label: "Ghana",
  },
  {
    value: "GIB",
    label: "Gibraltar",
  },
  {
    value: "GIN",
    label: "Guinea",
  },
  {
    value: "GMB",
    label: "Gambia",
  },
  {
    value: "GNB",
    label: "Guinea-Bissau",
  },
  {
    value: "GNQ",
    label: "Eq. Guinea",
  },
  {
    value: "GRC",
    label: "Greece",
  },
  {
    value: "GRD",
    label: "Grenada",
  },
  {
    value: "GRL",
    label: "Greenland",
  },
  {
    value: "GTM",
    label: "Guatemala",
  },
  {
    value: "GUM",
    label: "Guam",
  },
  {
    value: "GUY",
    label: "Guyana",
  },
  {
    value: "HKG",
    label: "Hong Kong",
  },
  {
    value: "HMD",
    label: "Heard I. and McDonald Is.",
  },
  {
    value: "HND",
    label: "Honduras",
  },
  {
    value: "HRV",
    label: "Croatia",
  },
  {
    value: "HTI",
    label: "Haiti",
  },
  {
    value: "HUN",
    label: "Hungary",
  },
  {
    value: "IDN",
    label: "Indonesia",
  },
  {
    value: "IMN",
    label: "Isle of Man",
  },
  {
    value: "IND",
    label: "India",
  },
  {
    value: "IRL",
    label: "Ireland",
  },
  {
    value: "IRN",
    label: "Iran",
  },
  {
    value: "IRQ",
    label: "Iraq",
  },
  {
    value: "ISL",
    label: "Iceland",
  },
  {
    value: "ISR",
    label: "Israel",
  },
  {
    value: "ITA",
    label: "Italy",
  },
  {
    value: "JAM",
    label: "Jamaica",
  },
  {
    value: "JOR",
    label: "Jordan",
  },
  {
    value: "JPN",
    label: "Japan",
  },
  {
    value: "KAB",
    label: "Baikonur",
  },
  {
    value: "KAS",
    label: "Siachen Glacier",
  },
  {
    value: "KAZ",
    label: "Kazakhstan",
  },
  {
    value: "KEN",
    label: "Kenya",
  },
  {
    value: "KGZ",
    label: "Kyrgyzstan",
  },
  {
    value: "KHM",
    label: "Cambodia",
  },
  {
    value: "KIR",
    label: "Kiribati",
  },
  {
    value: "KOR",
    label: "Korea",
  },
  {
    value: "XKX",
    label: "Kosovo",
  },
  {
    value: "KWT",
    label: "Kuwait",
  },
  {
    value: "LAO",
    label: "Lao PDR",
  },
  {
    value: "LBN",
    label: "Lebanon",
  },
  {
    value: "LBR",
    label: "Liberia",
  },
  {
    value: "LBY",
    label: "Libya",
  },
  {
    value: "LCA",
    label: "Saint Lucia",
  },
  {
    value: "LIE",
    label: "Liechtenstein",
  },
  {
    value: "LKA",
    label: "Sri Lanka",
  },
  {
    value: "LSO",
    label: "Lesotho",
  },
  {
    value: "LTU",
    label: "Lithuania",
  },
  {
    value: "LUX",
    label: "Luxembourg",
  },
  {
    value: "LVA",
    label: "Latvia",
  },
  {
    value: "MAF",
    label: "St-Martin",
  },
  {
    value: "MAR",
    label: "Morocco",
  },
  {
    value: "MCO",
    label: "Monaco",
  },
  {
    value: "MDA",
    label: "Moldova",
  },
  {
    value: "MDG",
    label: "Madagascar",
  },
  {
    value: "MEX",
    label: "Mexico",
  },
  {
    value: "MKD",
    label: "Macedonia",
  },
  {
    value: "MLI",
    label: "Mali",
  },
  {
    value: "MMR",
    label: "Myanmar",
  },
  {
    value: "MNE",
    label: "Montenegro",
  },
  {
    value: "MNG",
    label: "Mongolia",
  },
  {
    value: "MOZ",
    label: "Mozambique",
  },
  {
    value: "MRT",
    label: "Mauritania",
  },
  {
    value: "MUS",
    label: "Mauritius",
  },
  {
    value: "MWI",
    label: "Malawi",
  },
  {
    value: "MYS",
    label: "Malaysia",
  },
  {
    value: "NAM",
    label: "Namibia",
  },
  {
    value: "NCL",
    label: "New Caledonia",
  },
  {
    value: "NER",
    label: "Niger",
  },
  {
    value: "NGA",
    label: "Nigeria",
  },
  {
    value: "NIC",
    label: "Nicaragua",
  },
  {
    value: "NLD",
    label: "Netherlands",
  },
  {
    value: "NOR",
    label: "Norway",
  },
  {
    value: "NPL",
    label: "Nepal",
  },
  {
    value: "NZL",
    label: "New Zealand",
  },
  {
    value: "OMN",
    label: "Oman",
  },
  {
    value: "PAK",
    label: "Pakistan",
  },
  {
    value: "PAN",
    label: "Panama",
  },
  {
    value: "PER",
    label: "Peru",
  },
  {
    value: "PHL",
    label: "Philippines",
  },
  {
    value: "PLW",
    label: "Palau",
  },
  {
    value: "PNG",
    label: "Papua New Guinea",
  },
  {
    value: "POL",
    label: "Poland",
  },
  {
    value: "PRI",
    label: "Puerto Rico",
  },
  {
    value: "PRK",
    label: "Dem. Rep. Korea",
  },
  {
    value: "PRT",
    label: "Portugal",
  },
  {
    value: "PRY",
    label: "Paraguay",
  },
  {
    value: "PSX",
    label: "Palestine",
  },
  {
    value: "PYF",
    label: "Fr. Polynesia",
  },
  {
    value: "QAT",
    label: "Qatar",
  },
  {
    value: "ROU",
    label: "Romania",
  },
  {
    value: "RUS",
    label: "Russia",
  },
  {
    value: "RWA",
    label: "Rwanda",
  },
  {
    value: "ESH",
    label: "W. Sahara",
  },
  {
    value: "SAU",
    label: "Saudi Arabia",
  },
  {
    value: "SDN",
    label: "Sudan",
  },
  {
    value: "SSD",
    label: "S. Sudan",
  },
  {
    value: "SEN",
    label: "Senegal",
  },
  {
    value: "SGP",
    label: "Singapore",
  },
  {
    value: "SGS",
    label: "S. Geo. and S. Sandw. Is.",
  },
  {
    value: "SLB",
    label: "Solomon Is.",
  },
  {
    value: "SLE",
    label: "Sierra Leone",
  },
  {
    value: "SLV",
    label: "El Salvador",
  },
  {
    value: "SMR",
    label: "San Marino",
  },
  {
    value: "SOL",
    label: "Somaliland",
  },
  {
    value: "SOM",
    label: "Somalia",
  },
  {
    value: "SRB",
    label: "Serbia",
  },
  {
    value: "STP",
    label: "São Tomé and Principe",
  },
  {
    value: "SUR",
    label: "Suriname",
  },
  {
    value: "SVK",
    label: "Slovakia",
  },
  {
    value: "SVN",
    label: "Slovenia",
  },
  {
    value: "SWE",
    label: "Sweden",
  },
  {
    value: "SWZ",
    label: "Swaziland",
  },
  {
    value: "SXM",
    label: "Sint Maarten",
  },
  {
    value: "SYR",
    label: "Syria",
  },
  {
    value: "TCD",
    label: "Chad",
  },
  {
    value: "TGO",
    label: "Togo",
  },
  {
    value: "THA",
    label: "Thailand",
  },
  {
    value: "TJK",
    label: "Tajikistan",
  },
  {
    value: "TKM",
    label: "Turkmenistan",
  },
  {
    value: "TLS",
    label: "Timor-Leste",
  },
  {
    value: "TON",
    label: "Tonga",
  },
  {
    value: "TTO",
    label: "Trinidad and Tobago",
  },
  {
    value: "TUN",
    label: "Tunisia",
  },
  {
    value: "TUR",
    label: "Turkey",
  },
  {
    value: "TWN",
    label: "Taiwan",
  },
  {
    value: "TZA",
    label: "Tanzania",
  },
  {
    value: "UGA",
    label: "Uganda",
  },
  {
    value: "UKR",
    label: "Ukraine",
  },
  {
    value: "URY",
    label: "Uruguay",
  },
  {
    value: "USA",
    label: "United States",
  },
  {
    value: "USG",
    label: "USNB Guantanamo Bay",
  },
  {
    value: "UZB",
    label: "Uzbekistan",
  },
  {
    value: "VAT",
    label: "Vatican",
  },
  {
    value: "VCT",
    label: "St. Vin. and Gren.",
  },
  {
    value: "VEN",
    label: "Venezuela",
  },
  {
    value: "VNM",
    label: "Vietnam",
  },
  {
    value: "VUT",
    label: "Vanuatu",
  },
  {
    value: "WSB",
    label: "Akrotiri",
  },
  {
    value: "WSM",
    label: "Samoa",
  },
  {
    value: "YEM",
    label: "Yemen",
  },
  {
    value: "ZAF",
    label: "South Africa",
  },
  {
    value: "ZMB",
    label: "Zambia",
  },
  {
    value: "ZWE",
    label: "Zimbabwe",
  },
];
