import React, { useContext } from "react";
import Product from "../../common/product/Product";
import { ProductsContext } from "../../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import "./../flashSales/flashSales.css";

const ExploreProducts = () => {
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);

  const filteredProducts = products.slice(12, 20);



  return (
    <div className="FlashSales mt-5">
      <section className="container w-100">
        <div className="section-heading">
          <div>
            <p>Our Products</p>
          </div>
          <h2>Explore Our Products</h2>
        </div>

        <div className="product-sales">
          {filteredProducts.map((ele) => (
            <div key={ele._id} className="cont-sale w-100 m-0">
              <Product ele={ele} />
            </div>
          ))}
        </div>

        <button className="btn-sale" onClick={() => navigate("/Products")}>
          View All Products
        </button>
      </section>
    </div>
  );
};

export default ExploreProducts;
