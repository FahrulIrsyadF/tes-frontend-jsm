import React, { useState, useEffect } from "react";
import ListProduct from "@/component/listProduct";
import DetailProduct from "@/component/detailProduct";

export default function Vending() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState([]);
  const [change, setChange] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function getProduct() {
    const response = await fetch("http://localhost:3001/products");
    const prod = await response.json();
    if (response.status === 200) {
      setProducts(prod);
    } else {
      console.error("Error fetching products:", error);
    }
  }

  const handleProductSelect = (product) => {
    if (product.stock > 0) {
      setSelectedProduct(product);
      setQuantity(1);
      setError("");
      setMessage("");
    } else {
      setSelectedProduct(product);
      setError("Stok produk habis");
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity < selectedProduct.stock) {
        return prevQuantity + 1;
      }
      return prevQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount((prevAmounts) => [...prevAmounts, amount]);
    setMessage("");
  };

  const handlePayment = (id) => {
    if (selectedProduct && selectedAmount.length > 0) {
      const totalAmount = selectedAmount.reduce(
        (sum, amount) => sum + amount,
        0
      );

      if (totalAmount >= selectedProduct.price * quantity) {
        const remainingChange = totalAmount - selectedProduct.price * quantity;
        setChange(remainingChange);

        fetch(`http://localhost:3001/products/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock: selectedProduct.stock - quantity,
          }),
        })
          .then((response) => {
            if (response.ok) {
              setMessage(
                "Pembayaran berhasil! Terima kasih sudah berbelanja. Anda akan kembali ke halaman awal dalam 5 detik"
              );

              // Reset data setelah pembayaran berhasil
              setTimeout(() => {
                location.href = "/";
              }, 5000);
            } else {
              setError("Gagal memperbarui stok produk.");
            }
          })
          .catch((error) => {
            setError("Transaksi gagal.");
            console.error("Error updating stock:", error);
          });
      } else {
        setError("Pembayaran gagal. Saldo Anda tidak cukup.");
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    } else {
      setError("Pilih produk dan nominal pembayaran terlebih dahulu.");
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="bg-[#A7727D] py-10 px-5">
      <div className="flex sm:flex-row flex-col h-screen rounded-2xl py-3 px-3 bg-[#EDDBC7]">
        <ListProduct
          products={products}
          selectedProduct={selectedProduct}
          handleProductSelect={handleProductSelect}
        />
        <DetailProduct
          selectedProduct={selectedProduct}
          quantity={quantity}
          selectedAmount={selectedAmount}
          change={change}
          message={message}
          error={error}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleAmountSelect={handleAmountSelect}
          handlePayment={handlePayment}
        />
      </div>
    </div>
  );
}
