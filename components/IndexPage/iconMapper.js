import stringSimilarity from "string-similarity";
import { Icons } from "theme/icons";

export default (property) => {
  let bestMatch;
  switch (property) {
    case "amount":
    case "amountOfThisGood":
      return "folder";
    case "price":
      return "euro-sign";
    case "storageOption":
      return "check-double";
    case "creatorPublicKey":
      return "key";
    case "transactionId":
      return "info-circle";
    default:
      bestMatch = stringSimilarity.findBestMatch(property, Object.keys(Icons))
        .bestMatch.target;

      if (bestMatch.startsWith("fab")) bestMatch = bestMatch.slice(3);
      if (bestMatch.startsWith("fa")) bestMatch = bestMatch.slice(2);

      return bestMatch.charAt(0).toLowerCase() + bestMatch.slice(1);
  }
};
