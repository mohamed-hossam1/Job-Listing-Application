"use client";
import UserMenu from "./UserMenu";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { useState, useEffect } from "react";
import { authService } from "@/actions/auth";

export default function UserControl() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = authService.getUser();
        setUser(userData)
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    if (typeof window !== "undefined") {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === "user") {
          checkAuth();
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-5">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <div className="flex  justify-between items-center lg:flex-1 gap-5">
          <div className="hidden lg:flex">
            <Link
              href={ROUTES.SIGNIN}
              className="border-2 rounded-xl py-2.5 px-4 hover:bg-gray-100 transition-all duration-300 text-primary hover:text-primary-hover"
            >
              Login
            </Link>
          </div>
          <div className="hidden lg:flex">
            <Link
              href={ROUTES.SIGNUP}
              className="border-2 rounded-xl py-2.5 px-4 bg-primary-foreground text-white hover:bg-primary-hover transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
          <div className={`flex  lg:hidden`}>
            <UserMenu user={user} />
          </div>
        </div>
      ) : (
        <div className={`flex ${!user && "lg:hidden"}`}>
          <UserMenu user={user} />
        </div>
      )}
    </>
  );
}
