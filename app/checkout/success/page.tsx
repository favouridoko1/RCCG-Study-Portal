"use client";

import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import { IoCheckmarkCircleOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Navbar />
      <Sidebar />

      <main className="min-h-screen pt-14.5 lg:ml-53.75 lg:pt-12">
        <div className="mx-auto flex max-w-3xl justify-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <IoCheckmarkCircleOutline size={36} />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#765313]">
              Order Successful
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#071c49]">
              Thank You for Your Purchase
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Your study materials have been added to your account. You can
              access your purchased materials from your shelf.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => router.push("/my-shelf")}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-[#00256f] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#0a337f]"
              >
                <MdOutlineLibraryBooks size={16} />
                Go to My Shelf
              </button>

              <button
                onClick={() => router.push("/")}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-[9px] border border-slate-200 px-6 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <IoHomeOutline size={16} />
                Back Home
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page