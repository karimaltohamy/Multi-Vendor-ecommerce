import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useState } from "react";
import "./App.scss";
import Home from "./pages/home/Home";
const Login = React.lazy(() => import("./pages/login/Login"));
const Signup = React.lazy(() => import("./pages/signup/Signup"));
const ProductPage = React.lazy(() => import("./pages/productPage/ProductPage"));
const BestSellingPage = React.lazy(() =>
  import("./pages/bestSellingPage/BestSellingPage")
);
const EventsPage = React.lazy(() => import("./pages/eventsPage/EventsPage"));
const FAQPage = React.lazy(() => import("./pages/faqPage/FAQPage"));
const ProductDetails = React.lazy(() =>
  import("./pages/productDetails/ProductDetails")
);
const ProfilePage = React.lazy(() => import("./pages/profilePage/ProfilePage"));
const CreateShop = React.lazy(() => import("./pages/createShop/CreateShop"));
const LoginShop = React.lazy(() => import("./pages/loginShop/LoginShop"));
const ShopHomePage = React.lazy(() =>
  import("./pages/shop/shopHomePage/ShopHomePage")
);
const ShopDashboard = React.lazy(() =>
  import("./pages/shop/shopDashboard/ShopDashboard")
);
const DashboardCreateProdcut = React.lazy(() =>
  import("./pages/shop/dashboardCreateProdcut/DashboardCreateProdcut")
);
const DashboardProducts = React.lazy(() =>
  import("./pages/shop/dashboardProducts/DashboardProducts")
);

const DashboardCreateEvent = React.lazy(() =>
  import("./pages/shop/dashboard-create-event/DashboardCreateEvent")
);
const DashboardEvents = React.lazy(() =>
  import("./pages/shop/dashboardEvents/DashboardEvents")
);
const DashboardCoupons = React.lazy(() =>
  import("./pages/shop/dashboardCoupons/DashboardCoupons")
);
const CheckoutPage = React.lazy(() =>
  import("./pages/checkoutPage/CheckoutPage")
);
const DashboardOrders = React.lazy(() => import("./pages/shop/dashboardOrders/DashboardOrders")) ;
const  SuccessfullPage = React.lazy(() => import("./pages/successfulPage/SuccessfullPage")) ;
const  OrderDetails = React.lazy(() => import("./pages/orderDetails/OrderDetails")) ;
const DashboardOrderDetails = React.lazy(() => import("./pages/shop/dashboardOrderDetails/DashboardOrderDetails")) ;
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { getAllEvents } from "./redux/actions/events";
import { getUser } from "./redux/actions/user";
import Loader from "./components/loader/Loader";
import { getAllProducts } from "./redux/actions/product";
import apiAxios from "./utils/apiAxios";
const PaymentPage = React.lazy(() => import("./pages/paymentPage/PaymentPage"));
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const ProdectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);

  if (userInfo === null) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

const ProdectedShopRoute = ({ children }) => {
  const { shopInfo } = useSelector((state) => state.shop);

  if (shopInfo === null) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const stripePromise = loadStripe("pk_test_51MXOozKG4U03U9qEEk43RNLqTINvRYvsoY1Ot8dvGB8PjaLw6qOMmZapPXsY3c1MknCOhpvTCNZxgBFS9OppjINX00rsTIdB3o");


  const getStripeApiKey = async () => {
    try {
      const { data } = await apiAxios.get("/payment/stripeApiKey", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStripeApiKey(data.stripeApiKey);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvents(dispatch);
    getUser(dispatch);
    getAllProducts(dispatch);
    getStripeApiKey();
  }, []);

  return (
    <Fragment>
      {stripeApiKey && (
        <Elements stripe={stripePromise}>
          <Routes>
            <Route
              path="/Payment"
              element={
                <Suspense fallback={<Loader />}>
                  <ProdectedRoute>
                    <PaymentPage />
                  </ProdectedRoute>
                </Suspense>
              }
            />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={<Loader />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <Suspense fallback={<Loader />}>
              <ProductPage />
            </Suspense>
          }
        />
        <Route
          path="/products/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/best-selling"
          element={
            <Suspense fallback={<Loader />}>
              <BestSellingPage />
            </Suspense>
          }
        />
        <Route
          path="/events"
          element={
            <Suspense fallback={<Loader />}>
              <EventsPage />
            </Suspense>
          }
        />
        <Route
          path="/faq"
          element={
            <Suspense fallback={<Loader />}>
              <FAQPage />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedRoute>
                <ProfilePage />
              </ProdectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedRoute>
                <CheckoutPage />
              </ProdectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/successfull"
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedRoute>
                <SuccessfullPage />
              </ProdectedRoute>
            </Suspense>
          }
        />
         <Route
          path="/user/order/:id"
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedRoute>
                <OrderDetails />
              </ProdectedRoute>
            </Suspense>
          }
        />

        {/* shop routes */}
        <Route
          path="/create-shop"
          element={
            <Suspense fallback={<Loader />}>
              <CreateShop />
            </Suspense>
          }
        />
        <Route
          path="/login-shop"
          element={
            <Suspense fallback={<Loader />}>
              <LoginShop />
            </Suspense>
          }
        />
        <Route
          path={`/shop/:id`}
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedShopRoute>
                <ShopHomePage />
              </ProdectedShopRoute>
            </Suspense>
          }
        />
        <Route
          path={`/dashboard`}
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedShopRoute>
                <ShopDashboard />
              </ProdectedShopRoute>
            </Suspense>
          }
        />
        <Route
          path={`/dashboard-orders`}
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedShopRoute>
                <DashboardOrders />
              </ProdectedShopRoute>
            </Suspense>
          }
        />
        <Route
          path={`/shop/order/:id`}
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedShopRoute>
                <DashboardOrderDetails/>
              </ProdectedShopRoute>
            </Suspense>
          }
        />
        <Route
          path={`/dashboard-create-product`}
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedShopRoute>
                <DashboardCreateProdcut />
              </ProdectedShopRoute>
            </Suspense>
          }
        />
        <Route
          path={`/dashboard-products`}
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedShopRoute>
                <DashboardProducts />
              </ProdectedShopRoute>
            </Suspense>
          }
        />
        <Route
          path={`/dashboard-create-event`}
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedShopRoute>
                <DashboardCreateEvent />
              </ProdectedShopRoute>
            </Suspense>
          }
        />
        <Route
          path={`/dashboard-events`}
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedShopRoute>
                <DashboardEvents />
              </ProdectedShopRoute>
            </Suspense>
          }
        />
        <Route
          path={`/dashboard-coupons`}
          element={
            <Suspense fallback={<Loader />}>
              <ProdectedShopRoute>
                <DashboardCoupons />
              </ProdectedShopRoute>
            </Suspense>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
