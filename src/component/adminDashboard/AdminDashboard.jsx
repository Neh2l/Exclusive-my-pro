import React, { useState } from "react";
import ProductsPanel from "./../panels/productspanal/ProductsPanal";
import UsersPanel from "./../panels/userpanal/UserPanel";
import CategoriesPanel from "./../panels/catpanal/CategoriesPanel";
import MessagesPanel from "./../panels/massagepanal/MessagesPanel";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="container my-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "categories" ? "active" : ""}`}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            Messages
          </button>
        </li>
      </ul>

      <div className="mt-4">
        {activeTab === "products" && <ProductsPanel />}
        {activeTab === "users" && <UsersPanel />}
        {activeTab === "categories" && <CategoriesPanel />}
        {activeTab === "messages" && <MessagesPanel />}
      </div>
    </div>
  );
};

export default AdminDashboard;
