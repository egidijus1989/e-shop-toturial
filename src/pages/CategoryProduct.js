import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import * as service from "../service/searchAndShortService";
import { toast } from "react-toastify";
import VerticalCart from "../components/VerticalCart";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryList = urlSearch.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryList.forEach((el) => {
    urlCategoryListObject[el] = true;
  });
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const dataResponse = await service.filterProduct(filterCategoryList);
    setLoading(true);
    if (dataResponse.success) {
      setData(dataResponse?.data);
      toast.success(dataResponse.message);
      setLoading(false);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categeryKeyName) => {
        if (selectCategory[categeryKeyName]) {
          return categeryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate(`/product-category?` + urlFormat.join(""));
  }, [selectCategory]);

  const handleChangeShortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.selling - b.selling));
    }

    if (value === "desc") {
      setData((prev) => prev.sort((a, b) => b.selling - a.selling));
    }
  };

  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      {/*desktop*/}
      <div className="hidden md:grid grid-cols-[200px,1fr]">
        {/*sidebar*/}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)]">
          {/*sort by*/}
          <div className="">
            <h3 className="text-lg uppercase font-medium border-b pb-1">
              Sort By
            </h3>
            <form className="text-sm flex flex-col gap-2 p-2">
              <div className="flex items-center gap-2">
                <input
                  className=""
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  checked={sortBy === "asc"}
                  onChange={handleChangeShortBy}
                />
                <label className="">Price - Low to High</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className=""
                  type="radio"
                  name="sortBy"
                  value={"desc"}
                  checked={sortBy === "desc"}
                  onChange={handleChangeShortBy}
                />
                <label className="">Price - High to Low</label>
              </div>
            </form>
          </div>
          {/*filter by*/}
          <div className="">
            <h3 className="text-lg uppercase font-medium border-b pb-1">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 p-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3" key={index}>
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/*main*/}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>

          <div className="min-h-[calc(100vh-120px)] overflow-y-auto max-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && (
              <VerticalCart data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
