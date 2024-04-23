import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import * as service from "../service/productService";
import { toast } from "react-toastify";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    const dataResponse = await service.getAllProducts();
    if (dataResponse.success) {
      setAllProducts(dataResponse?.data || []);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div>
      <div className="bg-white p-2 flex justify-between items-center">
        <h2 className="">All products</h2>
        <button
          className="p-2 border rounded-full border-green-600 hover:bg-green-600 transition-all"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      <div className="flex items-center flex-wrap gap-5 py-4 overflow-y-scroll">
        {allProducts.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProducts}
            />
          );
        })}
      </div>
      {/*Open upload modal */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchdata={fetchAllProducts}
        />
      )}
    </div>
  );
};

export default AllProducts;
