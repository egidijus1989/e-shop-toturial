import { toast } from "react-toastify";
import SummaryApi from "../common";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e.preventDefault();
  try {
    const res = await fetch(SummaryApi.addToCart.ulr, {
      method: SummaryApi.addToCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });
    const dataResponse = await res.json();
    if (dataResponse.success) {
      toast.success(dataResponse.message);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }

    return dataResponse;
  } catch (err) {
    console.log(err);
  }
};

export default addToCart;
