import React, { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { wishListContext } from "../../context/WishListContext";

function Process({ productId }) {
  const navigate = useNavigate();
  const { AddToWishlist } = useContext(wishListContext);

  const handleAddToWishlist = () => {
    if (productId) {
      AddToWishlist(productId);
    }
    console.log("Product ID to add:", productId);
  };

  return (
    <div className="product-icons">
      <button onClick={handleAddToWishlist}>
        <FaRegHeart />
      </button>

      <button onClick={() => navigate(`/product/${productId}`)}>
        <BiShowAlt />
      </button>
    </div>
  );
}

export default Process;
