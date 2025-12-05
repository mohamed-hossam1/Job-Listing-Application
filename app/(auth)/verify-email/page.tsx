"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

export default function VerifyEmail() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);


  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 4) newOtp[index] = char;
    });
    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length, 3);
    inputRefs[lastIndex].current?.focus();
  };


  const handleSubmit = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 4) {
      setError("Please enter the complete verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {

      console.log("Verifying OTP:", otpCode);
      
    } catch (err) {
      setError("Invalid verification code. Please try again.");
      setOtp(["", "", "", ""]);
      inputRefs[0].current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-md w-full">
      <h1 className="text-3xl font-bold text-primary text-center mb-4">
        Verify Email
      </h1>
      
      <p className="text-gray-600 text-center mb-8 leading-relaxed">
        {`We've sent a verification code to the email address you provided. 
        To complete the verification process, please enter the code here.`}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-16 h-16 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
            disabled={isLoading}
          />
        ))}
      </div>


      <button
        onClick={handleSubmit}
        disabled={isLoading || otp.some((digit) => !digit)}
        className={`w-full bg-primary-foreground text-white py-3 px-4 rounded-xl font-semibold transition-all duration-500 shadow-lg hover:shadow-xl flex justify-center items-center gap-2 ${
          isLoading || otp.some((digit) => !digit)
            ? "bg-primary/70 cursor-not-allowed"
            : "hover:bg-primary-hover cursor-pointer"
        }`}
      >
        {isLoading ? (
          <div className="h-6 w-6 border-b-2 border-current rounded-full animate-spin"></div>
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
}