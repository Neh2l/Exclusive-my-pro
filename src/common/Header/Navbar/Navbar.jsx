import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import logo from "./../../../assets/images/Logo.png";
import { HiDotsVertical } from "react-icons/hi";
import { ProductsContext } from "../../../context/ProductsContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);

 const filteredProducts =
   searchTerm.trim() === ""
     ? []
     : products.filter((product) =>
         product.name.toLowerCase().includes(searchTerm.toLowerCase())
       );

 const handleSearchSelect = (id, name) => {
   navigate(`/product/${id}`);
   setSearchTerm(name);
   setShowDropdown(false);
 };
 
   const handleLogout = () => {
     localStorage.removeItem("token");
     localStorage.removeItem("role");
   };



  return (
    <div className="Navbar">
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
          <button className="menu-toggle" onClick={toggleMenu}>
            <HiDotsVertical />
          </button>
        </div>

        <ul className={menuOpen ? "active" : ""}>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        </ul>

        <div className="search-cart-wishlist">
          <div className="search">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => searchTerm && setShowDropdown(true)}
            />
            <FaSearch className="search-icon" />

            {showDropdown && filteredProducts.length > 0 && (
              <div className="search-dropdown">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="search-item"
                    onClick={() =>
                      handleSearchSelect(product._id, product.name)
                    }
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="icons-page">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "act-icons active" : "act-icons"
              }
            >
              <FaCartShopping />
            </NavLink>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive ? "act-icons active" : "act-icons"
              }
            >
              <MdFavoriteBorder />
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "act-icons active" : "act-icons"
              }
            >
              <FaUserAlt />
            </NavLink>
            <button navigate="/" className="login-link" onClick={handleLogout}>
              logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
