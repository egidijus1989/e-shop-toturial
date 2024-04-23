import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as service from "../service/searchAndShortService";
import VerticalCard from "../components/VerticalCart";

const SearchProduct = () => {
  const query = useLocation();
  const queryResult = query.search;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchProduct = async () => {
    setLoading(true);
    const dataResponse = await service.searchProduct(queryResult);
    setData(dataResponse.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchProduct();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      {loading && <div className="text-lg text-center">Loading...</div>}
      <p className="text-lg font-semibold my-3">
        Search Results : {data.length}
      </p>
      {data.length === 0 && !loading && (
        <div className="bg-white text-lg text-center p-4">Nothing found</div>
      )}
      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
