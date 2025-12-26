"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const registerSchema = z.object({
  firstName: z.string().min(3, "Name must be at least 3 characters long"),
  lastName: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email(),
  phone: z.string().min(9, "Phone number must be at least 9 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterFormData) => {
      await api.post("/auth/register", data);
    },

    onSuccess: () => {
      toast.success("Registration successful");
      router.push("/auth/login");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.status === 500)
        return toast.error("Registration failed");

      toast.error(error.response?.data?.message ?? "Registration failed");
      console.log(error);
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: "#f8f8f8" }}
    >
      <div
        className="w-full max-w-[90%] md:max-w-3xl p-8 space-y-6"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div className="text-center space-y-2">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "#323339" }}
          >
            Tasking
          </h1>
          <p className="text-lg" style={{ color: "#323339" }}>
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{ color: "#323339" }}
              >
                FirstName
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("firstName")}
                  className="w-full pl-2 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
                  style={
                    {
                      color: "#323339",
                      "--tw-ring-color": "#8098f0",
                    } as React.CSSProperties
                  }
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{ color: "#323339" }}
              >
                LastName
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("lastName")}
                  className="w-full pl-2 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
                  style={
                    {
                      color: "#323339",
                      "--tw-ring-color": "#8098f0",
                    } as React.CSSProperties
                  }
                />
              </div>
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{ color: "#323339" }}
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  className="w-full pl-2 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
                  style={
                    {
                      color: "#323339",
                      "--tw-ring-color": "#8098f0",
                    } as React.CSSProperties
                  }
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{ color: "#323339" }}
              >
                Phone
              </label>
              <div className="relative">
                <input
                  type="phone"
                  {...register("phone")}
                  className="w-full pl-2 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
                  style={
                    {
                      color: "#323339",
                      "--tw-ring-color": "#8098f0",
                    } as React.CSSProperties
                  }
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium"
              style={{ color: "#323339" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full  pr-12 py-2.5 pl-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2"
                style={
                  {
                    color: "#323339",
                    "--tw-ring-color": "#8098f0",
                  } as React.CSSProperties
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full py-2.5 rounded-lg font-medium text-white hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#8098f0" }}
          >
            {registerMutation.isPending ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            href="/auth/login"
            className="font-medium hover:underline"
            style={{ color: "#8098f0" }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
