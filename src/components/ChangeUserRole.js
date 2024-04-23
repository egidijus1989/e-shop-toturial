import React, { useState } from "react";
import ROLE from "../common/role";
import { IoIosClose } from "react-icons/io";
import * as service from "../service/userService";
import { toast } from "react-toastify";

const ChangeUserRole = ({
  name,
  email,
  role,
  onClose,
  userId,
  callFunction,
}) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const dataResponse = await service.updateUser(userId, userRole);
    if (dataResponse.success) {
      toast.success("user updated");
      onClose();
      callFunction();
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full g-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-40">
      <div className="mx-auto p-4 w-full max-w-sm border">
        <button className="block ml-auto" onClick={onClose}>
          <IoIosClose />
        </button>
        <h2 className="pb-4">Change user role</h2>
        <p className="">Name: {name}</p>
        <p className="">Email: {email}</p>
        <div className="flex items-center justify-between my-4">
          <p className="">Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block bg-red-500 p-2 rounded-full"
          onClick={updateUserRole}
        >
          Change role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
