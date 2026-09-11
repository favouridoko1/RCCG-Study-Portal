"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import rccglogo from "../../../public/rccglogo.png";
import FormInput from "@/app/reuseable/FormInput";
import Button from "@/app/reuseable/Button";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { RiArrowRightLongLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type SignupFormData = z.infer<typeof signupSchema>;
const Signup: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: SignupFormData) => {
  try {
    setIsLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.fullname,
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error("Registration failed", {
        description:
          result.message || "Something went wrong. Please try again.",
      });
      return;
    }

    toast.success("Account created successfully!", {
      description: "Welcome to the RCCG Study Portal.",
    });

    router.replace("/auth/login");
  } catch (error) {
    console.error("Registration error:", error);

    toast.error("Registration failed", {
      description: "Something went wrong. Please try again.",
    });
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center md:max-w-[50%] lg:min-w-93.5">
      <section className="flex w-full flex-col items-center gap-1 rounded-t-md bg-blue-950 p-4 px-6 shadow-md">
        <Image
          src={rccglogo}
          alt="Logo"
          width={40}
          height={40}
        />
        <h4 className="text-base font-medium text-white">
          Create Account
        </h4>
        <p className="text-sm text-gray-400">
          Join the Secure Study Portal
        </p>
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex w-full flex-col gap-3 rounded-b-md bg-white p-4 px-6 shadow-md"
      >
        <FormInput
          id="name"
          label="Full Name"
          type="text"
          className="text-black"
          {...register("fullname")}
          error={errors.fullname?.message}
        />
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          className="text-black"
          {...register("email")}
          error={errors.email?.message}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          className="text-black"
          description="Must be at least 8 characters with a mix of letters and numbers."
          {...register("password")}
          error={errors.password?.message}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="text-white"
        >
          {isLoading ? "Creating Account..." : <span className="flex items-center gap-1">Continue<RiArrowRightLongLine /></span>}
        </Button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
        <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <MdOutlineVerifiedUser />
          GDPR Compliant &amp; Data Encrypted
        </p>
      </form>
    </div>
  );
};

export default Signup;