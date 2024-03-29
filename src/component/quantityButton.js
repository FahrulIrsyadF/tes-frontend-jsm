import React from "react";

export default function QuantityButton({ onIncrement, onDecrement, quantity }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-700">Kuantitas :</span>
      <div className="relative inline-block text-left mt-2">
        <button
          className="bg-[#FF9800] hover:bg-[#fac06b] text-white font-medium py-1 px-3 rounded-lg"
          onClick={onDecrement}
        >
          -
        </button>
        <input
          className={`mx-2 border-white rounded-r rounded-l w-12 text-center p-2`}
          type="text"
          value={quantity}
          disabled
        />
        <button
          className="bg-[#FF9800] hover:bg-[#fac06b] text-white font-medium py-1 px-3 rounded-lg"
          onClick={onIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
}
