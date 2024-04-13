import { Order, OrderResponse } from "@/types";
import { axiosInstance } from "../axios";

export const submitOrder = async (
  data: Order
): Promise<OrderResponse | null> => {
  try {
    const response = await axiosInstance.post<OrderResponse>("/order", data);
    return response.data;
  } catch (error: any) {
    console.error("Error while submitting order", error);
    return error;
  }
};
