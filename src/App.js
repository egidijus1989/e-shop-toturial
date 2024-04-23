import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import * as service from "./service/authService";
import * as serviceCart from "./service/cartService";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await service.fetchUserDetails();
    if (dataResponse.success) {
      dispatch(setUserDetails(dataResponse.data));
    }
  };
  const fetchUserAddToCart = async () => {
    const dataResponse = await serviceCart.countAddToCart();
    if (dataResponse.success) {
      setCartCount(dataResponse.data.count);
    }
  };
  useEffect(() => {
    /*user details*/
    fetchUserDetails();
    /*cart details*/
    fetchUserAddToCart();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user details
          cartCount, //cart details
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-1">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
