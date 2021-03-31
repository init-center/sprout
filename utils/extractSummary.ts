import stripTags from "striptags";

export default function extractSummary(
  content: string,
  len = 100,
  retainTitle = false
): string {
  if (!retainTitle) {
    content = content.replace(/<[hH]([1-6])\s+.*?>.*?<\/[hH]\1>/gi, "");
  }
  return (stripTags(content).slice(0, len) + "...").replace(/[\r\n]/g, "");
}
