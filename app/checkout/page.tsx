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
import { useState } from "react";

 function page() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((total, item) => {
    const price = Number(item.price.replace(/[^\d.]/g, ""));

    return total + (Number.isNaN(price) ? 0 : price);
  }, 0);

  const total = subtotal;

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      router.push("/cart");
      return;
    }

    try {
      setIsProcessing(true);

      // Temporary payment simulation.
      // Replace this later with your real payment provider.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      clearCart();

      router.push("/checkout/success");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f8fa]">
        <Navbar />
        <Sidebar />

        <main className="min-h-screen pt-14.5 lg:ml-53.75 lg:pt-12">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef2f7] text-[#00256f]">
                <IoCardOutline size={26} />
              </div>

              <h1 className="mt-5 text-xl font-bold text-[#071c49]">
                No items to checkout
              </h1>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Your cart is currently empty. Add some study materials before
                proceeding to checkout.
              </p>

              <button
                onClick={() => router.push("/")}
                className="mt-6 cursor-pointer rounded-[9px] bg-[#00256f] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#0a337f]"
              >
                Browse Study Materials
              </button>
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
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                      First Name
                    </label>

                    <input
                      type="text"
                      placeholder="First name"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                      Last Name
                    </label>

                    <input
                      type="text"
                      placeholder="Last name"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white"
                    />
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
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                      Card Number
                    </label>

                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                      Expiry Date
                    </label>

                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-[#fafbfc] px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#00256f] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
                      CVV
                    </label>

                    <input
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
                    Your payment information is securely processed. We do not
                    store your complete card details.
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
                  {items.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-700">
                          {item.title}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {item.subtitle}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs font-semibold text-[#071c49]">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="my-5 border-t border-slate-200" />

                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Subtotal</span>

                    <span className="font-semibold text-slate-700">
                      €{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Delivery</span>

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
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-[#00256f] py-3 text-xs font-bold text-white transition hover:bg-[#0a337f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isProcessing ? (
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
                  onClick={() => router.push("/cart")}
                  className="mt-3 w-full cursor-pointer rounded-[9px] border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Return to Cart
                </button>

                <div className="mt-5 text-center">
                  <p className="text-[9px] leading-4 text-slate-400">
                    By placing your order, you agree to our terms and
                    conditions.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
export default page;