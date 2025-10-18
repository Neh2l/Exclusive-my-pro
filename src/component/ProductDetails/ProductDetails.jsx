import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";
import Product from "../../common/product/Product";
import { CartContext } from "../../context/CartContext";



import { FaRegHeart, FaShippingFast, FaShieldAlt } from "react-icons/fa";
import { getProductById } from "../../Apis/products";

import "./ProductDetails.css";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);

  const { id } = useParams();
  const { products } = useContext(ProductsContext);

  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdd] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let found = products.find((p) => p._id === id);

        setProduct(found);
        setMainImg(found?.images?.[0] || "");
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [products, id]);

  if (loading) return <p>Loading product...</p>;
  if (!product){
    navigate("/");
  };

  const previewImages =
    product?.images?.length > 0
      ? product.images.slice(0, 4)
      : [product.images, product.images, product.images, product.images];

  const related = products.filter(
    (p) => p.category === product.category && p._id !== product._id
  );
  function handleAdd() {

    addToCart({ ...product, quantity: count });
    setAdd(true);
    setTimeout(() => setAdd(false), 2000);


  }
  return (
    <div className="product-details-page py-5 my-5">
      <div className="product-section">
        <div className="gallery">
          {previewImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={product?.title || "product"}
              className={`thumb ${mainImg === img ? "active" : ""}`}
              onClick={() => setMainImg(img)}
            />
          ))}
        </div>

        <div className="main-image">
          <img src={mainImg} alt={product?.title || "product"} />
        </div>

        <div className="details">
          <h2 className="title">{product?.name || "No Title"}</h2>
          <h3 className="price">${product?.price || 0}</h3>
          <p className="desc">{product?.description || "No description"}</p>

          <div className="quantity">
            <button onClick={() => setCount(count > 1 ? count - 1 : 1)}>
              -
            </button>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>

          <div className="actions">
            <button className="cart" onClick={handleAdd}>
              {added ? "Added to cart!" : "Add to Cart"}
            </button>
            <button className="fav">
              <FaRegHeart />
            </button>
          </div>

          <div className="extra">
            <div className="service">
              <FaShippingFast className="icon" />
              <div>
                <h4>Fast Delivery</h4>
                <p>
                  Get your order delivered within 2-5 business days with full
                  tracking information available.
                </p>
              </div>
            </div>

            <div className="service">
              <FaShieldAlt className="icon" />
              <div>
                <h4>Quality Guarantee</h4>
                <p>
                  All our products come with a full quality guarantee covering
                  any manufacturing defects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default ProductDetails;
