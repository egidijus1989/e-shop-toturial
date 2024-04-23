import SummaryApi from "../common";
//////////////////////////////////////////////
export const uploadProduct = async (data) => {
  try {
    const res = await fetch(SummaryApi.uploadProduct.ulr, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const getAllProducts = async () => {
  try {
    const res = await fetch(SummaryApi.getAllProducts.ulr, {
      method: SummaryApi.getAllProducts.method,
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
export const updateProduct = async (data) => {
  try {
    const res = await fetch(SummaryApi.updateProduct.ulr, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(SummaryApi.deleteProduct.ulr, {
      method: SummaryApi.deleteProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const categoryProduct = async () => {
  try {
    const res = await fetch(SummaryApi.getcategoryProduct.ulr, {
      method: SummaryApi.getcategoryProduct.method,
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
export const productDetails = async (params) => {
  try {
    const res = await fetch(SummaryApi.productDetails.ulr, {
      method: SummaryApi.productDetails.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
