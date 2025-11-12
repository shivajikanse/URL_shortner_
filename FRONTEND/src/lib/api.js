const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const createShortURL = async (fullUrl) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ full_url: fullUrl }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to shorten URL");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error creating short URL:", error);
    throw error;
  }
};
