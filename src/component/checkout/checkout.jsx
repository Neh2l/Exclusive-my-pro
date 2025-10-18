import { useState } from "react";
import "./Checkout.css";

export default function Checkout() {
  const [payment, setPayment] = useState("");

  return (
    <div className="checkout">
      {/* Billing Details */}
      <div className="billing">
        <h2>Billing Details</h2>
        <form>
          <label>
            First Name*
            <input type="text" required />
          </label>
          <label>
            Company Name
            <input type="text" />
          </label>
          <label>
            Street Address*
            <input type="text" required />
          </label>
          <label>
            Apartment, floor, etc. (optional)
            <input type="text" />
          </label>
          <label>
            Town/City*
            <input type="text" required />
          </label>
          <label>
            Phone Number*
            <input type="text" required />
          </label>
          <label>
            Email Address*
            <input type="email" required />
          </label>

          <div className="save-info">
            <input type="checkbox" id="save" />
            <label htmlFor="save">
              Save this information for faster check-out next time
            </label>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="summary">
        <h2>Your Order</h2>

        <div className="product">
          <img src="//" alt="LCD Monitor" />
          <span>LCD Monitor</span>
          <span>$650</span>
        </div>
        <div className="product">
          <img src="//" alt="Gamepad" />
          <span>H1 Gamepad</span>
          <span>$1100</span>
        </div>

        <div className="price-row">
          <span>Subtotal:</span>
          <span>$1750</span>
        </div>
        <div className="price-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="price-row total">
          <span>Total:</span>
          <span>$1750</span>
        </div>

        {/* Payment Options */}
        <div className="payment">
          <label className={payment === "bank" ? "active" : ""}>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={payment === "bank"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Bank
            <span className="checkmark">✔</span>
          </label>

          <label className={payment === "cash" ? "active" : ""}>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={payment === "cash"}
              onChange={(e) => setPayment(e.target.value)}
            />
            Cash on delivery
            <span className="checkmark">✔</span>
          </label>
        </div>

        {/* Coupon Code */}
        <div className="coupon">
          <input type="text" placeholder="Coupon Code" />
          <button>Apply Coupon</button>
        </div>

        {/* Place Order Button */}
        <button className="place-order">Place Order</button>
      </div>
    </div>
  );
}
