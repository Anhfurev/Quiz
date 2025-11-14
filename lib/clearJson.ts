export function cleanAndParseJSON(input: string) {
  try {
    // Remove code block markers (```json or ``` etc.)
    const cleaned = input
      .replace(/```json|```/g, "") // remove triple backticks and 'json'
      .trim();

    // Parse the cleaned string into an object
    const parsed = JSON.parse(cleaned);

    return parsed;
  } catch (error) {
    console.error("Invalid JSON format:", error);
    return null;
  }
}
