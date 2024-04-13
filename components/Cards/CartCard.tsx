"use client";
import { useCart } from "@/context/CartContext";
import PhoneNumberInput from "../Input/PhoneNumberInput";
import { useState, useEffect } from "react";
import Image from "next/image";
import { submitOrder } from "@/lib/actions/order.actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const CartCard = () => {
  const { items, removeFromCart, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem("phoneNumber");

    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("phoneNumber", phoneNumber);
    const digits = phoneNumber.replace(/\D/g, "");
    const valid = digits.length === 11;
    setIsValid(valid);
  }, [phoneNumber]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOrder = async () => {
    if (!isValid) {
      toast.error("Пожалуйста, введите действующий телефонный номер.");
      return;
    }
    const orderData = {
      phone: phoneNumber.replace(/\D/g, ""),
      cart: items.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      })),
    };

    const response = await submitOrder(orderData);
    if (response && response.success) {
      clearCart();
      setPhoneNumber("");
      toast.success("Заказ успешно отправлен!", {
        onClose: () => {
          router.push("/");
        },
      });
    } else {
      toast.error(response?.error || "Не удалось отправить заказ.");
    }
  };

  return (
    <div className="bg-[#D9D9D9] p-4 rounded-2xl space-y-3 max-w-5xl">
      <h2 className="text-4xl text-center sm:text-left mb-4">
        Добавленные товары
      </h2>
      <table className="w-full text-xl">
        <thead>
          <tr className="text-sm sm:text-base">
            <th className="text-left font-semibold">Product</th>
            <th className="text-left font-semibold">Price</th>
            <th className="text-left font-semibold">Quantity</th>
            <th className="text-left font-semibold">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-sm sm:text-base">
          {isClient &&
            items.map((item) => (
              <tr key={item.product.id}>
                <td className="py-4">
                  <div className="flex items-center">
                    <span className="font-semibold">{item.product.title}</span>
                  </div>
                </td>
                <td className="py-4">{item.product.price}</td>
                <td className="py-4 text-center">{item.quantity}</td>
                <td className="py-4">{item.product.price * item.quantity}</td>
                <td
                  className="py-4"
                  onClick={() => removeFromCart(item.product)}
                >
                  <Image
                    src={"/trash-red.svg"}
                    alt="trash"
                    width={24}
                    height={24}
                    className="cursor-pointer hover:scale-110 duration-300 flex justify-center w-5 h-5 sm:w-6 sm:h-6"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        <PhoneNumberInput
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isValid={isValid}
        />
      </div>

      <form action={handleOrder}>
        <button className="text-4xl text-center w-full bg-[#222222] rounded-2xl p-4 text-white">
          заказать
        </button>
      </form>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default CartCard;
