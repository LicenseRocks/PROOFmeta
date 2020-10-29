export default function absoluteUrl(req, localhostAddress = "localhost:3000") {
  let host =
    (req?.headers ? req.headers.host : window.location.host) ||
    localhostAddress;
  let protocol = /^localhost(:\d+)?$/.test(host) ? "http:" : "https:";

  if (
    req &&
    req.headers["x-forwarded-host"] &&
    typeof req.headers["x-forwarded-host"] === "string"
  ) {
    host = req.headers["x-forwarded-host"];
  }

  if (
    req &&
    req.headers["x-forwarded-proto"] &&
    typeof req.headers["x-forwarded-proto"] === "string"
  ) {
    protocol = `${req.headers["x-forwarded-proto"]}:`;
  }

  const origin = `${protocol}//${host}`;

  return {
    fullPath: origin + req?.url,
    protocol,
    host,
    origin,
  };
}
