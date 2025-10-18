import axios from "axios";

const API_BASE_URL = "https://backend-gules-six-47.vercel.app/api";

export const loginUser = async ({ email, password }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });

        if (response.data?.data?.token && response.data?.data?.role) {
            const { token, role } = response.data.data;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            return { token, role };
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Login API Error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Login failed" };
    }
};
