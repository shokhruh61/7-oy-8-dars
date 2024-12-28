import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import main from "../assets/images/main.jpg";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://strapi-store-server.onrender.com/api/products`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          setData(response.data.data.slice(0, 3));
        } else {
          console.error("Data not found or incorrect format");
        }
      })
      .catch((error) => {
        console.error("Error retrieving data from the API:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-10">
      <div className="flex justify-between w-full mx-auto mt-10">
        <div className="w-[480px] mt-5">
          <h2 className="text-6xl font-bold text-slate-600 mb-8 mt-8">
            We are changing the way we shop
          </h2>
          <p className="text-lg leading-8 mb-10">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <Link
            to={"/products"}
            className="bg-blue-600 hover:bg-blue-700 text-white text-opacity-80 py-3 mt-5 px-4 rounded-md"
          >
            OUR PRODUCTS
          </Link>
        </div>
        <div>
          <img src={main} alt="main image" className="w-[500px]" />
        </div>
      </div>

      <div className="mt-[130px] p-5">
        <h2 className="border-b pb-3 text-3xl font-medium text-slate-600 mb-[50px]">
          Featured Products
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex gap-5 mb-20">
            {data.length > 0 ? (
              data.map((product) => {
                const { id, attributes } = product;
                const imageUrl =
                  attributes?.image?.url ||
                  "https://via.placeholder.com/350x200";

                return (
                  <div
                    onClick={() => handleDetails(id)}
                    key={id}
                    className="px-4 pb-10 pt-2 rounded-lg text-center shadow-lg cursor-pointer hover:shadow-2xl"
                    tabIndex={0}
                  >
                    <img
                      src={imageUrl}
                      alt={attributes?.name || "Product"}
                      className="w-[350px] h-[200px] object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-medium text-slate-600">
                      {attributes?.company || "Unknown company"}
                    </h3>
                    <p className="text-lg text-blue-800 mt-5">
                      {attributes?.price ? `${attributes.price}$` : "No price"}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-red-500">No data available at the moment</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
