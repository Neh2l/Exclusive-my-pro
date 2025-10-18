import React, { useContext, useEffect } from "react";
import "./productsOfCat.css";
import { useLocation, useParams, Link } from "react-router-dom";
import Product from "../../common/product/Product";
import { ProductsContext } from "../../context/ProductsContext";

const ProductsOfCategory = () => {
  const location = useLocation();
  const { categoryId } = useParams();

  const { productsOfCategory, getProductsOfCategory } =
    useContext(ProductsContext);

  useEffect(() => {
    if (categoryId) {
      getProductsOfCategory(categoryId);
    }
  }, [categoryId]);

  return (
    <div className="ProductsOfCat">
      <div className="pageHeading p-5">
        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
          Home
        </Link>
        /<span className="active">products of {location.pathname.slice(1,9)}</span>
      </div>

      <div className="container-all-products p-3 m-3">
        {productsOfCategory.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          productsOfCategory.map((ele, index) => (
            <div className="product-wrapper" key={index}>
              <Product ele={ele} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsOfCategory;
