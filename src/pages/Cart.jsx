import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, updateAmount } from "../redux/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const handleAmountChange = (id, amount) => {
    dispatch(updateAmount({ id, amount }));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  return (
    <div>
      <div className="w-[1200px] mx-auto mt-16">
        <div className="border-b">
          <h2 className="mb-3 text-3xl font-medium text-slate-700">
            Shopping Cart
          </h2>
        </div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="mt-10 flex justify-between text-left">
              <div>
                <img src={item.image} alt={item.name} className="w-[150px]" />
              </div>
              <div>
                <h2 className="font-medium text-xl mb-3">{item.name}</h2>
                <p className="font-medium text-gray-300 mb-3">
                  Category: {item.category}
                </p>
                <p className="text-gray-500">Company: {item.company}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-2">Amount</p>
                <select
                  className="border py-1 px-2 rounded-md mb-3"
                  value={item.amount}
                  onChange={(e) =>
                    handleAmountChange(item.id, parseInt(e.target.value))
                  }
                >
                  {[...Array(10)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <br />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-blue-600 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div>
                <p className="font-medium">
                  ${(item.price * item.amount).toFixed(2)}
                </p>
              </div>
              {item.color && (
                <div
                  style={{ backgroundColor: item.color }}
                  className="w-[20px] h-[20px] rounded-full mt-2"
                ></div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
        <div className="mt-10 flex justify-between w-[250px] bg-blue-100 p-5 rounded-xl">
          <div>
            <h3 className="text-xs mb-2">Order Total</h3>
          </div>
          <div>
            <p className="text-xs">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
