import React, { useState } from "react";
import QuantityButton from "./quantityButton";

export default function DetailProduct({
  selectedProduct,
  quantity,
  selectedAmount,
  change,
  message,
  error,
  handleIncrement,
  handleDecrement,
  handleAmountSelect,
  handlePayment,
}) {
  return (
    <div className="sm:w-1/2 sm:h-auto h-auto w-full p-4 sm:overflow-hidden hover:overflow-y-auto">
      {selectedProduct ? (
        <div>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="mb-4 h-40 w-40 mx-auto object-cover rounded-md"
          />
          <p className="font-bold text-xl mb-2 text-gray-800">
            Produk: {selectedProduct.name}
          </p>
          <p className="mb-2 text-gray-800">
            Harga: Rp.{selectedProduct.price}
          </p>

          {selectedProduct.stock !== 0 && (
            <>
              <QuantityButton
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                quantity={quantity}
              />

              <p className="my-2 text-lg text-gray-800">
                Harga yang harus dibayar: Rp.
                {selectedProduct.price * quantity}
              </p>

              <div className="mb-2">
                <p className="font-bold text-lg text-gray-800 mb-2">
                  Masukkan Uang:
                </p>
                <div className="flex flex-wrap">
                  {[2000, 5000, 10000, 20000, 50000].map((amount) => (
                    <div
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={
                        "cursor-pointer select-none border border-[#FF9800] p-2 mr-2 mb-2 rounded-md text-[#FF9800] hover:bg-[#FF9800] hover:text-white"
                      }
                    >
                      Rp.{amount}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tampilkan jumlah nominal yang dipilih */}
              {selectedAmount.length > 0 && (
                <div className="mb-2 text-lg text-gray-800">
                  Jumlah Nominal:{" "}
                  {Object.entries(
                    selectedAmount.reduce((countMap, amount) => {
                      countMap[amount] = (countMap[amount] || 0) + 1;
                      return countMap;
                    }, {})
                  )
                    .map(([amount, count]) => `Rp.${amount}x${count}`)
                    .join(", ")}
                </div>
              )}

              <p className="mb-2 text-lg text-gray-800">
                Total Saldo Anda: Rp.
                {selectedAmount.reduce((sum, amount) => sum + amount, 0)}
              </p>

              <p className="mb-2 text-lg text-gray-800">
                Kembalian: Rp.{change}
              </p>

              <button
                onClick={() => handlePayment(selectedProduct.id)}
                className="bg-[#FF9800] text-white p-3 rounded-md hover:bg-[#fac06b]"
              >
                Bayar
              </button>
            </>
          )}
          {message && (
            <p className="mt-4 py-3 px-2 mx-auto text-center text-lg bg-green-500 text-white rounded-xl select-none">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 py-3 px-2 mx-auto text-center text-lg bg-red-500 text-white rounded-xl select-none">
              {error}
            </p>
          )}
        </div>
      ) : (
        // Tampilan awal halaman
        <div className="mx-auto mt-16">
          <p className="sm:text-3xl text-xl font-bold text-center text-gray-600 mb-4">
            Selamat datang di Mesin Jajan Otomatis!
          </p>
          <p className="sm:text-base text-sm font-bold text-center text-gray-500">
            Silakan pilih berbagai cemilan favorit untuk menemani hari Anda
          </p>
        </div>
      )}
    </div>
  );
}
