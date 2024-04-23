import React, { useCallback, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as service from "../service/productService";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import displayCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandname: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const fetProductDetails = async () => {
    const dataResponse = await service.productDetails(params);
    if (dataResponse.success) {
      setLoading(false);
      setData(dataResponse.data);
      setActiveImage(dataResponse?.data?.productImage[0]);
      toast.success(dataResponse.message);
    }
    if (dataResponse.error) {
      setLoading(false);
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/*product images*/}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative">
            <img
              src={activeImage}
              alt=""
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {/*product zoom*/}
            {zoomImage && (
              <div className="absolute min-w-[400px] min-h-[400px] bg-slate-200 p1 -right-[410px] top-0">
                <div
                  className="w-full h-full min-w-[400px] min-h-[400px] mix-blend-multiply"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="">
            {loading ? (
              <PulseLoader color="#808080" />
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-auto scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imgURL}
                    >
                      <img
                        alt=""
                        src={imgURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/*product info*/}
        <div className="grid gap-1">
          <p className="text-red-600">{data?.brandname}</p>
          <p className="font-bold text-2xl">{data?.productName}</p>
          <p className="capitalize font-light">{data?.category}</p>
          <div className="flex gap-2">
            <p className="line-through text-2xl">
              {displayCurrency(data?.price)}
            </p>
            <p className="text-red-600 text-2xl">
              {displayCurrency(data?.selling)}
            </p>
          </div>
          <div className="flex gap-2 my-2">
            <button
              className="border-2 rounded border-green-600 p-2 min-w-[100px] hover:bg-green-600"
              onClick={(e) => handleBuyProduct(e, data?._id)}
            >
              Buy
            </button>
            <button
              className="border-2 rounded border-red-600 p-2 min-w-[100px] hover:bg-red-600"
              onClick={(e) => handleAddToCart(e, data?._id)}
            >
              Add To Cart
            </button>
          </div>
          <div className="">
            <p className="text-slate-600 font-medium p-1">Description:</p>
            <p className="">{data?.description}</p>
          </div>
        </div>
      </div>
      {data?.category && (
        <CategoryWiseProductDisplay
          category={data.category}
          heading={"Products of Same Category"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
