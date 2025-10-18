import React, { useContext } from "react";
import { wishListContext } from "../../context/WishListContext";
import { MdFavorite, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./wishlist.css";

const Wishlist = () => {
  const { proFavourite, RemoveFromWishlist } = useContext(wishListContext);
  const navigate = useNavigate();

  if (!proFavourite.length) {
    return (
      <div className="wishlist-empty">
        <h2>Your wishlist is empty 💔</h2>
        <p>Start adding some amazing products you love.</p>
      </div>
    );
  }

  return (
    <div className="wishlist-wrapper">
      <h2 className="wishlist-heading">💜 Your Wishlist</h2>
      <div className="wishlist-grid">
        {proFavourite.map((product) => (
          <div className="wishlist-card" key={product._id}>
            <div className="wishlist-img">
              <img
                src={product.images?.[0]}
                alt={product.name}
                loading="lazy"
              />
              <MdFavorite className="wishlist-heart" />
            </div>
            <div className="wishlist-details">
              <h3>{product.name}</h3>
              <p>{product.description.slice(0, 60)}...</p>

              <div className="wishlist-price">
                <span>${product.price}</span>
                <button onClick={() => navigate(`/product/${product._id}`)}>
                  View Details
                </button>
              </div>

              <button
                className="wishlist-remove"
                onClick={() => RemoveFromWishlist(product._id)}
              >
                <MdDelete /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
