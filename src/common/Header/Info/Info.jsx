import React from 'react'
import './info.css'
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
const Info = () => {
  return (
    <div className="Info">
      <div className="container">
        <div>
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <Link to="/products">ShopNow</Link>
        </div>

        <div>
          <p>English</p>
          <IoIosArrowDown />
        </div>
      </div>
    </div>
  );
}

export default Info