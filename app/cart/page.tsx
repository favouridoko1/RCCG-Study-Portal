// "use client";

// import Navbar from "../component/Navbar";
// import Sidebar from "../component/Sidebar";
// import { useCartStore } from "../store/cartStore";
// import {
//   IoArrowBackOutline,
//   IoBookOutline,
//   IoCartOutline,
//   IoTrashOutline,
// } from "react-icons/io5";
// import { MdOutlineVerifiedUser } from "react-icons/md";
// import { useRouter } from "next/navigation";
// import { FaArrowRightLong } from "react-icons/fa6";

//  function page() {
//   const router = useRouter();

//   const items = useCartStore((state) => state.items);
//   const removeFromCart = useCartStore((state) => state.removeFromCart);

//   const subtotal = items.reduce((total, item) => {
//     const price = Number(item.price.replace(/[^\d.]/g, ""));
//     return total + (Number.isNaN(price) ? 0 : price);
//   }, 0);

//   const total = subtotal;

//   return (
//     <div className="min-h-screen bg-[#f7f8fa]">
//       <Navbar />
//       <Sidebar />

//       <main className="min-h-screen pt-14.5 lg:ml-53.75 lg:pt-12">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
//           <div className="mb-7 flex items-center justify-between">
//             <div>
//               <button
//                 onClick={() => router.push("/")}
//                 className="mb-3 flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-[#00256f]"
//               >
//                 <IoArrowBackOutline size={15} />
//                 Back to Study Materials
//               </button>

//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00256f] text-white shadow-sm">
//                   <IoCartOutline size={20} />
//                 </div>

//                 <div>
//                   <h1 className="text-xl font-bold tracking-tight text-[#071c49] sm:text-2xl">
//                     Shopping Cart
//                   </h1>

//                   <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
//                     Review the study materials you want to purchase.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {items.length === 0 ? (
//             /* Empty Cart */
//             <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
//               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef2f7] text-[#00256f]">
//                 <IoCartOutline size={30} />
//               </div>

//               <h2 className="mt-5 text-lg font-bold text-[#071c49]">
//                 Your cart is empty
//               </h2>

//               <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
//                 You haven't added any study materials to your cart yet.
//                 Browse the available resources and add the materials you need.
//               </p>

//               <button
//                 onClick={() => router.push("/")}
//                 className="mt-6 cursor-pointer rounded-[9px] bg-[#00256f] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#0a337f]"
//               >
//                 Browse Study Materials
//               </button>
//             </div>
//           ) : (
//             <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
//               {/* Cart Items */}
//               <section>
//                 <div className="mb-3 flex items-center justify-between">
//                   <h2 className="text-sm font-bold text-[#071c49]">
//                     Cart Items
//                   </h2>

//                   <span className="text-xs text-slate-500">
//                     {items.length} {items.length === 1 ? "item" : "items"}
//                   </span>
//                 </div>

//                 <div className="space-y-3">
//                   {items.map((item) => (
//                     <div
//                       key={item.title}
//                       className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
//                     >
//                       <div className="flex gap-4">
//                         {/* Material Icon */}
//                         <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-lg bg-[#eef1f5] text-[#00256f]">
//                           <IoBookOutline size={25} />
//                         </div>

//                         {/* Details */}
//                         <div className="min-w-0 flex-1">
//                           <div className="flex items-start justify-between gap-3">
//                             <div>
//                               <h3 className="text-sm font-bold text-[#071c49]">
//                                 {item.title}
//                               </h3>

//                               <p className="mt-1 text-xs text-slate-500">
//                                 {item.subtitle}
//                               </p>

//                               <span className="mt-2 inline-flex rounded-full bg-[#f1f3f6] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
//                                 {item.type}
//                               </span>
//                             </div>

//                             <p className="shrink-0 text-sm font-bold text-[#00256f]">
//                               {item.price}
//                             </p>
//                           </div>

//                           <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
//                             <span className="text-[10px] text-slate-400">
//                               Digital study material
//                             </span>

//                             <button
//                               onClick={() => removeFromCart(item.title)}
//                               className="flex cursor-pointer items-center gap-1 text-[11px] font-medium text-slate-400 transition hover:text-red-500"
//                             >
//                               <IoTrashOutline size={14} />
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Continue Shopping */}
//                 <button
//                   onClick={() => router.push("/")}
//                   className="mt-5 flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#00256f] transition hover:text-[#765313]"
//                 >
//                   <IoArrowBackOutline size={15} />
//                   Continue Shopping
//                 </button>
//               </section>

//               {/* Order Summary */}
//               <aside>
//                 <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                   <h2 className="text-sm font-bold text-[#071c49]">
//                     Order Summary
//                   </h2>

//                   <div className="mt-5 space-y-3">
//                     <div className="flex items-center justify-between text-xs">
//                       <span className="text-slate-500">Subtotal</span>
//                       <span className="font-semibold text-slate-700">
//                         €{subtotal.toFixed(2)}
//                       </span>
//                     </div>

//                     <div className="flex items-center justify-between text-xs">
//                       <span className="text-slate-500">Delivery</span>
//                       <span className="font-medium text-emerald-600">
//                         Free
//                       </span>
//                     </div>
//                   </div>

//                   <div className="my-5 border-t border-slate-200" />

//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-bold text-[#071c49]">
//                       Total
//                     </span>

//                     <span className="text-xl font-bold text-[#00256f]">
//                       €{total.toFixed(2)}
//                     </span>
//                   </div>

//                   <button
//                  onClick={() => router.push("/checkout")}
//                     className="mt-6 flex w-full cursor-pointer items-center justify-center gap-1 rounded-[9px] bg-[#00256f] py-3 text-xs font-bold text-white transition hover:bg-[#0a337f]"
//                   >
//                     Proceed to Checkout <FaArrowRightLong />
//                   </button>
//                   <div className="mt-5 flex items-start gap-2 rounded-lg bg-[#f7f8fa] p-3">
//                     <MdOutlineVerifiedUser
//                       size={17}
//                       className="mt-0.5 shrink-0 text-[#765313]"
//                     />

//                     <div>
//                       <p className="text-[10px] font-bold text-[#071c49]">
//                         Secure Checkout
//                       </p>

//                       <p className="mt-0.5 text-[9px] leading-4 text-slate-500">
//                         Your order and payment information are protected.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </aside>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default page;

"use client";

import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { useCartStore } from "../store/cartStore";
import {
  IoArrowBackOutline,
  IoBookOutline,
  IoCartOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";

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

function page() {
  const router = useRouter();

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart");

        if (!response.ok) {
          throw new Error("Failed to load cart");
        }

        const data = await response.json();

        if (data.success) {
          setItems(data.cart.items ?? []);
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = items.reduce((total, item) => {
    const price = Number(
      item.material.price?.replace(/[^\d.]/g, "") ?? ""
    );

    return (
      total +
      (Number.isNaN(price) ? 0 : price) * item.quantity
    );
  }, 0);

  const total = subtotal;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f8fa]">
        <Navbar />
        <Sidebar />

        <main className="min-h-screen pt-14.5 lg:ml-53.75 lg:pt-12">
          <div className="flex min-h-100 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-slate-200 border-t-[#00256f]" />

              <p className="text-xs font-medium text-slate-500">
                Loading cart...
              </p>
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
          <div className="mb-7 flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push("/")}
                className="mb-3 flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-[#00256f]"
              >
                <IoArrowBackOutline size={15} />
                Back to Study Materials
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00256f] text-white shadow-sm">
                  <IoCartOutline size={20} />
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-tight text-[#071c49] sm:text-2xl">
                    Shopping Cart
                  </h1>

                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                    Review the study materials you want to purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef2f7] text-[#00256f]">
                <IoCartOutline size={30} />
              </div>

              <h2 className="mt-5 text-lg font-bold text-[#071c49]">
                Your cart is empty
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                You haven't added any study materials to your cart yet.
                Browse the available resources and add the materials you need.
              </p>

              <button
                onClick={() => router.push("/")}
                className="mt-6 cursor-pointer rounded-[9px] bg-[#00256f] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#0a337f]"
              >
                Browse Study Materials
              </button>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-[#071c49]">
                    Cart Items
                  </h2>

                  <span className="text-xs text-slate-500">
                    {items.length}{" "}
                    {items.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-lg bg-[#eef1f5] text-[#00256f]">
                          <IoBookOutline size={25} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-bold text-[#071c49]">
                                {item.material.title}
                              </h3>

                              <p className="mt-1 text-xs text-slate-500">
                                {item.material.subtitle}
                              </p>

                              <span className="mt-2 inline-flex rounded-full bg-[#f1f3f6] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                                {item.material.type}
                              </span>
                            </div>

                            <p className="shrink-0 text-sm font-bold text-[#00256f]">
                              {item.material.price}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                            <span className="text-[10px] text-slate-400">
                              Digital study material
                            </span>

                            <button
                              onClick={async () => {
                                try {
                                  const response = await fetch("/api/cart", {
                                    method: "DELETE",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      materialId: item.material.id,
                                    }),
                                  });

                                  const data = await response.json();

                                  if (!response.ok) {
                                    throw new Error(
                                      data.message || "Unable to remove material from cart."
                                    );
                                  }

                                  setItems((currentItems) =>
                                    currentItems.filter(
                                      (currentItem) => currentItem.material.id !== item.material.id
                                    )
                                  );

                                  removeFromCart(item.material.title);
                                } catch (error) {
                                  console.error("Remove from cart error:", error);
                                }
                              }}
                              className="flex cursor-pointer items-center gap-1 text-[11px] font-medium text-slate-400 transition hover:text-red-500"
                            >
                              <IoTrashOutline size={14} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => router.push("/")}
                  className="mt-5 flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#00256f] transition hover:text-[#765313]"
                >
                  <IoArrowBackOutline size={15} />
                  Continue Shopping
                </button>
              </section>

              <aside>
                <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-sm font-bold text-[#071c49]">
                    Order Summary
                  </h2>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Subtotal
                      </span>

                      <span className="font-semibold text-slate-700">
                        €{subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
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
                    onClick={() => router.push("/checkout")}
                    className="mt-6 flex w-full cursor-pointer items-center justify-center gap-1 rounded-[9px] bg-[#00256f] py-3 text-xs font-bold text-white transition hover:bg-[#0a337f]"
                  >
                    Proceed to Checkout <FaArrowRightLong />
                  </button>

                  <div className="mt-5 flex items-start gap-2 rounded-lg bg-[#f7f8fa] p-3">
                    <MdOutlineVerifiedUser
                      size={17}
                      className="mt-0.5 shrink-0 text-[#765313]"
                    />

                    <div>
                      <p className="text-[10px] font-bold text-[#071c49]">
                        Secure Checkout
                      </p>

                      <p className="mt-0.5 text-[9px] leading-4 text-slate-500">
                        Your order and payment information are protected.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default page;