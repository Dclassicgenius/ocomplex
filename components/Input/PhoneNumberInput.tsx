"use client";

type PhoneNumberInputProps = {
  setPhoneNumber: (phoneNumber: string) => void;
  phoneNumber: string;
  isValid: boolean;
};

const PhoneNumberInput = ({
  phoneNumber,
  setPhoneNumber,
  isValid,
}: PhoneNumberInputProps) => {
  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, "");

    let formatted = "+7 ";
    if (digits.length > 1) {
      formatted += `(${digits.substring(1, 4)}`;
    }
    if (digits.length >= 5) {
      formatted += `) ${digits.substring(4, 7)}`;
    }
    if (digits.length >= 8) {
      formatted += `-${digits.substring(7, 9)}`;
    }
    if (digits.length >= 10) {
      formatted += `-${digits.substring(9, 11)}`;
    }
    return formatted;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const formattedInput = formatPhoneNumber(input);
    setPhoneNumber(formattedInput);
  };

  return (
    <input
      type="text"
      className={`w-full p-4 text-white bg-[#222222] text-2xl rounded-2xl focus:outline-none border-transparent border-2 ${
        !isValid && phoneNumber ? "border-red-500 border-2" : ""
      }`}
      placeholder="+7 (___) ___-__-__"
      value={phoneNumber}
      onChange={handleChange}
    />
  );
};

export default PhoneNumberInput;
