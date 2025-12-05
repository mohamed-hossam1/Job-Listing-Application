import axios from "axios";
import { URL } from "@/lib/baseURL";

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface VerifyEmailData {
  email: string;
  OTP: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const authService = {
  async signUp(userData: SignUpData): Promise<AuthResponse> {
    try {
      const { data } = await axios.post(`${URL}/signup`, userData);
      return {
        success: true,
        message: "Account created successfully! Please verify your email.",
        data: data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create account. Please try again.",
      };
    }
  },

  async verifyEmail(verifyData: VerifyEmailData): Promise<AuthResponse> {
    try {
      const { data } = await axios.post(`${URL}/verify-email`, verifyData);
      return {
        success: true,
        message: "Email verified successfully!",
        data: data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to verify email. Please try again.",
      };
    }
  },

  async signIn(credentials: SignInData): Promise<AuthResponse> {
    try {
      const { data } = await axios.post(`${URL}/login`, credentials);
      
      if (data.data?.accessToken) {
        if (typeof window !== 'undefined') {
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken || "");
          localStorage.setItem("user", JSON.stringify(data.data));
        }
      }

      return {
        success: true,
        message: "Signed in successfully!",
        data: data.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Invalid email or password.",
      };
    }
  },

  signOut() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("accessToken");
    }
    return null;
  },

  getUser(): any {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },
};