import QRCode from "qrcode";

export default async function downloadQRCode(req, res) {
  const { id, targetUrl } = req.query;
  QRCode.toBuffer(targetUrl, (err, buffer) => {
    res.setHeader(
      "Content-disposition",
      `attachment; filename="nft-${id}.jpg"`
    );
    res.setHeader("Content-Type", "application/jpeg");
    res.status(200).end(buffer);
  });
}
