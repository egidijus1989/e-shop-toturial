const { default: SummaryApi } = require("../common");

const fetchCategoryWiseProduct = async (category) => {
  const res = await fetch(SummaryApi.getAllProductsByCategory.ulr, {
    method: SummaryApi.getAllProductsByCategory.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ category: category }),
  });
  const dataResponse = await res.json();
  return dataResponse;
};

export default fetchCategoryWiseProduct;
