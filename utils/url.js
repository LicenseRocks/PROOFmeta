export const getBaseUrl = (createdWith = "creatorshub") => {
  switch (createdWith) {
    case "licensecore":
      return `https://staging.license.rocks`;
    case "pshr":
      return `https://nftable.xyz`;
    case "wallet":
      return `https://nft.pmr-music.com`;
    case "minty":
      return `https://minty.rocks`;
    default:
      return `https://preview-creatorshub.license.rocks`;
  }
};
