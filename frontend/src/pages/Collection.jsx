import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../pages/Product";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, SetFilterProducts] = useState([]);
  const [category, setCateory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  useEffect(() => {
    SetFilterProducts(products);
  }, []);

  useEffect(() => {
    // console.log('category',subCategory)
    applyFilter();
  }, [category, subCategory]);

  useEffect(() => {
    sortProduct(sortType);
  }, [sortType]);

  const toggleCateory = (e) => {
    if (category.includes(e.target.value)) {
      setCateory((prev) => prev.filter((item) => item != e.target.value));
    } else {
      setCateory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCateory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item != e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    SetFilterProducts(productCopy);
  };

  const sortProduct = (sortType) => { 
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        SetFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        console.log('filterProducts11',filterProducts)
        break;
      case "high-low":
        SetFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        console.log('filterProducts22',filterProducts)
        break;
      default:
        applyFilter();
        break;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="underline my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
        </p>
        {/* Category Options */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={(e) => toggleCateory(e)}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={(e) => toggleCateory(e)}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={(e) => toggleCateory(e)}
              />
              Kids
            </p>
          </div>
        </div>
        {/* Sub Category Options */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-5 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={(e) => toggleSubCateory(e)}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={(e) => toggleSubCateory(e)}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={(e) => toggleSubCateory(e)}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Sided */}
      <div className="flex-1 ">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
