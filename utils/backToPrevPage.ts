export default function backToPrevPage() {
  const referrer = document.referrer;
  const host = document.location.host;
  const origin = document.location.origin;
  const referrerHost = referrer.split("/")[2];
  if (referrerHost === host) {
    document.location.href = referrer;
  } else {
    document.location.href = origin;
  }
}
