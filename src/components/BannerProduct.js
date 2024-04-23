import React, { useState, useEffect } from "react";
import auto1 from "../assest/auto1.jpg";
import auto2 from "../assest/auto2.jpg";
import auto3 from "../assest/auto3.jpg";
import auto4 from "../assest/auto4.jpg";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const images = [auto1, auto2, auto3, auto4];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    if (images.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const preveImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (images.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="container mx-auto p-4">
      <div className="h-72 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full flex items-center">
          <div className="flex justify-between w-full text-3xl">
            <button className="">
              <FaAngleLeft onClick={preveImage} />
            </button>
            <button className="">
              <FaAngleRight onClick={nextImage} />
            </button>
          </div>
        </div>
        {/*desktop version*/}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {images.map((image, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all flex justify-center"
                key={image}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={image} className="object-cover h-full" alt="" />
              </div>
            );
          })}
        </div>
        {/*Mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {images.map((image, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={image}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
