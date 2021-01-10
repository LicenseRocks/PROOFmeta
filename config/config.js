import { RocksKitTheme } from "@licenserocks/kit";

const { NEXT_APP_DOMAIN } = process.env;

export const config = {
  appTitle: "Metaproof",
  branding: {
    logo: `${NEXT_APP_DOMAIN}/images/logo-symbol.svg`,
    logoType: `${NEXT_APP_DOMAIN}/images/logo-type.png`,
    organizationName: "license.rocks",
    organizationPhone: "+49 30 44674747",
    organizationEmail: "hello@licenserocks.de",
  },
  theme: RocksKitTheme,
};
