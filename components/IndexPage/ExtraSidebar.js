import React from "react";
import { DownloadModule } from "@licenserocks/kit";

export const IndexExtraSidebar = ({ url }) => (
  <DownloadModule mb={6} qrCodeValue={url} />
);
