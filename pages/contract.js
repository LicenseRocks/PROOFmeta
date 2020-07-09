import React from "react";
import { getLicenseInfo } from "../utils/ethereum";

function Contract({ license, fileURIs, id, errMsg }) {
  console.log("license", license);
  console.log("fileURIs", fileURIs);
  console.log("id", id);
  console.log("errMsg", errMsg);

  return <div>test</div>;
}

export async function getServerSideProps({ query }) {
  // Call smart contract to get files array on server side
  const { id } = query;
  const { license, fileURIs, errMsg } = await await getLicenseInfo(id);

  return {
    props: {
      license,
      fileURIs,
      errMsg,
      id,
    },
  };
}

export default Contract;
