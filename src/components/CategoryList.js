import React, { useEffect, useState } from "react";
import * as service from "../service/productService";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const dataResponse = await service.categoryProduct();
    if (dataResponse.success) {
      setLoading(false);
      setCategoryProduct(dataResponse.data);
    }
    if (dataResponse.error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap items-center gap-4 justify-between scrollbar-none">
        {loading ? (
          <PulseLoader color="#808080" />
        ) : (
          categoryProduct.map((product, index) => {
            return (
              <Link
                to={"/product-category?category=" + product?.category}
                className="cursor-pointer"
                key={product?.category}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {product?.category}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryList;
