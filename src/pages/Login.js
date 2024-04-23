import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as service from "../service/authService";
import loginIcons from "../assest/signin.gif";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const dataResponse = await service.login(data);
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-4 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>
          <form
            className=" flex flex-col justify-center gap-3 pt-6"
            onSubmit={login}
          >
            <div className="grid">
              <label className="">Email</label>
              <div className="bg-slate-200 p-2">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type="email"
                  placeholder="your email"
                  onChange={handleOnChange}
                  value={data.email}
                  name="email"
                />
              </div>
            </div>
            <div className="">
              <label className="">Password</label>
              <div className="bg-slate-200 flex p-2">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type={showPassword ? "text" : "password"}
                  placeholder="your password"
                  onChange={handleOnChange}
                  name="password"
                  value={data.password}
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button className="bg-slate-500 rounded-full px-6 py-2 w-full max-w-[150px] hover:scale-110 transition-all mx-auto">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
