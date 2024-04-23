import React, { useContext, useEffect, useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProducts";
import { Link } from "react-router-dom";
import displayCurrency from "../helpers/displayCurrency";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const dataResponse = await fetchCategoryWiseProduct(category);
    if (dataResponse.success) {
      setData(dataResponse.data);
      setLoading(false);
    }
    if (dataResponse.error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 transition-all overflow-x-auto overflow-y-auto scrollbar-none"
        ref={scrollElement}
      >
        <button className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block">
          <FaAngleLeft onClick={scrollLeft} />
        </button>
        <button className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block">
          <FaAngleRight onClick={scrollRight} />
        </button>

        {loading ? (
          <PulseLoader color="#808080" />
        ) : (
          data?.map((product, index) => {
            return (
              <Link
                key={index}
                to={"product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    alt=""
                  />
                </div>
                <div className="p-4 grid">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayCurrency(product?.selling)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
