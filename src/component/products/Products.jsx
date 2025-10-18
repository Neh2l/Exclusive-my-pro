import React, { useContext } from "react";
import "./products.css";
import Product from "../../common/product/Product";
import { useLocation, Link } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";
import { CartContext } from "../../context/CartContext";

const Products = () => {
  const location = useLocation();
  const { products, handelSortingData, sort } = useContext(ProductsContext);
  const { cartTitles } = useContext(CartContext);

  const isLoading = !products || products.length === 0;

  const productsFullInfo = products?.map((pro) => {
    let findedObjectWithAmount = cartTitles?.find(
      (el) =>
        Object.keys(el)[0].toLowerCase().trim() ===
        pro?.name?.toLowerCase().trim()
    );
    if (findedObjectWithAmount) {
      return {
        ...pro,
        amount: findedObjectWithAmount[pro.name],
      };
    } else {
      return {
        ...pro,
        amount: 0,
      };
    }
  });

  // Create 8 fake skeletons
  const skeletonArray = Array.from({ length: 8 });

  return (
    <div className="Products">
      <div className="pageHeading d-flex mt-5 w-25 ">
        <Link to="/" className=" me-1">
          Home
        </Link>
        <span className="active ">{location.pathname}</span>
      </div>

      <div className="container">
        <div className="sort-products">
          <span>Sort by : </span>
          <select
            value={sort}
            onChange={handelSortingData}
            className="form-select py-1"
          >
            <option value="Default">Default</option>
            <option value="Price(high:low)">Price(high-low)</option>
            <option value="Price(low:high)">Price(low-high)</option>
            <option value="Name(A-Z)">Name(A-Z)</option>
            <option value="Name(Z-A)">Name(Z-A)</option>
          </select>
        </div>
      </div>

      <div className="container-all-products py-3">
        {isLoading
          ? skeletonArray.map((_, index) => (
              <div key={index} className="product-wrapper">
                <div className="skeleton-card" />
              </div>
            ))
          : productsFullInfo.map((ele, index) => (
              <div key={index} className="product-wrapper">
                <Product ele={ele} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Products;
