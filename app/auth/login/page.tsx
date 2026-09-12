"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/component/Navbar";
import Sidebar from "@/app/component/Sidebar";
import { useCartStore } from "@/app/store/cartStore";
import { useRouter } from "next/navigation";
import { IoArrowBack, IoCardOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const checkoutSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

type CartMaterial = {
  id: number;
  title: string;
  subtitle: string;
  price: string | null;
  type: string;
};

type CartItem = {
  id: number;
  quantity: number;
  material: CartMaterial;
};

 function CheckoutPage() {
  const router = useRouter();

  const clearCart = useCartStore((state) => state.clearCart);
  const setCartItems = useCartStore((state) => state.setItems);

  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/cart");

        if (!response.ok) {
          throw new Error("Unable to load cart.");
        }

        const data = await response.json();

        const items: CartItem[] = data.cart?.items ?? [];

        setCartItemsState(items);

        setCartItems(
          items.map((item) => ({
            materialId: item.material.id,
            title: item.material.title,
            subtitle: item.material.subtitle,
            price: item.material.price ?? "",
            type: item.material.type,
          }))
        );
      } catch (error) {
        console.error("Load checkout cart error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [setCartItems]);

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(
      item.material.price?.replace(/[^\d.]/g, "") ?? ""
    );

    return (
      total +
      (Number.isNaN(price) ? 0 : price) * item.quantity
    );
  }, 0);

  const onSubmit = async (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      router.push("/cart");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Unable to place order", {
          description:
            result.message ||
            "Something went wrong. Please try again.",
        });

        return;
      }

      toast.success("Order created successfully!", {
        description: "Your order has been placed successfully.",
      });

      clearCart();

      router.push("/checkout/success");
    } catch (error) {
      console.error("Place order error:", error);

      toast.error("Unable to place order", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">
        <Navbar />
        <Sidebar />

        <main className="pt-20 lg:ml-53.75">
          <div className="flex min-h-[70vh] items-center justify-center">
            <p className="text-sm text-slate-500">
              Loading checkout...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">
        <Navbar />
        <Sidebar />

        <main className="pt-20 lg:ml-53.75">
          <div className="flex min-h-[70vh] flex-col items-center justify-center px-5">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e9edf4]">
              <MdOutlineShoppingBag className="text-3xl text-[#00256f]" />
            </div>

            <h1 className="text-xl font-bold text-[#071c49]">
              Your cart is empty
            </h1>

            <p className="mt-2 text-center text-sm text-slate-500">
              Add some materials to your cart before checking out.
            </p>

            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="mt-6 rounded-[9px] bg-[#00256f] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#0a337f]"
            >
              Return to Cart
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Navbar />
      <Sidebar />

      <main className="pt-20 lg:ml-53.75">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#00256f]"
            >
              <IoArrowBack />
              Return to Cart
            </button>

            <h1 className="text-2xl font-bold text-[#071c49]">
              Checkout
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Complete your details to place your order.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
              {/* Left */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="rounded-[12px] border border-slate-200 bg-white p-6">
                  <div className="mb-6">
                    <h2 className="text-base font-bold text-[#071c49]">
                      Contact Information
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Enter your contact details for this order.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-xs font-semibold text-[#071c49]"
                      >
                        First Name
                      </label>

                      <input
                        id="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        {...register("firstName")}
                        className={`w-full rounded-[9px] border bg-white px-4 py-3 text-xs text-[#071c49] outline-none transition placeholder:text-slate-400 focus:border-[#00256f] ${
                          errors.firstName
                            ? "border-red-400"
                            : "border-slate-300"
                        }`}
                      />

                      {errors.firstName?.message && (
                        <p className="mt-1 text-[10px] text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-xs font-semibold text-[#071c49]"
                      >
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        {...register("lastName")}
                        className={`w-full rounded-[9px] border bg-white px-4 py-3 text-xs text-[#071c49] outline-none transition placeholder:text-slate-400 focus:border-[#00256f] ${
                          errors.lastName
                            ? "border-red-400"
                            : "border-slate-300"
                        }`}
                      />

                      {errors.lastName?.message && (
                        <p className="mt-1 text-[10px] text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-semibold text-[#071c49]"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        {...register("email")}
                        className={`w-full rounded-[9px] border bg-white px-4 py-3 text-xs text-[#071c49] outline-none transition placeholder:text-slate-400 focus:border-[#00256f] ${
                          errors.email
                            ? "border-red-400"
                            : "border-slate-300"
                        }`}
                      />

                      {errors.email?.message && (
                        <p className="mt-1 text-[10px] text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-xs font-semibold text-[#071c49]"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        {...register("phone")}
                        className={`w-full rounded-[9px] border bg-white px-4 py-3 text-xs text-[#071c49] outline-none transition placeholder:text-slate-400 focus:border-[#00256f] ${
                          errors.phone
                            ? "border-red-400"
                            : "border-slate-300"
                        }`}
                      />

                      {errors.phone?.message && (
                        <p className="mt-1 text-[10px] text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="rounded-[12px] border border-slate-200 bg-white p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9edf4]">
                      <IoCardOutline className="text-lg text-[#00256f]" />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-[#071c49]">
                        Payment Method
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Enter your payment details.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* Card Number */}
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="mb-2 block text-xs font-semibold text-[#071c49]"
                      >
                        Card Number
                      </label>

                      <input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-[9px] border border-slate-300 bg-white px-4 py-3 text-xs text-[#071c49] outline-none transition placeholder:text-slate-400 focus:border-[#00256f]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      {/* Expiry */}
                      <div>
                        <label
                          htmlFor="expiry"
                          className="mb-2 block text-xs font-semibold text-[#071c49]"
                        >
                          Expiry Date
                        </label>

                        <input
                          id="expiry"
                          type="text"
                          placeholder="MM / YY"
                          className="w-full rounded-[9px] border border-slate-300 bg-white px-4 py-3 text-xs text-[#071c49] outline-none transition placeholder:text-slate-400 focus:border-[#00256f]"
                        />
                      </div>

                      {/* CVV */}
                      <div>
                        <label
                          htmlFor="cvv"
                          className="mb-2 block text-xs font-semibold text-[#071c49]"
                        >
                          CVV
                        </label>

                        <input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          className="w-full rounded-[9px] border border-slate-300 bg-white px-4 py-3 text-xs text-[#071c49] outline-none transition placeholder:text-slate-400 focus:border-[#00256f]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Order Summary */}
              <div className="h-fit rounded-[12px] border border-slate-200 bg-white p-6">
                <h2 className="text-base font-bold text-[#071c49]">
                  Order Summary
                </h2>

                <div className="mt-5 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#071c49]">
                          {item.material.title}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-xs font-semibold text-[#071c49]">
                        {item.material.price
                          ? `€${(
                              Number(
                                item.material.price.replace(
                                  /[^\d.]/g,
                                  ""
                                )
                              ) * item.quantity
                            ).toFixed(2)}`
                          : "Free"}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="my-6 border-t border-slate-200" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">
                    Subtotal
                  </span>

                  <span className="text-lg font-bold text-[#071c49]">
                    €{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Shipping
                  </span>

                  <span className="text-xs font-semibold text-green-600">
                    Free
                  </span>
                </div>

                <div className="my-6 border-t border-slate-200" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#071c49]">
                    Total
                  </span>

                  <span className="text-xl font-bold text-[#00256f]">
                    €{subtotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 flex w-full items-center justify-center rounded-[9px] bg-[#00256f] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#0a337f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>

                <p className="mt-4 text-center text-[10px] leading-4 text-slate-400">
                  By placing your order, you agree to our terms
                  and conditions.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
export default CheckoutPage;