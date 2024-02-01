import React from "react";

export default function ListProduct({
  products,
  selectedProduct,
  handleProductSelect,
}) {
  return (
    <div className="sm:w-1/2 sm:h-auto h-1/2 w-full p-4 select-none overflow-auto sm:overflow-hidden hover:overflow-y-auto">
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductSelect(product)}
            className={`cursor-pointer text-center border p-4 rounded-md hover:bg-[#F9F5E7] ${
              selectedProduct && selectedProduct.id === product.id
                ? "bg-[#F9F5E7]"
                : "bg-[#F8EAD8]"
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-2 h-24 w-24 object-cover rounded-md mx-auto"
            />
            <p className="font-medium text-lg text-[#DACC96]">{product.name}</p>
            <p className="text-sm font-bold text-[#DACC96]">
              Harga: Rp.{product.price}
            </p>
            <p className="text-sm font-medium text-[#DACC96]">
              Stok: {product.stock}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
