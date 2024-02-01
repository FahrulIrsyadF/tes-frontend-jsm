import React from "react";

export default function ListProduct({
  products,
  selectedProduct,
  handleProductSelect,
}) {
  return (
    <div className="sm:w-1/2 sm:h-auto h-1/2 w-full p-4 select-none overflow-auto sm:overflow-hidden hover:overflow-y-auto">
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductSelect(product)}
            className={`cursor-pointer text-center border p-4 rounded-md shadow-xl hover:bg-[#FF9800] hover:text-white ${
              selectedProduct && selectedProduct.id === product.id
                ? "bg-[#FF9800] text-white"
                : "bg-white text-[#fcb244]"
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-2 h-24 w-24 object-cover rounded-md mx-auto"
            />
            <p
              className={`font-extrabold text-lg ${
                selectedProduct && selectedProduct.id === product.id
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              {product.name}
            </p>
            <p className="text-sm font-medium">Harga: Rp.{product.price}</p>
            <p className="text-sm font-medium">Stok: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
