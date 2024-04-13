"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const NavBar = () => {
  const { getTotalItems } = useCart();
  const [itemCount, setItemCount] = useState<number | null>(null);
  useEffect(() => {
    setItemCount(getTotalItems());
  }, [getTotalItems]);

  return (
    <nav className="w-full bg-[#777777] text-gray-50 sticky top-0 z-50 py-5">
      <div className="h-full w-full mx-auto flex items-center justify-between  px-4">
        <Link
          href={"/"}
          className="px-2 text-white border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] font-bold text-3xl md:text-5xl mt-1"
        >
          О-КОМПЛЕКС
        </Link>

        <Link
          href={"/reviews"}
          className="px-2 text-white border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] font-bold text-2xl md:text-3xl mt-1"
        >
          Отзывы
        </Link>

        <Link
          href={"/cart"}
          className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative py-1"
        >
          <Image
            className="object-cover h-auto "
            src="/cartIcon.png"
            alt="cartImg"
            width={32}
            height={32}
          />
          <p className="text-xs text-white font-bold mt-3">Корзина</p>
          <span className="absolute -top-0.5 sm:left-[22px] left-[18px] font-semibold">
            {itemCount}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
