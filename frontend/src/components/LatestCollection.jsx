import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "../pages/Product";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 5));
  }, []);

  console.log("products", products,'latestProduct',latestProduct);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3x1">
        <Title text1={"LATEST"} text2={"COLLECTIONs"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      {/* Rendering produncts */}
      <div className="grid grid-col-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((item, index) => {
          return  <ProductItem 
          key={index}
          id={item._id}
          image={item.image}
          name={item.name}
          price={item.price}
          />;
        })}
      </div>
    </div>
  );
};

export default LatestCollection;
