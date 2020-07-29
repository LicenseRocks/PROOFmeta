import React from "react";
import Head from "next/head";
import { ExplorerLayout } from "rockskit";

import {
  IndexContent,
  IndexExtraContent,
  IndexExtraSidebar,
  IndexSidebar,
} from "components";

export default function Home() {
  return (
    <>
      <Head>
        <title>license.rocks | MetaProof</title>
      </Head>
      <ExplorerLayout
        content={IndexContent}
        extraContent={IndexExtraContent()}
        extraSidebar={IndexExtraSidebar}
        sidebar={IndexSidebar}
      />
    </>
  );
}
