import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaFileUpload } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { FaDeleteLeft } from "react-icons/fa6";
import * as service from "../service/productService";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchdata }) => {
  const [data, setData] = useState({
    productName: "",
    brandname: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await service.uploadProduct(data);
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoIosClose />
          </div>
        </div>
        <form
          className="grid p-4 overflow-y-scroll h-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name</label>
          <input
            className="p-2 bg-slate-200"
            type="text"
            id="productName"
            placeholder="product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="brandname">Brand Name</label>
          <input
            className="p-2 bg-slate-200"
            type="text"
            id="brandname"
            name="brandname"
            placeholder="brand name"
            value={data.brandname}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="category">Category :</label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage">Image</label>
          <div className="p-2 bg-slate-200 border rounded w-full h-32 flex justify-center items-center">
            <label htmlFor="uploadImageInput">
              <div className="flex justify-center items-center flex-col gap-2 cursor-pointer">
                <span className="text-3xl">
                  <FaFileUpload />
                </span>
                <p className="">Upload product image</p>
                <input
                  type="file"
                  className="hidden"
                  id="uploadImageInput"
                  onChange={handleUploadProduct}
                />
              </div>
            </label>
          </div>
          <div className="">
            {data.productImage[0] ? (
              <div className="flex items-center gap-1">
                {data.productImage.map((image, index) => {
                  return (
                    <div className="relative group">
                      <img
                        className=""
                        src={image}
                        alt=""
                        width={80}
                        height={80}
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(image);
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 p-1 text-red-600 hidden group-hover:block"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <FaDeleteLeft />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-purple-500 text-xs">
                Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price">Price</label>
          <input
            required
            className="p-2 bg-slate-200"
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={data.price}
            onChange={handleOnChange}
          />

          <label htmlFor="selling">Selling price</label>
          <input
            required
            className="p-2 bg-slate-200"
            type="number"
            id="selling"
            name="selling"
            placeholder="selling price"
            value={data.selling}
            onChange={handleOnChange}
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            required
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="enter product description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="o-2 bg-green-500 hover:bg-green-800 text-white m-2">
            UploadProduct
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
