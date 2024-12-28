import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { add } from "../redux/cartSlice";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          setProduct(response.data.data);
        } else {
          console.error("Ma'lumot topilmadi");
        }
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
      });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const { attributes } = product;
  const imageUrl = attributes?.image || "https://via.placeholder.com/550x350";

  const handleAddToBag = () => {
    if (!selectedColor) {
      alert("rang tanlang");
      return;
    }

    const cartItem = {
      id: product.id,
      name: attributes?.category,
      price: attributes?.price,
      amount: price,
      color: selectedColor,
    };
    dispatch(add(cartItem));
  };

  return (
    <div>
      <div className="w-[1200px] mx-auto mb-20">
        <div className="flex gap-3 mt-20">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <Link to={"/products"} className="hover:underline">
            Products
          </Link>
        </div>
        <div className="flex gap-20 mt-10">
          <div>
            <img
              src={imageUrl}
              alt={attributes?.name || "Product"}
              className="w-[500px] h-[450px] rounded-md"
            />
          </div>
          <div className="w-[500px]">
            <h3 className="text-3xl font-bold text-slate-600 mb-3">
              {attributes?.category || "Product Name"}
            </h3>
            <p className="text-2xl font-medium text-gray-400 mb-3">
              {attributes?.company || "Unknown Company"}
            </p>
            <p className="text-2xl text-slate-600 mb-10">
              {attributes?.price
                ? `${attributes.price / 100}$`
                : "Price not available"}
            </p>
            <span className="leading-9 ">
              {attributes?.description || "Product description not available"}
            </span>
            <p className="mt-5 text-xl font-medium">Colors</p>
            <div className="flex gap-3 mt-3">
              {attributes?.colors?.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-[20px] h-[20px] rounded-full cursor-pointer shadow-xl ${
                    selectedColor === color ? "border-4 border-black" : ""
                  }`}
                ></div>
              ))}
            </div>
            <div className="mt-5">
              <p className="font-medium mb-3">Amount</p>
              <select
                className="border w-[350px] p-5 rounded-md mb-12"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              >
                {[...Array(10)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToBag}
              className="bg-blue-800 text-white text-opacity-80 py-3 px-5 rounded-md hover:bg-blue-900"
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
