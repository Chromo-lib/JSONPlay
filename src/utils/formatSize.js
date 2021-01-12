export default function formatSize(bytes) {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KiB";
  else return (bytes / 1048576).toFixed(2) + " MiB";
}