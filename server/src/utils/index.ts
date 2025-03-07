export function extractSpreadsheetId(url: string): string | null {
  try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/");
      return pathParts[3] || null;
  } catch (error) {
      return null;
  }
}