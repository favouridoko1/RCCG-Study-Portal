"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import rccglogo from "../../public/rccglogo.png";
import { MdLockOutline } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineLibraryBooks } from "react-icons/md";

const navItems = [
    {
        label: "Home",
        icon: <GoHomeFill />,
        path: "/",
    },
    {
        label: "My Shelf",
        icon: <MdOutlineLibraryBooks />,
        path: "/my-shelf",
    },
    // {
    //     label: "Account Settings",
    //     icon: <FaRegUser />,
    //     path: "/account-settings",
    //     // path: "/"
    // },
];

function Sidebar() {
    const router = useRouter();

    // const handleLogout = async () => {
    //     try {
    //         const response = await fetch("/api/auth/logout", {
    //             method: "POST",
    //         });

    //         const result = await response.json();

    //         if (!response.ok) {
    //             console.error("Logout failed:", result.message);
    //             return;
    //         }

    //         router.replace("/auth/login");
    //     } catch (error) {
    //         console.error("Logout error:", error);
    //     }
    // };
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-53.75 flex-col border-r border-slate-300 bg-[#f1f3f6] lg:flex">
            <div className="flex flex-col items-center border-b border-slate-300 px-5 pb-5 pt-4">
                <figure>
                    <Image
                        src={rccglogo}
                        alt="Logo"
                        width={60}
                        height={60}
                    />
                </figure>

                <h1 className="text-center text-xl font-bold text-[#071c49]">
                    Study Portal
                </h1>
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-700">
                    <MdLockOutline />
                    Secure Session Active
                </p>
            </div>
            <nav className="flex-1 px-3 pt-5">
                <div className="space-y-1.5">
                    {navItems.map((item) => {
                        const isActive =
                            item.path === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.path);
                        return (
                            <button
                                key={item.label}
                                onClick={() => router.push(item.path)}
                                className={`flex w-full cursor-pointer items-center gap-1.5 rounded-[10px] px-3 py-3 text-left text-[13px] font-semibold transition ${isActive
                                    ? "bg-[#ffd477] text-[#765313]"
                                    : "text-slate-700 hover:bg-slate-200"
                                    }`}
                            >
                                <span className="w-5 text-center text-lg">
                                    {item.icon}
                                </span>

                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>
            <div className="border-t border-slate-300 px-5 pb-4 pt-3">
                <button className="mb-4 w-full rounded-[9px] bg-[#001e61] py-2.5 text-xs font-semibold text-white transition hover:bg-[#092b76]">
                    Refresh Library
                </button>
                <button className="flex w-full items-center gap-2 px-2 text-[13px] font-medium text-slate-600">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-500 text-[11px]">
                        ?
                    </span>
                    Help &amp; Support
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;