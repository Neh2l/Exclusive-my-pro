import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./cart.css";
import { useLocation, Link } from "react-router-dom";


function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;
  const location = useLocation();


  if (cart.length === 0) {
    return (
      <>
        <div className="pageHeading p-5 d-flex">
          <Link to="/" className="nav-link">
            Home
          </Link>
          /<span className="active">{location.pathname.slice(1)}</span>
        </div>
        <div className="cart-page">
          <h2>Shopping Cart</h2>
          <p>Your cart is empty.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pageHeading p-5 d-flex">
        <Link to="/" className="nav-link">
          Home
        </Link>
        /<span className="active">{location.pathname.slice(1)}</span>
      </div>
      <div className="cart-page">
        <h2>Shopping Cart</h2>

        <div className="cart-layout">
          <div className="cart-table">
            <div className="cart-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>

            {cart.map((item) => (
              <div className="cart-row" key={item.id}>
                <div className="product-info">
                  <img src={item.thumbnail || "https://via.placeholder.com/100"} alt={item.title} />
                  <p>{item.title}</p>
                </div>
                <p>${item.price}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                />
                <p>${item.price * item.quantity}</p>
                <button className="remove_item" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-buttons">
              <button className="btn-outline" onClick={clearCart}>Clear Cart</button>
            </div>
          </div>

          <div className="cart-summary">
            <h3>Cart Total</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>`{shipping === 0 ? "Free" : $`${shipping}`}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button className="btn-checkout">Proceed to Checkout</button>
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