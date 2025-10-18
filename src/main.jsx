import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";


import { WishListContextProvider } from "./context/WishListContext.jsx";
import { ProductsContextProvider } from "./context/ProductsContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <ProductsContextProvider>
    <CartContextProvider>
      <WishListContextProvider>
        <App />
      </WishListContextProvider>
    </CartContextProvider>
  </ProductsContextProvider>
);
