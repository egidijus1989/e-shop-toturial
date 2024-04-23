import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { MdManageSearch } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as service from "../service/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const searchInput = useLocation();
  const urlSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = urlSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const logout = async () => {
    const dataResponse = await service.logout();
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      navigate("/");
      dispatch(setUserDetails(null));
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const handleSearch = async (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to="/">
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden md:flex items-center w-full justify-center max-w-sm border rounded-full hover:shadow-md">
          <input
            type="text"
            placeholder="search product here..."
            className="outline-none w-full pl-5"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg text-white bg-slate-400 min-w-[50px] h-8 flex items-center justify-center rounded-r-full">
            <MdManageSearch />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-2xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <CiUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div
                className="absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded hidden md:block"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="admin-panel"
                      className="whitespace-nowrap hover:bg-slate-100 p-2"
                    >
                      Admin panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-2xl cursor-pointer relative">
              <span>
                <CiShoppingCart />
              </span>

              <div className="bg-red-500 text-white w-5 h-5 flex rounded-full justify-center items-center absolute -top-2 -right-3">
                <p className="text-xs">{context?.cartCount}</p>
              </div>
            </Link>
          )}
          <div className="">
            {user ? (
              <button
                className="px-2 py-1 rounded-full bg-slate-400 hover:bg-slate-600"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="px-2 py-1 rounded-full bg-slate-400 hover:bg-slate-600">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
