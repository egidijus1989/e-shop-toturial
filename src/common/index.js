const backendDomain = "http://localhost:8888";

const SummaryApi = {
  signUp: {
    ulr: `${backendDomain}/api/v1/auth/signup`,
    method: "post",
  },
  login: {
    ulr: `${backendDomain}/api/v1/auth/login`,
    method: "post",
  },
  currentUser: {
    ulr: `${backendDomain}/api/v1/auth/user-details`,
    method: "get",
  },
  logout: {
    ulr: `${backendDomain}/api/v1/auth/logout`,
    method: "get",
  },
  allUsers: {
    ulr: `${backendDomain}/api/v1/user/all-users`,
    method: "get",
  },
  updateUser: {
    ulr: `${backendDomain}/api/v1/user/update-user`,
    method: "post",
  },
  uploadProduct: {
    ulr: `${backendDomain}/api/v1/product/upload-product`,
    method: "post",
  },
  getAllProducts: {
    ulr: `${backendDomain}/api/v1/product/get-products`,
    method: "get",
  },
  updateProduct: {
    ulr: `${backendDomain}/api/v1/product/update-product`,
    method: "post",
  },
  deleteProduct: {
    ulr: `${backendDomain}/api/v1/product/delete-product`,
    method: "delete",
  },
  getcategoryProduct: {
    ulr: `${backendDomain}/api/v1/product/get-categoryProduct`,
    method: "get",
  },
  getAllProductsByCategory: {
    ulr: `${backendDomain}/api/v1/product/category-product`,
    method: "post",
  },
  productDetails: {
    ulr: `${backendDomain}/api/v1/product/product-details`,
    method: "post",
  },
  addToCart: {
    ulr: `${backendDomain}/api/v1/cart/add-to-cart`,
    method: "post",
  },
  countAddToCart: {
    ulr: `${backendDomain}/api/v1/cart/count-add-to-cart`,
    method: "get",
  },
  viewAddToCart: {
    ulr: `${backendDomain}/api/v1/cart/view-add-to-cart`,
    method: "get",
  },
  updateAddToCart: {
    ulr: `${backendDomain}/api/v1/cart/update-add-to-cart`,
    method: "post",
  },
  deleteAddToCart: {
    ulr: `${backendDomain}/api/v1/cart/delete-add-to-cart`,
    method: "post",
  },
  searchProduct: {
    ulr: `${backendDomain}/api/v1/product/search`,
    method: "get",
  },
  filterProduct: {
    ulr: `${backendDomain}/api/v1/product/filter`,
    method: "post",
  },
};

export default SummaryApi;
