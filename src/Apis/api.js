import axios from "axios";

const API_BASE_URL = "https://backend-gules-six-47.vercel.app/api";

// USERS

export const getAllUsers = async (token, page = 1) => {
    const response = await axios.get(`${API_BASE_URL}/users/allusers?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getUserIds = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/users/usersId`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export default async function ResendEmail(email) {
    try {
        const req = await fetch(`${API_BASE_URL}/users/resend`, {
            method: 'POST',
            body: JSON.stringify(email),
            headers: { "Content-Type": "application/json" }
        });
        if (!req.ok) {
            throw new Error(`Error: ${req.status}`);
        }
        const responseData = await req.json();
        console.log("Response:", responseData);
        return responseData;
    } catch (error) {
        console.error("Request failed:", error.message);
        return null;
    }
}

export const changeUserRole = async (token, id, newRole) => {
    const response = await axios.put(
        `${API_BASE_URL}/users/changerole`,
        { id, newRole },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const deleteUser = async (token, id) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// PRODUCTS

export const getProducts = async (token, page = 1) => {
    return await axios.get(`${API_BASE_URL}/products?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const addProduct = async (token, productData) => {
    const response = await axios.post(`${API_BASE_URL}/products`, productData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateProduct = async (token, productId, updatedData) => {
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteProduct = async (token, productId) => {
    const response = await axios.delete(`${API_BASE_URL}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteProductImages = async (token, productId, images) => {
    const response = await axios.delete(`${API_BASE_URL}/products/${productId}/images`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { images },
    });
    return response.data;
};

// CATEGORIES

export const getCategories = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const addCategory = async (token, categoryData) => {
    const response = await axios.post(`${API_BASE_URL}/categories`, categoryData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateCategory = async (token, categoryId, updatedData) => {
    const response = await axios.put(`${API_BASE_URL}/categories/${categoryId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteCategory = async (token, categoryId) => {
    const response = await axios.delete(`${API_BASE_URL}/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// CONTACTS / MESSAGES

export const getContacts = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteContact = async (token, contactId) => {
    const response = await axios.delete(`${API_BASE_URL}/contact/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
