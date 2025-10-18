import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";
import "./browseCategory.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BrowseCategory = () => {
  const navigate = useNavigate();
  const { categoryName, getProductsOfCategory } = useContext(ProductsContext);

  const handleGetCategory = (categoryId) => {
    getProductsOfCategory(categoryId);
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="BrowseCategory my-5">
      <div className="container">
        <div className="section-heading">
          <div>
            <p>Categories</p>
          </div>
          <h2>Browse By Category</h2>
        </div>

        <Swiper
          className="mySwiper"
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          speed={1000}
          pagination={{ clickable: true }}
          modules={[Autoplay,Pagination]}
          autoplay={{
            delay:1000,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {categoryName.map((val, index) => (
            <SwiperSlide key={index}>
              <div
                className="cat-btn"
                onClick={() => handleGetCategory(val._id)}
              >
                <p className="m-0 m-auto">{val.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrowseCategory;
