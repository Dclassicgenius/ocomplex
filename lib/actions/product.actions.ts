"use server";

import { ProductsResponse } from "@/types";
import { axiosInstance } from "../axios";

export const getProducts = async (page: number) => {
  const pageSize = 24;
  const url = `/products?page=${page}&page_size=${pageSize}`;

  try {
    const response = await axiosInstance.get(url);
    const data = await response.data;

    return data as ProductsResponse;
  } catch (error: any) {
    console.log("Error while fetching products", error);
    return null;
  }
};
