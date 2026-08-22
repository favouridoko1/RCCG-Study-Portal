"use client";

import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscSearch } from "react-icons/vsc";
import { BsBell } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14.5 items-center justify-between bg-[#001640] px-4 text-white shadow-md sm:px-6 lg:left-[215px] lg:h-[48px] lg:px-8">
        {/* Logo / title */}
        <h2 className="text-[20px] font-bold tracking-tight sm:text-[24px] lg:text-[27px]">
          RCCG Europe Portal
        </h2>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          <button className="border-b-2 border-[#ffd477] pb-1 text-xs font-semibold text-[#ffd477]">
            My Shelf
          </button>

          <button className="text-xs font-medium cursor-pointer text-blue-300 hover:text-white">
            Account
          </button>

          <button
            aria-label="Search"
            className="text-xl text-white hover:text-[#ffd477]"
          >
            <VscSearch />
          </button>

          <button
            aria-label="Notifications"
            className="text-lg text-white hover:text-[#ffd477]"
          >
            <BsBell />
          </button>

          <button
            aria-label="Settings"
            className="text-lg text-white hover:text-[#ffd477]"
          >
            <IoSettingsOutline />
          </button>

          <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl border-2 border-[#ffd477] bg-slate-300 text-sm">
            <FaRegUser />
          </div>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            aria-label="Search"
            className="text-xl"
          >
            <VscSearch />
          </button>

          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-xl"
          >
            {menuOpen ? <VscChromeClose /> : <RxHamburgerMenu />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="fixed left-0 right-0 top-14.5 z-40 border-b border-slate-700 bg-[#001640] p-4 shadow-xl lg:hidden">
          <div className="space-y-2">
            <button className="flex w-full rounded-lg bg-white/10 px-4 py-3 text-left text-sm font-semibold text-[#ffd477]">
              My Shelf
            </button>

            <button className="flex w-full rounded-lg px-4 py-3 text-left text-sm text-white hover:bg-white/10">
              Account
            </button>

            <button className="flex w-full rounded-lg px-4 py-3 text-left text-sm text-white hover:bg-white/10">
              Notifications
            </button>

            <button className="flex w-full rounded-lg px-4 py-3 text-left text-sm text-white hover:bg-white/10">
              Settings
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default  Navbar;