import React, { useContext } from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../../context/ProductsContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { categoryName, getProductsOfCategory } = useContext(ProductsContext);

  const handleGetCategory = (categoryId) => {
    getProductsOfCategory(categoryId);
    navigate("/ProductsOfCategory");
  };

  return (
    <div className="SidebarCustom">
      <div className="containerCustom">
        <ul className="sidebar-category-list">
          {categoryName.map((val, index) => (
            <div
              key={index}
              className="sidebar-cat-btn"
              onClick={() => handleGetCategory(val._id)}
            >
              <li className="m-0 m-auto">{val.title}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
