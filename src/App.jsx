import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
const Layout =lazy(()=>import("./layout/Layout"))
const Home =lazy(()=>import("./component/home/Home"))
const Cart=lazy(()=>import("./component/cart/Cart"))
const About = lazy(() =>import("./component/about/About"));
const Contact =lazy(()=>import("./component/contact/Contact"))
const SignUp =lazy(()=>import("./component/signup/Signup"))
const Wishlist =lazy(()=>import("./component/wishlist/Wishlist"))
const Login =lazy(()=>import("./component/login/login"))
const ProductsOfCategory =lazy(()=>import("./component/productsOfCategory/ProductsOfCategory"))
import NotFound from "./component/error404/notfound";
import Checkout from "./component/checkout/checkout";
const Account =lazy(()=>import("./component/account/account"))
const Products =lazy(()=>import("./component/products/Products"))
const ProductDetails=lazy(()=>import("./component/ProductDetails/ProductDetails"))
const AdminDashboard=lazy(()=>import("./component/adminDashboard/AdminDashboard"))
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Resend from "./component/Resend";
import LottiHandeler from "./common/lottihandeler/LottiHandeler";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<LottiHandeler ststue="main" />}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<LottiHandeler ststue="comp" />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "carts",
          element: (
            <Suspense fallback={<LottiHandeler ststue="comp" />}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<LottiHandeler ststue="comp" />}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<LottiHandeler ststue="comp" />}>
              <Contact />
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Suspense fallback={<LottiHandeler ststue="comp" />}>
              <Wishlist />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<LottiHandeler ststue="comp" />}>
              <SignUp />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<LottiHandeler ststue="comp" />}>
              <Login />
            </Suspense>
          ),
        },
        { path: "checkout", element: <Checkout /> },
        {
          path: "products",
          element: (
            <Suspense fallback={<LottiHandeler ststue="comp" />}>
              <Products />
            </Suspense>
          ),
        },
        {
          path: "category/:categoryId",
          element: (
            <Suspense fallback={<LottiHandeler ststue="comp" />}>
              <ProductsOfCategory />
            </Suspense>
          ),
        },
        { path: "account", element: <Account /> },
        {
          path: "product/:id",
          element: (
            <Suspense fallback={<LottiHandeler ststue="comp" />}>
              <ProductDetails />
            </Suspense>
          ),
        },
        { path: "admin", element: <AdminDashboard /> },
        { path: "reemail", element: <Resend /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  );
};

export default App;
