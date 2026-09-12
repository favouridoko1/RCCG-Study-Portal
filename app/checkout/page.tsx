"use client";

import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { useCartStore } from "../store/cartStore";
import {
  IoArrowBackOutline,
  IoCardOutline,
  IoCheckmarkCircleOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Loading from "../reuseable/Loading";

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

function Page() {
  const router = useRouter();
  const setCartItems = useCartStore((state) => state.setItems);
  const clearCart = useCartStore((state) => state.clearCart);
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
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart");
        if (!response.ok) {
          throw new Error("Failed to load cart");
        }
        const data = await response.json();
        if (data.success) {
          const databaseItems = data.cart.items ?? [];
          setCartItemsState(databaseItems);
          setCartItems(
            databaseItems.map((item: CartItem) => ({
              materialId: item.material.id,
              title: item.material.title,
              subtitle: item.material.subtitle,
              price: item.material.price ?? "",
              type: item.material.type,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to load checkout cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
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

  const total = subtotal;

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

      router.push(
        `/checkout/success?orderId=${result.order.id}`
      );
    } catch (error) {
      console.error("Place order error:", error);

      toast.error("Unable to place order", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <Loading message="Loading your checkout..." />
    );
  }
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f8fa]">
        <Navbar />
        <Sidebar />
        <main className="min-h-screen pt-14.5 lg:ml-53.75 lg:pt-12">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mb-7">
              <button
                type="button"
                onClick={() => router.push("/cart")}
                className="mb-3 flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-[#00256f]"
              >
                <IoArrowBackOutline size={15} />
                Back to Cart
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00256f] text-white shadow-sm">
                  <IoCardOutline size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-[#071c49] sm:text-2xl">
                    Checkout
                  </h1>
                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                    Complete your order securely.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex min-h-100 items-center justify-center">
              <div className="max-w-sm text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef2f8] text-[#00256f]">
                  <IoCardOutline size={26} />
                </div>
                <h2 className="mt-4 text-base font-bold text-[#071c49]">
                  Your cart is empty
                </h2>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Add some study materials to your cart before
                  proceeding to checkout.
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/cart")}
                  className="mt-5 cursor-pointer rounded-[9px] bg-[#00256f] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#0a337f]"
                >
                  Return to Cart
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Navbar />
      <Sidebar />
      <main className="min-h-screen pt-14.5 lg:ml-53.75 lg:pt-12">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Header */}
          <div className="mb-7">
            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="mb-3 flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-[#00256f]"
            >
              <IoArrowBackOutline size={15} />
              Back to Cart
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00256f] text-white shadow-sm">
                <IoCardOutline size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-[#071c49] sm:text-2xl">
                  Checkout
                </h1>
                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Complete your order securely.
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
              {/* Left */}
              <div className="space-y-5">
                {/* Contact Information */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-5">
                    <h2 className="text-sm font-bold text-[#071c49]">
                      Contact Information
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Enter your details for your order receipt.
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-1.5 block text-[11px] font-semibold text-slate-600"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        {...register("firstName")}
                        className={`h-10 w-full rounded-lg border bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white ${
                          errors.firstName
                            ? "border-red-400"
                            : "border-slate-200"
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
                        className="mb-1.5 block text-[11px] font-semibold text-slate-600"
                      >
                        Last Name
                      </label>

                      <input
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        {...register("lastName")}
                        className={`h-10 w-full rounded-lg border bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white ${
                          errors.lastName
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      />

                      {errors.lastName?.message && (
                        <p className="mt-1 text-[10px] text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-[11px] font-semibold text-slate-600"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...register("email")}
                        className={`h-10 w-full rounded-lg border bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white ${
                          errors.email
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      />

                      {errors.email?.message && (
                        <p className="mt-1 text-[10px] text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-[11px] font-semibold text-slate-600"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        {...register("phone")}
                        className={`h-10 w-full rounded-lg border bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white ${
                          errors.phone
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      />

                      {errors.phone?.message && (
                        <p className="mt-1 text-[10px] text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Payment */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-[#071c49]">
                        Payment Method
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Choose how you want to pay.
                      </p>
                    </div>

                    <IoLockClosedOutline
                      size={17}
                      className="text-[#765313]"
                    />
                  </div>

                  {/* Selected payment method */}
                  <div className="rounded-xl border border-[#00256f] bg-[#f5f7fb] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00256f] text-white">
                        <IoCardOutline size={18} />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-bold text-[#071c49]">
                          Card Payment
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-500">
                          Visa, Mastercard and other supported cards
                        </p>
                      </div>

                      <IoCheckmarkCircleOutline
                        size={19}
                        className="text-[#00256f]"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="cardNumber"
                        className="mb-1.5 block text-[11px] font-semibold text-slate-600"
                      >
                        Card Number
                      </label>

                      <input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="h-10 w-full rounded-lg border border-slate-200 bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="expiry"
                        className="mb-1.5 block text-[11px] font-semibold text-slate-600"
                      >
                        Expiry Date
                      </label>

                      <input
                        id="expiry"
                        type="text"
                        placeholder="MM / YY"
                        className="h-10 w-full rounded-lg border border-slate-200 bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="mb-1.5 block text-[11px] font-semibold text-slate-600"
                      >
                        CVV
                      </label>

                      <input
                        id="cvv"
                        type="password"
                        placeholder="•••"
                        className="h-10 w-full rounded-lg border border-slate-200 bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#f7f8fa] p-3">
                    <MdOutlineVerifiedUser
                      size={17}
                      className="mt-0.5 shrink-0 text-[#765313]"
                    />

                    <p className="text-[9px] leading-4 text-slate-500">
                      Your payment information is securely processed.
                      We do not store your complete card details.
                    </p>
                  </div>
                </section>
              </div>

              {/* Right - Order Summary */}
              <aside>
                <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-sm font-bold text-[#071c49]">
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div className="mt-5 space-y-4">
                    {cartItems.map((item) => {
                      const price = Number(
                        item.material.price?.replace(
                          /[^\d.]/g,
                          ""
                        ) ?? ""
                      );

                      const itemTotal = (
                        (Number.isNaN(price) ? 0 : price) *
                        item.quantity
                      ).toFixed(2);

                      return (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-slate-700">
                              {item.material.title}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              {item.material.subtitle} ×{" "}
                              {item.quantity}
                            </p>
                          </div>

                          <span className="shrink-0 text-xs font-semibold text-[#071c49]">
                            €{itemTotal}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="my-5 border-t border-slate-200" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Subtotal
                      </span>

                      <span className="font-semibold text-slate-700">
                        €{subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Delivery
                      </span>

                      <span className="font-medium text-emerald-600">
                        Free
                      </span>
                    </div>
                  </div>

                  <div className="my-5 border-t border-slate-200" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#071c49]">
                      Total
                    </span>

                    <span className="text-xl font-bold text-[#00256f]">
                      €{total.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-[#00256f] py-3 text-xs font-bold text-white transition hover:bg-[#0a337f] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <span>→</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/cart")}
                    className="mt-3 w-full cursor-pointer rounded-[9px] border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Return to Cart
                  </button>

                  <div className="mt-5 text-center">
                    <p className="text-[9px] leading-4 text-slate-400">
                      By placing your order, you agree to our terms
                      and conditions.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Page;
