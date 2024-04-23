import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"Mouse"} heading={"Samsung"} />
      <HorizontalCardProduct category={"camera"} heading={"Samsung"} />
      <HorizontalCardProduct category={"mobiles"} heading={"Samsung"} />

      <VerticalCardProduct category={"printers"} heading={"Samsung"} />
      <VerticalCardProduct category={"processor"} heading={"Samsung"} />
    </div>
  );
};

export default Home;
