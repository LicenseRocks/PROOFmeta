export const getBaseUrl = (createdWith = "creatorshub") => {
  switch (createdWith) {
    case "demo":
      return `https://demo.licenserocks.de`;
    case "licensecore":
      return `https://staging.license.rocks`;
    case "pshr":
      return `https://app.nftable.xyz`;
    case "wallet":
      return `https://nft.pmr-music.com`;
    case "minty":
      return `https://minty.rocks`;
    case "twlvx12":
      return `https://marketplace.twlvxtwlv.com/`;
    case "nftable":
      return `https://app.nftable.xyz`;
    default:
      if (process.env.NODE_ENV === "development") {
        return `http://localhost:3000`;
      }
      return `https://preview-creatorshub.license.rocks`;
  }
};
