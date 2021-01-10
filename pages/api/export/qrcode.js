import QRCode from "qrcode";
import absoluteUrl from "utils/absoluteUrl";

export default async function downloadQRCode(req, res) {
  const { id } = req.query;
  const url = absoluteUrl(req).fullPath;
  QRCode.toBuffer(url, (err, buffer) => {
    res.setHeader(
      "Content-disposition",
      `attachment; filename="nft-${id}.jpg"`
    );
    res.setHeader("Content-Type", "application/jpeg");
    res.status(200).end(buffer);
  });
}
