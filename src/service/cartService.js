import SummaryApi from "../common";
//////////////////////////////////////////////
export const countAddToCart = async () => {
  try {
    const res = await fetch(SummaryApi.countAddToCart.ulr, {
      method: SummaryApi.countAddToCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const viewAddToCart = async () => {
  try {
    const res = await fetch(SummaryApi.viewAddToCart.ulr, {
      method: SummaryApi.viewAddToCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const updateAddToCartPlus = async (id, qty) => {
  try {
    const res = await fetch(SummaryApi.updateAddToCart.ulr, {
      method: SummaryApi.updateAddToCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const updateAddToCartMinus = async (id, qty) => {
  try {
    const res = await fetch(SummaryApi.updateAddToCart.ulr, {
      method: SummaryApi.updateAddToCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty - 1,
      }),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const deleteAddToCart = async (id) => {
  try {
    const res = await fetch(SummaryApi.deleteAddToCart.ulr, {
      method: SummaryApi.deleteAddToCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
