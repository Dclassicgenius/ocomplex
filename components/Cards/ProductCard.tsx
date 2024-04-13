"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

type ProductProps = {
  products: Product[];
};

type SingleProductProps = {
  product: Product;
};
const ProductCard = ({ products }: ProductProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
      {products.map(
        (product) =>
          isClient && <SingleProductCard key={product.id} product={product} />
      )}
    </div>
  );
};

export default ProductCard;

const SingleProductCard = ({ product }: SingleProductProps) => {
  const { items, addToCart } = useCart();
  const cartItem = items.find((item) => item.product.id === product.id);

  const [inputValue, setInputValue] = useState<string>(
    cartItem ? cartItem.quantity.toString() : "0"
  );
  const [isEmpty, setIsEmpty] = useState<boolean>(
    !cartItem || cartItem.quantity === 0
  );

  useEffect(() => {
    const updatedItem = items.find((item) => item.product.id === product.id);
    if (updatedItem && updatedItem.quantity > 0) {
      setInputValue(updatedItem.quantity.toString());
      setIsEmpty(false);
    } else {
      setInputValue("0");
      setIsEmpty(true);
    }
  }, [items, product.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseInt(value, 10);

    setInputValue(value);
    setIsEmpty(!value || numberValue <= 0);

    if (!isNaN(numberValue) && numberValue >= 0) {
      addToCart(product, numberValue);
    } else {
      addToCart(product, 0);
    }
  };

  const increment = () => {
    const newQuantity = parseInt(inputValue, 10) + 1;
    setInputValue(newQuantity.toString());
    setIsEmpty(false);
    addToCart(product, newQuantity);
  };

  const decrement = () => {
    const newQuantity = Math.max(parseInt(inputValue, 10) - 1, 0);
    setInputValue(newQuantity.toString());
    setIsEmpty(newQuantity <= 0);
    addToCart(product, newQuantity);
  };

  return (
    <div
      key={product.id}
      className="bg-[#D9D9D9] p-4 rounded-2xl flex flex-col justify-between space-y-3"
    >
      <div className="h-96">
        <Image
          src={product.image_url}
          alt="product"
          width={280}
          height={150}
          className="w-full rounded-2xl object-cover h-full"
        />
      </div>
      <h2 className="text-2xl font-semibold text-center overflow-hidden whitespace-nowrap overflow-ellipsis">
        {product.title}
      </h2>
      <p
        className="text-base"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
        }}
      >
        {product.description}
      </p>
      <p className="text-2xl font-semibold text-center">
        цена: {product.price}₽
      </p>

      {isEmpty ? (
        <button
          className="text-3xl font-semibold text-center w-full bg-[#222222] rounded-2xl p-4 text-white"
          onClick={increment}
        >
          Купить
        </button>
      ) : (
        <div className="flex items-center justify-between gap-4 w-full ">
          <button
            className="bg-[#222222] rounded-2xl px-3 py-2 text-white h-16 w-16 flex items-center justify-center"
            onClick={decrement}
          >
            <Image src="minus.svg" alt="minus" width={16} height={16} />
          </button>
          <input
            className="bg-[#222222] rounded-2xl px-3 py-2 text-white text-center text-2xl h-16 w-36"
            value={inputValue}
            onChange={handleInputChange}
          />

          <button
            className="bg-[#222222] rounded-2xl px-3 py-2 text-white h-16 w-16 flex items-center justify-center"
            onClick={increment}
          >
            <Image src="plus.svg" alt="plus" width={16} height={16} />
          </button>
        </div>
      )}
    </div>
  );
};
