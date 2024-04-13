"use client";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "../Loaders/Spinner";
import { getProducts } from "@/lib/actions/product.actions";
import ProductCard from "../Cards/ProductCard";

const CardList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(1);

  const { ref, inView } = useInView({});

  const loadMoreProducts = async () => {
    const nextPage = pagesLoaded + 1;
    const data = await getProducts(nextPage);
    const newProducts = data?.products ?? [];
    setProducts((previousProducts) => [...previousProducts, ...newProducts]);
    setPagesLoaded(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return (
    <>
      <ProductCard products={products} />
      <div
        className="flex justify-center items-center p-4 cols-span-1 sm:cols-span-2 md:cols-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
};

export default CardList;
