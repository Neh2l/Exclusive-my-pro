import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ProductsContext } from "./ProductsContext";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { products } = useContext(ProductsContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id) => {
    const product = products.find((p) => p._id === id);
    if (!product) return;

    const existingItem = cart.find((item) => item._id === id);
    const currentAmount = existingItem ? existingItem.amount : 0;
    const availableStock = product.stock - currentAmount;

    if (availableStock <= 0) {
      toast.warning("No more stock available");
      return;
    }

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item._id === id ? { ...item, amount: item.amount + 1 } : item
      );
      setCart(updatedCart);
      toast.success(
        `add ${product?.name ? product.name.split(" ").slice(0, 2).join(" ") : ""}`
      );
    } else {
      setCart([...cart, { ...product, amount: 1 }]);
      Swal.fire({
        title: `${
          product?.name ? product.name.split(" ").slice(0, 2).join(" ") : ""
        }added to your cart!`,
        icon: "success",
        showConfirmButton: false,
        timer: 1400,
      });
    }
  };

  const removeFromCart = (id) => {
    const item = cart.find((item) => item._id === id);
    if (!item) return;

    if (item.amount > 1) {
      const updatedCart = cart.map((el) =>
        el._id === id ? { ...el, amount: el.amount - 1 } : el
      );
      setCart(updatedCart);
      toast.info(
        `Remove ${
          item?.name ? item.name.split(" ").slice(0, 2).join(" ") : ""
        }`
      );
    } else {
      Swal.fire({
        title: `Are you sure you want to remove ${
          item?.name ? item.name.split(" ").slice(0, 2).join(" ") : ""
        }?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setCart(cart.filter((el) => el._id !== id));
          Swal.fire({
            title: "Removed!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    }
  };

  const clearCart = () => {
    Swal.fire({
      title: "Clear entire cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        toast.success("Cart cleared!");
      }
    });
  };

  const handleChangeAmount = (e, id) => {
    const val = +e.target.value;
    const item = cart.find((el) => el._id === id);
    if (!item) return;

    const product = products.find((p) => p._id === id);
    if (!product) return;


    const otherItemsAmount =
      cart
        .filter((el) => el._id === id)
        .reduce((acc, el) => acc + el.amount, 0) - item.amount;

    const availableStock = product.stock - otherItemsAmount;

    if (val > availableStock) {
      toast.warning("Not enough stock");
      return;
    }

    if (val < 1) {
      toast.warning("cannot be less than 1");
      return;
    }

    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, amount: val } : item
    );
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        handleChangeAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
