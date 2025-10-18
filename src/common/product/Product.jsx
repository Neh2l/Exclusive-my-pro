import React, { useContext, useEffect, useRef } from "react";
import "./product.css";
import Process from "./Process";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CartContext } from "../../context/CartContext"; 
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useAnimation } from "framer-motion";

const Product = ({ ele }) => {
  const { addToCart, cart } = useContext(CartContext); 

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animate = useAnimation();

  useEffect(() => {
    if (isInView) {
      animate.start("visible");
    }
  }, [isInView, animate]);

  const cartItem = cart.find((item) => item._id === ele._id);
  const amountInCart = cartItem ? cartItem.amount : 0;

  const left = ele?.stock - amountInCart;

  return (
    <motion.div
      className="container-card"
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={animate}
      transition={{ duration: 0.9, delay: 0.2 }}
      ref={ref}
    >
      <div className="container-card-img">
        <img
          src={ele?.images?.[0] || ele?.img}
          alt={ele?.name || "product"}
          className="product-image"
        />
        <Process productId={ele?._id || ele?.id} />
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(ele?._id || ele?.id)}
          disabled={left <= 0}
        >
          Add to Cart
        </button>
      </div>

      <div className="container-card-details p-2">
        <h2 className="product-title">
          {ele?.name ? ele.name.split(" ").slice(0, 3).join(" ") : ""}
        </h2>

        <div className="product-info-row">
          <p className="product-price m-0">
            <span>{ele?.price}$</span>
            <del>{ele?.price + 100}$</del>
          </p>
        </div>

        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
            <FaRegStar />
          </div>
          <p className="product-stock m-0">({left}) left</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
