import React, { useEffect, useState } from "react";
import * as service from "../service/userService";
import { toast } from "react-toastify";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    email: "",
    name: "",
    role: "",
    userId: "",
  });

  const fetchAllUsers = async () => {
    const dataResponse = await service.allUsers();
    if (dataResponse.success) {
      toast.success("All users uploaded");
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable table-fixed">
        <thead>
          <tr className="bg-black text-white text-center">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {allUsers.map((user, index) => {
            return (
              <tr className="text-center">
                <td>{index + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{moment(user?.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="text-green-700"
                    onClick={() => {
                      setUpdateUser(user);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUser.name}
          email={updateUser.email}
          role={updateUser.role}
          userId={updateUser._id}
          callFunction={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
