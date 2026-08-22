"use client";

import React from "react";
import Button from "@/app/reuseable/Button";
import FormInput from "@/app/reuseable/FormInput";
import { MdOutlineVerifiedUser } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import rccglogo from "../../../public/rccglogo.png";
import { IoArrowForward } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { RiGoogleLine } from "react-icons/ri";
import { PiAppleLogoDuotone } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginUser } from "@/app/lib/auth";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;
const account = [
  {
    icon: <RiGoogleLine className="text-blue-300" />,
    name: "Google",
  },
  {
    icon: <PiAppleLogoDuotone />,
    name: "Apple",
  },
];
function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
const onSubmit = async (data: LoginFormData) => {
  try {
    setIsLoading(true);

    console.log("Login email:", data.email);

    // Simulate authentication delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    loginUser();

    toast.success("Signed in successfully!", {
      description: "Welcome back to the RCCG Study Portal.",
    });

    router.replace("/");
  } catch (error) {
    toast.error("Unable to sign in", {
      description: "Please try again.",
    });
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center md:max-w-[50%] lg:max-w-103.5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex w-full flex-col justify-center gap-4 rounded-sm border border-gray-300 bg-white p-4 px-6"
      >
        <figure className="flex flex-col items-center">
          <Image
            src={rccglogo}
            alt="Logo"
            width={60}
            height={60}
          />

          <h4 className="text-lg font-semibold">
            RCCG Europe
          </h4>

          <p className="text-sm">
            STUDY PORTAL
          </p>
        </figure>
        <FormInput
          id="email"
          type="email"
          label="Email Address"
          placeholder="member@parish.eu"
          className="w-full rounded-md text-black"
          icon={<MdOutlineEmail />}
          {...register("email")}
          error={errors.email?.message}
        />
        <FormInput
          id="password"
          type="password"
          label="Password"
          className="rounded-md text-black"
          icon={<MdLockOutline />}
          {...register("password")}
          error={errors.password?.message}
        />
        <div className="flex items-center justify-between gap-8 text-xs">

          <label className="flex cursor-pointer items-center gap-1">
            <input
              type="checkbox"
              className="cursor-pointer"
            />
            <span>
              Remember this device
            </span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-[#001e61] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-1 rounded-sm text-white"
        >
          {isSubmitting ? (
            "Signing in..."
          ) : (
            <>
              Sign in
              <IoArrowForward />
            </>
          )}
        </Button>
        <div className="flex flex-col items-center justify-center gap-2 text-xs">
          <p>
            Or Continue with
          </p>
          <ul className="flex items-center justify-center gap-4">
            {account.map((item) => (
              <li
                key={item.name}
                className="flex cursor-pointer items-center gap-1.5 rounded-sm border px-5 py-1 font-semibold transition hover:bg-gray-100"
              >
                {item.icon}
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
        <hr className="border-gray-300" />
        <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
          <MdOutlineVerifiedUser />
          SECURE ENCRYPTED CONNECTION
        </p>
      </form>
    </div>
  );
}

export default LoginPage;