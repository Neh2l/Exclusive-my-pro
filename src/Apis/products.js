import axios from "axios";

const API_BASE_URL = "https://backend-gules-six-47.vercel.app/api";

export const getProductById = async (token, productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.data) {
            return response.data.data;
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Error fetching product details:", error.response?.data || error.message);
        throw error.response?.data || { message: "Failed to fetch product" };
    }
};
