import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import menu from "../assets/images/menu.png";
import button from "../assets/images/menu-button.png";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://strapi-store-server.onrender.com/api/products`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          const newData = response.data.data;
          setData(newData);
        } else {
          console.error("Ma'lumot topilmadi yoki noto'g'ri formatda");
        }
      })
      .catch((error) => {
        console.error("API'dan ma'lumot olishda xatolik:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Yuklanmoqda...</p>;
  }

  return (
    <div className="w-[1200px] mx-auto">
      <div className="mt-[50px] border-b flex justify-between">
        <div>
          <h2 className="mb-5 font-medium">Barcha Mahsulotlar</h2>
        </div>
        <div className="flex gap-2">
          <div>
            <img
              src={button}
              alt="button image"
              className="w-[20px] cursor-pointer"
            />
          </div>
          <div>
            <img
              src={menu}
              alt="menu image"
              className="w-[20px] cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {data.length > 0 ? (
          data.map((product) => {
            const { id, attributes } = product;
            const imageUrl =
              attributes?.image || "https://via.placeholder.com/350x200";

            return (
              <div
                key={id}
                className="border p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl text-center"
              >
                <Link to={`/details/${id}`}>
                  <img
                    src={imageUrl}
                    alt={attributes?.name || "Mahsulot"}
                    className="w-full h-[200px] object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-medium text-slate-600">
                    {attributes?.company || "Noma'lum kompaniya"}
                  </h3>
                  <p className="text-lg -800 mt-5">
                    {attributes?.price
                      ? `${attributes.price / 100}$`
                      : "Narx yo'q"}
                  </p>
                </Link>
              </div>
            );
          })
        ) : (
          <p>Ma'lumot hozircha yo'q</p>
        )}
      </div>
    </div>
  );
}

export default Products;
