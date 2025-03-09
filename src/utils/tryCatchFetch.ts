/** @format */

export const tryCatchFetch = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response | null> => {
  try {
    const response = await fetch(input, init);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response; // Returns Response object like normal fetch
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // Return null to indicate failure
  }
};
