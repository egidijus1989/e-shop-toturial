import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import AdminEditProduct from "./AdminEditProduct";
import displayCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import * as service from "../service/productService";
import { toast } from "react-toastify";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  const id = data._id;

  const deleteProduct = async (e) => {
    e.preventDefault();
    const dataResponse = await service.deleteProduct(id);
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      fetchdata();
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 justify-center items-center ">
          <img
            className="object-fill mx-auto h-full"
            src={data?.productImage[0]}
            alt=""
          />
        </div>

        <h2 className="text-ellipsis line-clamp-2">
          Product: {data?.productName}
        </h2>
        <div className="font-bold">{displayCurrency(data.price)}</div>
        <div className="flex justify-between">
          <div
            className="w-fit mx-auto p-2 text-red-600 "
            onClick={deleteProduct}
          >
            <MdDelete />
          </div>
          <div
            className="w-fit mx-auto p-2 text-green-600 "
            onClick={() => setEditProduct(true)}
          >
            <FaEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
