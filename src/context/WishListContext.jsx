import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const wishListContext = createContext();

const BASE_URL = "https://backend-gules-six-47.vercel.app/api";

export const WishListContextProvider = ({ children }) => {
  const [wishlistId, setWishlistId] = useState(null);
  const [proFavourite, setProFavourite] = useState([]);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setWishlistId(null);
      setProFavourite([]);
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const wishlist = res?.data?.data;

      if (wishlist) {
        setWishlistId(wishlist._id || null);
        setProFavourite(wishlist.productId || []);
      } else {
        setWishlistId(null);
        setProFavourite([]);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setWishlistId(null);
        setProFavourite([]);
      } 
    }
  };

const RemoveFromWishlist = async (productId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You must be logged in to remove from wishlist");
    return;
  }

  if (!wishlistId) {
    toast.error("Wishlist not found");
    return;
  }

  try {
    await axios.delete(`${BASE_URL}/wishlist/${wishlistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProFavourite((prev) =>
      prev.filter((product) => product._id !== productId)
    );

    toast.success(" Product removed");
    // ممكن تحتفظ بfetchWishlist لو حابب تزامن البيانات مع السيرفر
    // await fetchWishlist();
  } catch (err) {
    if (err.response?.status === 404) {
      setWishlistId(null);
      setProFavourite([]);
      toast.info("Wishlist is now empty.");
    } else {
      toast.error("Failed to remove product from wishlist");
    }
  }
};


  const AddToWishlist = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add to wishlist");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/wishlist`,
        { productId: [productId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Product added to wishlist");
      await fetchWishlist();
    } catch (err) {
      console.error("AddToWishlist error:", err.response?.data || err.message);
      toast.error("❌ Failed to add to wishlist");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchWishlist();
    }
  }, []);

  return (
    <wishListContext.Provider
      value={{ proFavourite, AddToWishlist, RemoveFromWishlist }}
    >
      {children}
    </wishListContext.Provider>
  );
};
