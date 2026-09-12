"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import {
  IoArrowForward,
  IoCalendarOutline,
  IoChevronForward,
  IoReceiptOutline,
} from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import Loading from "../reuseable/Loading";

type OrderItem = {
  id: number;
  orderId: number;
  materialId: number;
  title: string;
  price: string;
  quantity: number;
};

type Order = {
  id: number;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  total: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};

function OrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch("/api/orders");

        if (!response.ok) {
          throw new Error("Unable to load orders.");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Unable to load orders.");
        }

        setOrders(data.orders ?? []);
      } catch (error) {
        console.error("Load orders error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load your orders."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";

      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] lg:py-10">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-5 py-8 lg:ml-53.75 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7edf8]">
                  <IoReceiptOutline className="text-2xl text-[#00256f]" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-[#071c49]">
                    My Orders
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    View and manage your previous orders.
                  </p>
                </div>
              </div>
            </div>

            {/* Loading */}
            {isLoading && (
              <Loading message="Loading your orders..." />
            )}

            {/* Error */}
            {!isLoading && error && (
              <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                  <IoReceiptOutline className="text-2xl text-red-500" />
                </div>

                <h2 className="mt-4 text-lg font-bold text-[#071c49]">
                  Unable to load orders
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-6 rounded-[9px] bg-[#00256f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0a337f]"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && orders.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7edf8]">
                  <MdOutlineShoppingBag className="text-3xl text-[#00256f]" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-[#071c49]">
                  No Orders Yet
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  You haven't placed any orders yet. Browse the available
                  materials and place your first order.
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="mt-6 inline-flex items-center gap-2 rounded-[9px] bg-[#00256f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0a337f]"
                >
                  Start Shopping
                  <IoArrowForward className="text-base" />
                </button>
              </div>
            )}

            {/* Orders */}
            {!isLoading && !error && orders.length > 0 && (
              <div className="space-y-5">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f1f4f8]">
                          <MdOutlineShoppingBag className="text-xl text-[#00256f]" />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-slate-500">
                            Order Number
                          </p>

                          <p className="text-sm font-bold text-[#071c49]">
                            #{order.id}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <IoCalendarOutline className="text-base" />
                          {formatDate(order.createdAt)}
                        </div>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-bold capitalize ${getStatusClasses(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="px-5 py-5">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-4"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-[#071c49]">
                                {item.title}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                Quantity: {item.quantity}
                              </p>
                            </div>

                            <p className="shrink-0 text-sm font-semibold text-[#071c49]">
                              {item.price || "Free"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Footer */}
                    <div className="flex flex-col gap-4 border-t border-slate-200 bg-[#fafbfc] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Order Total
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#071c49]">
                          €{order.total}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/checkout/success?orderId=${order.id}`
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-slate-300 bg-white px-4 py-1.5 cursor-pointer text-sm font-bold text-[#071c49] transition hover:bg-slate-100"
                      >
                        View Order
                        <IoChevronForward className="text-base" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrdersPage;