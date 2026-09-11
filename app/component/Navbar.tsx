"use client";

import { useState } from "react";
import { VscChromeClose, VscSearch } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { ToastClassnames, toast } from "sonner";
import {
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useCartStore } from "../store/cartStore";

function Navbar({ user }: { user?: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();

  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.length;

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Unable to sign out", {
          description:
            result.message || "Something went wrong. Please try again.",
        });
        return;
      }

      setProfileOpen(false);
      setMenuOpen(false);

      toast.success("Signed out successfully!", {
        description:
          "You have been securely signed out of the RCCG Study Portal.",
      });

      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);

      toast.error("Unable to sign out", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14.5 items-center justify-between bg-[#001640] px-4 text-white shadow-md sm:px-6 lg:left-53.75 lg:h-12 lg:px-8">
        {/* Portal Title */}
        <h2 className="text-[20px] font-bold tracking-tight sm:text-xl md:text-2xl lg:text-[27px]">
          RCCG Europe Portal
        </h2>
        <div className="hidden items-center gap-6 lg:flex">
          {/* My Shelf */}
          <button
            onClick={() => router.push("/shelf")}
            className="cursor-pointer border-b-2 border-[#ffd477] pb-1 text-xs font-semibold text-[#ffd477]"
          >
            My Shelf
          </button>
          <button
            onClick={() => router.push("/account")}
            className="cursor-pointer text-xs font-medium text-blue-300 transition hover:text-white"
          >
            Account
          </button>
          <button
            aria-label="Search"
            className="cursor-pointer text-xl text-white transition hover:text-[#ffd477]"
          >
            <VscSearch />
          </button>
          <button
            onClick={() => router.push("/cart")}
            aria-label="Shopping Cart"
            className="relative cursor-pointer text-xl text-white transition hover:text-[#ffd477]"
          >
            <GrCart />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ffd477] px-1 text-[9px] font-bold text-[#071c49]">
                {cartCount}
              </span>
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-label="Open account menu"
              aria-expanded={profileOpen}
              className="flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-xl border-2 border-[#ffd477] bg-slate-300 text-sm text-[#071c49] transition hover:bg-white"
            >
              <FaRegUser />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-11 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                {/* User Information */}
                <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8edf5] text-[#00256f]">
                    <FaRegUser size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#071c49]">
                      {user?.name || user?.username || "User"}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-slate-400">
                      {user?.email || "No email available"}
                    </p>
                  </div>
                </div>

                {/* Account */}
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    // router.push("/account");
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#00256f]"
                >
                  <FaRegUser size={14} />
                  Account
                </button>

                {/* Account Settings */}
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    router.push("/account/settings");
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#00256f]"
                >
                  <IoSettingsOutline size={15} />
                  Account Settings
                </button>

                <div className="mx-3 border-t border-slate-100" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-xs font-medium text-red-500 transition hover:bg-red-50"
                >
                  <IoLogOutOutline size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center lg:hidden">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-white/10 text-xl transition hover:bg-white/20"
          >
            {menuOpen ? <VscChromeClose /> : <RxHamburgerMenu />}
          </button>
        </div>
      </header>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed left-0 right-0 top-14.5 z-40 border-b border-slate-700 bg-[#001640] p-4 shadow-xl lg:hidden">
          <div className="space-y-2">
            {/* My Shelf */}
            <button
              onClick={() => {
                setMenuOpen(false);
                router.push("/shelf");
              }}
              className="flex w-full cursor-pointer rounded-lg bg-white/10 px-4 py-3 text-left text-sm font-semibold text-[#ffd477]"
            >
              My Shelf
            </button>
            {/* Account */}
            <button
              onClick={() => {
                setMenuOpen(false);
                router.push("/account");
              }}
              className="flex w-full cursor-pointer rounded-lg px-4 py-3 text-left text-sm text-white transition hover:bg-white/10"
            >
              Account
            </button>

            {/* Search */}
            <button
              onClick={() => {
                setMenuOpen(false);
                // Add search functionality here later
              }}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-white transition hover:bg-white/10"
            >
              <VscSearch size={18} />
              Search
            </button>

            {/* Cart */}
            <button
              onClick={() => {
                setMenuOpen(false);
                router.push("/cart");
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-left text-sm text-white transition hover:bg-white/10"
            >
              <span className="flex items-center gap-3">
                <GrCart size={18} />
                Shopping Cart
              </span>

              {cartCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ffd477] px-1.5 text-[9px] font-bold text-[#071c49]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account Settings */}
            <button
              onClick={() => {
                setMenuOpen(false);
                router.push("/account/settings");
              }}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm text-white transition hover:bg-white/10"
            >
              <IoSettingsOutline size={18} />
              Account Settings
            </button>
            <div className="border-t border-white/10 pt-2" />
            <button
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
            >
              <IoLogOutOutline size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;