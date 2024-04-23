import SummaryApi from "../common";
//////////////////////////////////////////////
export const searchProduct = async (queryResult) => {
  try {
    const res = await fetch(SummaryApi.searchProduct.ulr + queryResult, {
      method: SummaryApi.searchProduct.method,
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
export const filterProduct = async (filterCategoryList) => {
  try {
    const res = await fetch(SummaryApi.filterProduct.ulr, {
      method: SummaryApi.filterProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ category: filterCategoryList }),
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
