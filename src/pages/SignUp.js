import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as service from "../service/authService";
import loginIcons from "../assest/signin.gif";
import imageToBase64 from "../helpers/imageToBase64";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const signup = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await service.signup(data);
      if (dataResponse.success) {
        toast.success(dataResponse.message);
        navigate("/login");
      }
      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePicture: imagePic,
      };
    });
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-4 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePicture || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form
            className=" flex flex-col justify-center gap-3 pt-6"
            onSubmit={signup}
          >
            <div className="grid">
              <label className="">Name</label>
              <div className="bg-slate-200 p-2">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type="text"
                  placeholder="your name"
                  onChange={handleOnChange}
                  value={data.name}
                  name="name"
                />
              </div>
            </div>
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
            </div>
            <div className="">
              <label className="">Confirm Password</label>
              <div className="bg-slate-200 flex p-2">
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="your password"
                  onChange={handleOnChange}
                  name="confirmPassword"
                  value={data.confirmPassword}
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-slate-500 rounded-full px-6 py-2 w-full max-w-[150px] hover:scale-110 transition-all mx-auto">
              Sign Up
            </button>
          </form>
          <p className="my-5">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
