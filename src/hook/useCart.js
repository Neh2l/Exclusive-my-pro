import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const useCart = () => {
    const {
        cart,
        removeFromCart,
        clearCart,
        handleChangeAmount,
        addToCart,
    } = useContext(CartContext);

    const subTotall = cart?.reduce(
        (total, item) => total + item?.price * (item?.amount || 1),
        0
    );

    const cartIdies = cart?.map((item) => item._id);

    return {
        cart,
        cartIdies,
        removeFromCart,
        clearCart,
        handleChangeAmount,
        addToCart,
        subTotall,
    };
};

export default useCart;
