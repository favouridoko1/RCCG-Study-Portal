"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/app/component/Navbar";
import Sidebar from "@/app/component/Sidebar";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import Loading from "@/app/reuseable/Loading";

type Order = {
  id: number;
  status: string;
  total: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/orders/${orderId}`);

        if (!response.ok) {
          throw new Error("Unable to load order.");
        }

        const data = await response.json();

        setOrder(data.order);
      } catch (error) {
        console.error("Load order error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <Loading message="Loading your order..." />
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f7f8fa]">
        <Navbar />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 px-5 py-10 lg:ml-53.75">
            <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
              <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h1 className="text-xl font-bold text-[#071c49]">
                  Order Not Found
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  We could not find the order you are looking for.
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="mt-6 inline-flex items-center gap-2 rounded-[9px] bg-[#00256f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0a337f]"
                >
                  Continue Shopping
                  <IoArrowForward className="text-base" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-5 py-10 lg:ml-53.75">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <IoCheckmarkCircle className="text-5xl text-green-600" />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-[#071c49]">
                Order Placed Successfully
              </h1>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Thank you for your order, {order.firstName}. Your order has
                been received successfully.
              </p>

              <div className="mt-8 rounded-xl border border-slate-200 bg-[#f8f9fb] p-5 text-left">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <MdOutlineShoppingBag className="text-2xl text-[#00256f]" />

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Order Number
                    </p>

                    <p className="text-sm font-bold text-[#071c49]">
                      #{order.id}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Customer
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#071c49]">
                      {order.firstName} {order.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Status
                    </p>

                    <p className="mt-1 text-sm font-semibold capitalize text-green-600">
                      {order.status}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Email
                    </p>

                    <p className="mt-1 wrap-break-word text-sm font-semibold text-[#071c49]">
                      {order.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#071c49]">
                      {order.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      Total
                    </span>

                    <span className="text-lg font-bold text-[#071c49]">
                      €{order.total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#00256f] px-4 py-1.5 cursor-pointer text-sm font-bold text-white transition hover:bg-[#0a337f]"
                >
                  Continue Shopping
                  <IoArrowForward className="text-base" />
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/orders")}
                  className="inline-flex items-center justify-center rounded-[9px] border border-slate-300 bg-[#e9ecef] px-4 py-1.5 cursor-pointer text-sm font-bold text-[#071c49] transition hover:bg-slate-200"
                >
                  View My Orders
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

 function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7f8fa]">
          <Navbar />

          <div className="flex">
            <Sidebar />

            <main className="flex-1 px-5 py-10 lg:ml-53.75">
              <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
                <p className="text-sm font-medium text-slate-500">
                  Loading your order...
                </p>
              </div>
            </main>
          </div>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
export default CheckoutSuccessPage;