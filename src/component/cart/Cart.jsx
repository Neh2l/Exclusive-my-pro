// src/pages/Cart.jsx
import "./cart.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import useCart from "../../hook/useCart";

function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    handleChangeAmount,
    subTotall,
  } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <>
      <div className="pageHeading d-flex pt-5 w-25">
        <Link to="/" className="me-1">
          Home
        </Link>
        <span className="active">{location.pathname}</span>
      </div>
      <div className="cart-page">
        <h2>Shopping Cart</h2>

        <div className="cart-layout">
          <div className="cart-table">
            <div className="cart-header">
              <span>Product</span>
              <span>Price</span>
              <span className="mx-4">Quantity</span>
              <span>Subtotal</span>
              <span>Left</span>
            </div>

            {cart?.map((item) => {
              const options = Array(item?.stock)
                .fill(0)
                .map((_, i) => (
                  <option value={i + 1} key={i + 1}>
                    {i + 1}
                  </option>
                ));

              

              return (
                <div className="cart-row" key={item?._id}>
                  <div className="product-info">
                    <img src={item?.images?.[0]} alt={item?.name} />
                    <p>{item?.name}</p>
                  </div>
                  <p className="m-0">${item?.price}</p>
                  <select
                    value={item?.amount}
                    onChange={(e) => handleChangeAmount(e, item._id)}
                    className="mx-4"
                  >
                    {options}
                  </select>
                  <p className="m-0">
                    ${(item?.price * item?.amount).toFixed(2)}
                  </p>
                 
                  <div
                    className="trash"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <MdDeleteForever />
                  </div>
                </div>
              );
            })}

            <div className="cart-buttons">
              <button className="btn btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          <div className="cart-summary">
            <h3>Cart Total</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subTotall?.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>$99.00</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>${(subTotall + 99).toFixed(2)}</span>
            </div>
            <button
              className="btn-checkout"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

        <div className="coupon">
          <input type="text" placeholder="Coupon Code" />
          <button className="btn-apply">Apply Coupon</button>
        </div>
      </div>
    </>
  );
}

export default Cart;
