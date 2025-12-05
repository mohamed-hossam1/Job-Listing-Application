"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  signInValidationSchema,
  signUpValidationSchema,
} from "@/lib/validation/authValidations";
import ROUTES from "@/constants/routes";
import { authService } from "@/actions/auth";

interface AuthFormProps {
  fromType: string;
}

interface UserData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function AuthForm({ fromType }: AuthFormProps) {
  const router = useRouter();
  const [apiError, setApiError] = useState<string>("");
  const [apiSuccess, setApiSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = fromType == "Sign Up" ? signUpValidationSchema : signInValidationSchema;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (values: UserData) => {
    setApiError("");
    setApiSuccess("");

    startTransition(async () => {
      try {
        if (fromType == "Sign Up") {
          const response = await authService.signUp({
            name: values.name!,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword!,
            role: "user",
          });

          if (response.success) {
            setApiSuccess(response.message);
            if (typeof window !== 'undefined') {
              localStorage.setItem("verificationEmail", values.email);
            }
            setTimeout(() => router.push(ROUTES.VERIFY_EMAIL), 2000);
          } else {
            setApiError(response.message);
          }
        } else {
          const response = await authService.signIn({
            email: values.email,
            password: values.password,
          });

          if (response.success) {
            setApiSuccess(response.message);
            setTimeout(() => {
              router.push(ROUTES.HOME);
              window.location.reload();
            }, 1000);
          } else {
            setApiError(response.message);
          }
        }
      } catch (error) {
        setApiError("An unexpected error occurred. Please try again.");
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit,
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary text-center mb-2">
          {fromType == "Sign Up" ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-gray-600 text-center text-sm">
          {fromType == "Sign Up"
            ? "Join us today and discover amazing opportunities"
            : "Sign in to continue to your account"}
        </p>
      </div>

      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        {apiSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{apiSuccess}</span>
          </div>
        )}

        {fromType == "Sign Up" && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
              Full Name
            </label>
            <input
              id="name"
              className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                formik.touched.name && formik.errors.name && "border-red-500"
              }`}
              placeholder="Enter your full name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1.5">{formik.errors.name}</div>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
            Email Address
          </label>
          <input
            id="email"
            className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
              formik.touched.email && formik.errors.email && "border-red-500"
            }`}
            placeholder="Enter your email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1.5">{formik.errors.email}</div>
          )}
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-primary mb-2">
            Password
          </label>
          <input
            id="password"
            className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
              formik.touched.password && formik.errors.password && "border-red-500"
            }`}
            placeholder={fromType == "Sign Up" ? "Create a strong password" : "Enter your password"}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-[42px] text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1.5">{formik.errors.password}</div>
          )}
        </div>

        {fromType == "Sign Up" && (
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword && "border-red-500"
              }`}
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-4 top-[42px] text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1.5">{formik.errors.confirmPassword}</div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-primary-foreground flex gap-2 justify-center items-center text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-primary-hover transition-all duration-300 shadow-lg hover:shadow-xl mt-6 ${
            isPending ? "bg-primary/70 hover:bg-primary/70 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isPending ? (
            <>
              <div className="h-5 w-5 border-b-2 border-current rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            fromType == "Sign Up" ? "Create Account" : "Sign In"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {fromType == "Sign Up" ? "Already have an account? " : "Don't have an account? "}
          <Link
            className="text-primary hover:text-primary-hover font-semibold ml-1 transition-colors"
            href={fromType == "Sign Up" ? ROUTES.SIGNIN : ROUTES.SIGNUP}
          >
            {fromType == "Sign Up" ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
}