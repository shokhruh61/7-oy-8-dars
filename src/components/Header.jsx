import React from "react";
import { Link } from "react-router-dom";
import moon from "../assets/images/moon.png";
import cart from "../assets/images/cart.png";

function Header() {
  return (
    <div className="bg-blue-50 py-2">
      <header className="w-[1200px] mx-auto flex justify-between items-center ">
        <div>
          <Link
            to={"/"}
            className="bg-blue-500 text-white text-opacity-70 px-4 py-1 font-medium rounded-md text-3xl"
          >
            C
          </Link>
        </div>
        <nav className="flex gap-2 text-center">
          <Link
            to={"/"}
            className="hover:bg-gray-200 py-2 px-3 rounded-md accent-red-800"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="hover:bg-gray-200 py-2 px-3 rounded-md"
          >
            About
          </Link>
          <Link
            to={"/products"}
            className="hover:bg-gray-200 py-2 px-3 rounded-md"
          >
            Products
          </Link>
          <Link to={"/cart"} className="hover:bg-gray-200 py-2 px-3 rounded-md">
            Cart
          </Link>
        </nav>
        <div className="flex gap-4">
          <img
            src={moon}
            alt="moon image"
            className="w-[25px] cursor-pointer"
          />
          <img
            src={cart}
            alt="cart image"
            className="w-[25px] cursor-pointer"
          />
        </div>
      </header>
    </div>
  );
}

export default Header;
