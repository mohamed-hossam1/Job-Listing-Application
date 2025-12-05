"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { authService } from "@/actions/auth";

export default function VerifyEmail() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem("verificationEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        router.push(ROUTES.SIGNUP);
      }
    }
    inputRefs[0].current?.focus();
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    setSuccess("");

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

    if (!email) {
      setError("Email not found. Please sign up again.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authService.verifyEmail({
        email: email,
        OTP: otpCode,
      });

      if (response.success) {
        setSuccess(response.message);
        if (typeof window !== 'undefined') {
          localStorage.removeItem("verificationEmail");
        }
        setTimeout(() => router.push(ROUTES.SIGNIN), 2000);
      } else {
        setError(response.message);
        setOtp(["", "", "", ""]);
        inputRefs[0].current?.focus();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setOtp(["", "", "", ""]);
      inputRefs[0].current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-md w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-primary mb-3">Verify Email</h1>

        <p className="text-gray-600 leading-relaxed">
          {`We've sent a verification code to`}
          <br />
          <span className="font-semibold text-primary">{email}</span>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-2">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-2">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{success}</span>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-primary mb-3 text-center">
          Enter Verification Code
        </label>
        <div className="flex justify-center gap-3">
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
              className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              disabled={isLoading}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || otp.some((digit) => !digit)}
        className={`w-full bg-primary-foreground text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex justify-center items-center gap-2 ${
          isLoading || otp.some((digit) => !digit)
            ? "bg-primary/70 cursor-not-allowed"
            : "hover:bg-primary-hover cursor-pointer"
        }`}
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 border-b-2 border-current rounded-full animate-spin"></div>
            <span>Verifying...</span>
          </>
        ) : (
          "Verify Email"
        )}
      </button>

      <div className="mt-6 text-center">
        <button
          onClick={() => router.push(ROUTES.SIGNUP)}
          className="text-gray-600 hover:text-primary text-sm transition-colors"
        >
          ← Back to Sign Up
        </button>
      </div>
    </div>
  );
}