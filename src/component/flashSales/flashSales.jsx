import React, { useContext, useEffect, useRef } from "react";
import "./flashSales.css";
import Product from "../../common/product/product";
import { ProductsContext } from "../../context/ProductsContext";
import { useNavigate } from "react-router-dom";

const FlashSales = () => {
  const navigate = useNavigate();
  const deadline = new Date("Oct 25, 2027 23:59:59").getTime();

  const refDays = useRef();
  const refHours = useRef();
  const refMinutes = useRef();
  const refSeconds = useRef();

  const { products } = useContext(ProductsContext);


  const filteredProducts = products
    .slice(20, 24);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = deadline - now;

      if (timeLeft <= 0) {
        refDays.current.textContent = "0";
        refHours.current.textContent = "0";
        refMinutes.current.textContent = "0";
        refSeconds.current.textContent = "0";
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      refDays.current.textContent = days;
      refHours.current.textContent = hours;
      refMinutes.current.textContent = minutes;
      refSeconds.current.textContent = seconds;
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [deadline]);



  return (
    <div className="FlashSales mt-5">
      <section className="container mb-5">
        <div className="section-heading flash-head">
          <div>
            <p>Today’s</p>
          </div>
          <div>
            <h2>Flash Sales</h2>
            <div className="countdown flex align-center gap-2">
              <div className="time">
                <span>Days</span>
                <b ref={refDays}>00</b>
              </div>
              <span>:</span>
              <div className="time">
                <span>Hours</span>
                <b ref={refHours}>00</b>
              </div>
              <span>:</span>
              <div className="time">
                <span>Minutes</span>
                <b ref={refMinutes}>00</b>
              </div>
              <span>:</span>
              <div className="time">
                <span>Seconds</span>
                <b ref={refSeconds}>00</b>
              </div>
            </div>
          </div>
        </div>

        <div className="product-sales w-100">
          {filteredProducts.map((ele, i) => (
            <div key={i} className="cont-sale">
              <Product ele={ele} />
              <span className="sale">20%</span>
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

export default FlashSales;
