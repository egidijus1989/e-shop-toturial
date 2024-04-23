import React, { useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  });
  return (
    <div className="min-h-[calc(100vh-160px)] sm:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60">
        <div className="h-40 flex justify-center items-center flex-col">
          <div className="text-4xl cursor-pointer relative flex justify-center">
            {user?.profilePicture ? (
              <img
                src={user?.profilePicture}
                alt=""
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <CiUser />
            )}
          </div>
          <div className="">
            <p className="capitalize font-bold text-center">{user?.name}</p>
            <p className="capitalize font-bold text-center">{user?.role}</p>
            <p className=" font-bold text-center">{user?.email}</p>
          </div>
        </div>
        {/***navigation */}
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All product
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
