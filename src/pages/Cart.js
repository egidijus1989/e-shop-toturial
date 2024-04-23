import React, { useContext, useEffect, useState } from "react";
import * as service from "../service/cartService";
import { toast } from "react-toastify";
import Context from "../context";
import displayCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartCount).fill(null);

  const fetchData = async () => {
    const dataResponse = await service.viewAddToCart();
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      setData(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
      setLoading(false);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const dataResponse = await service.updateAddToCartPlus(id, qty);

    if (dataResponse.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    const dataResponse = await service.updateAddToCartMinus(id, qty);

    if (dataResponse.success) {
      fetchData();
    }
  };

  const deleteCartProduct = async (id) => {
    const dataResponse = await service.deleteAddToCart(id);
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      fetchData();
      context.fetchUserAddToCart();
    }
    if (dataResponse.error) {
      toast.error("Failed to delete");
    }
  };

  const totalQuantity = data.reduce(
    (prev, current) => prev + current.quantity,
    0
  );
  const totalSum = data.reduce(
    (prev, current) => prev + current.quantity * current?.productId?.selling,
    0
  );
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg p-2 m-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/***view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        alt=""
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/**delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayCurrency(product?.productId?.selling)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayCurrency(
                            product?.productId?.selling * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/***Total product  */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-slate-200 border border-slate-300 gap-3 flex flex-col">
              <h2 className="text-white bg-slate-600 p-4">Total</h2>
              <div className="flex justify-between items-center px-4">
                <p className="">Quantity:</p>
                <p className="font-bold">{totalQuantity}</p>
              </div>
              <div className="flex justify-between items-center px-4">
                <p className="">Sum:</p>
                <p className="font-bold">{displayCurrency(totalSum)}</p>
              </div>
              <button className="bg-blue-600 text-white px-2 hover:scale-y-110">
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
