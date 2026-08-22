"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import {
    FiBookOpen,
    FiGrid,
    FiList,
    FiSearch,
    FiUpload,
} from "react-icons/fi";
import { MdOutlineLibraryBooks, MdOutlineMenuBook } from "react-icons/md";

const shelfMaterials = [
    {
        id: "sunday-school",
        title: "Sunday School Guide 2024",
        subtitle: "Adult Edition 2024",
        type: "sunday",
        progress: null,
    },
    {
        id: "workers-training",
        title: "Workers in Training Manual",
        subtitle: "Revised Edition",
        type: "workers",
        progress: 0,
    },
    {
        id: "open-heavens",
        title: "Open Heavens 2024",
        subtitle: "Daily Devotional",
        type: "open-heavens",
        progress: null,
    },
];

function ShelfCover({ type }: { type: string }) {
    if (type === "sunday") {
        return (
            <div className="relative h-44 overflow-hidden bg-linear-to-br from-[#f2f4f4] via-[#d8dddf] to-[#aab1b4]">
                <div className="absolute left-1/2 top-8 h-28 w-20 -translate-x-1/2 bg-[#123668] shadow-xl">
                    <div className="absolute inset-2 border border-[#d6b45e]" />

                    <div className="absolute inset-x-0 top-7 text-center">
                        <p className="font-serif text-[10px] font-bold leading-3 text-white">
                            Sunday
                        </p>

                        <p className="font-serif text-[10px] font-bold leading-3 text-white">
                            School
                        </p>

                        <p className="font-serif text-[10px] font-bold leading-3 text-white">
                            Guide
                        </p>

                        <p className="mt-2 text-[8px] text-[#d6b45e]">
                            2024
                        </p>
                    </div>
                </div>

                <div className="absolute left-0 top-0 h-full w-1/3 bg-white/20" />
            </div>
        );
    }

    if (type === "workers") {
        return (
            <div className="relative h-44 overflow-hidden bg-linear-to-br from-[#e9edef] via-[#d9ddde] to-[#aab1b3]">
                <div className="absolute left-1/2 top-7 h-32 w-24 -translate-x-1/2 rotate-1 bg-[#f8f8f6] shadow-xl">
                    <div className="absolute inset-2 border border-slate-300" />

                    <div className="absolute inset-x-0 top-8 text-center">
                        <p className="font-serif text-[9px] font-bold text-[#173d78]">
                            WORKERS
                        </p>

                        <p className="font-serif text-[9px] font-bold text-[#173d78]">
                            TRAINING
                        </p>

                        <p className="font-serif text-[9px] font-bold text-[#173d78]">
                            MANUAL
                        </p>

                        <div className="mx-auto mt-3 h-3 w-3 rounded-full border border-[#173d78]" />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#4d4d4d]/20" />
            </div>
        );
    }

    return (
        <div className="relative h-44 overflow-hidden bg-linear-to-br from-[#f4f4f3] via-[#d7d7d5] to-[#a7a7a4]">
            <div className="absolute left-1/2 top-7 h-32 w-24 -translate-x-1/2 bg-linear-to-b from-[#f4f4f2] to-[#c4c4c1] shadow-lg">
                <div className="absolute inset-0 bg-black/5" />

                <div className="absolute inset-x-0 top-12 text-center">
                    <p className="font-serif text-[12px] font-medium text-slate-600">
                        OPEN
                    </p>

                    <p className="font-serif text-[12px] font-medium text-slate-600">
                        HEAVENS
                    </p>

                    <p className="mt-1 font-serif text-[8px] text-slate-500">
                        2024
                    </p>
                </div>
            </div>
        </div>
    );
}

function MyShelfPage() {
    const router = useRouter();

    const continueReading = {
        title: "House Fellowship Manual 2024",
        subtitle: "Lesson 14: The Power of Persistent Prayer in Modern Times.",
        progress: 64,
        currentPage: 128,
        totalPages: 200,
    };

    return (
        <main className="min-h-screen bg-[#f4f6f8] text-[#071c49]">
            <Sidebar />
            <Navbar />

            <div className="ml-0 pb-20 pt-14.5 lg:ml-53.75 lg:pb-0 lg:pt-12">
                <div className="mx-auto w-full max-w-300 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">

                    {/* =================================================
                        PAGE HEADER
                    ================================================= */}
                    <section className="border-b border-slate-300 pb-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-[9px] font-bold uppercase tracking-wide text-[#071c49]">
                                    Welcome Back, Brother Emmanuel
                                </p>

                                <h1 className="mt-1 font-serif text-[27px] font-bold leading-tight text-[#071c49] sm:text-[31px]">
                                    Your Spiritual Library
                                </h1>

                                <p className="mt-1 text-[10px] text-slate-500">
                                    RCCG Covenant Parish, Amsterdam
                                </p>
                            </div>

                            <button
                                onClick={() => router.push("/")}
                                className="flex w-fit items-center cursor-pointer gap-2 rounded-[3px] bg-[#001e61] px-4 py-2.5 text-[9px] font-bold text-white transition hover:bg-[#092b76]"
                            >
                                <FiBookOpen size={11} />
                                Browse Store
                            </button>
                        </div>
                    </section>

                    {/* =================================================
                        CONTINUE READING
                    ================================================= */}
                    <section className="mt-5">
                        <h2 className="mb-2 text-[17px] font-bold text-[#071c49]">
                            Continue Reading
                        </h2>

                        <article className="overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-[125px_1fr]">

                                {/* COVER */}
                                <div className="relative h-45 bg-linear-to-br from-[#d9dcda] to-[#9ba1a1] sm:h-32">
                                    <div className="absolute bottom-0 left-1/2 h-28 w-20 -translate-x-1/2 rotate-[-5deg] bg-[#1a3c65] shadow-xl">
                                        <div className="absolute inset-2 border border-[#b7a467]" />

                                        <div className="absolute inset-x-0 top-10 text-center">
                                            <p className="font-serif text-[7px] text-white">
                                                HOUSE
                                            </p>

                                            <p className="font-serif text-[7px] text-white">
                                                FELLOWSHIP
                                            </p>

                                            <p className="font-serif text-[7px] text-white">
                                                MANUAL
                                            </p>

                                            <p className="mt-1 text-[6px] text-[#d6b45e]">
                                                2024
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* DETAILS */}
                                <div className="p-4">
                                    <div className="flex items-center gap-1">
                                        <span className="rounded-sm bg-[#ffd477] px-1.5 py-0.5 text-[8px] font-bold text-[#765313]">
                                            Volume 3
                                        </span>

                                        <span className="text-[8px] text-slate-400">
                                            ◉ Downloaded
                                        </span>
                                    </div>

                                    <h3 className="mt-1 font-serif text-[14px] font-bold text-[#071c49]">
                                        {continueReading.title}
                                    </h3>

                                    <p className="mt-1 text-[9px] text-slate-600">
                                        {continueReading.subtitle}
                                    </p>

                                    <div className="mt-3 flex items-center justify-between text-[8px] text-slate-600">
                                        <span>
                                            {continueReading.progress}% Complete
                                        </span>

                                        <span>
                                            Page {continueReading.currentPage} of{" "}
                                            {continueReading.totalPages}
                                        </span>
                                    </div>

                                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full rounded-full bg-[#765313]"
                                            style={{
                                                width: `${continueReading.progress}%`,
                                            }}
                                        />
                                    </div>

                                    <button
                                        onClick={() =>
                                            router.push(
                                                "/reader/workers-in-training",
                                            )
                                        }
                                        className="mt-3 cursor-pointer rounded-[3px] bg-[#001e61] px-4 py-2 text-[9px] font-bold text-white transition hover:bg-[#092b76]"
                                    >
                                        Resume Study
                                    </button>
                                </div>
                            </div>
                        </article>
                    </section>

                    {/* =================================================
                        ALL MATERIALS
                    ================================================= */}
                    <section className="mt-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[17px] font-bold text-[#071c49]">
                                All Materials
                            </h2>

                            <div className="flex items-center gap-1">
                                <button className="flex h-7 w-7 items-center justify-center rounded-sm border border-slate-300 bg-white text-[#071c49]">
                                    <FiGrid size={13} />
                                </button>

                                <button className="flex h-7 w-7 items-center justify-center rounded-sm border border-slate-300 bg-white text-slate-500">
                                    <FiList size={13} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-2 grid grid-cols-1 gap-3 min-[500px]:grid-cols-2 lg:grid-cols-4">

                            {shelfMaterials.map((material) => (
                                <article
                                    key={material.id}
                                    className="overflow-hidden rounded-[4px] border border-slate-300 bg-white"
                                >
                                    <ShelfCover type={material.type} />

                                    <div className="px-2 py-2">
                                        <h3 className="font-serif text-[9px] font-bold text-[#071c49]">
                                            {material.title}
                                        </h3>

                                        <p className="mt-0.5 text-[8px] text-slate-500">
                                            {material.subtitle}
                                        </p>
                                    </div>
                                </article>
                            ))}

                            {/* GET MORE BOOKS */}
                            <button
                                onClick={() => router.push("/")}
                                className="group flex min-h-52 flex-col items-center justify-center rounded-[4px] border border-dashed border-slate-400 bg-transparent transition hover:border-[#00256f] hover:bg-white"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-400 text-slate-500 transition group-hover:border-[#00256f] group-hover:text-[#00256f]">
                                    +
                                </span>

                                <span className="mt-2 text-[9px] text-slate-500 group-hover:text-[#00256f]">
                                    Get More Books
                                </span>
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            {/* MOBILE NAV */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-300 bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.08)] lg:hidden">
                <div className="grid h-16 grid-cols-4">
                    <button
                        onClick={() => router.push("/")}
                        className="flex flex-col items-center justify-center gap-1 text-slate-500"
                    >
                        <span className="text-xl">⌂</span>
                        <span className="text-[10px]">Home</span>
                    </button>

                    <button
                        onClick={() => router.push("/my-shelf")}
                        className="flex flex-col items-center justify-center gap-1 text-[#001e61]"
                    >
                        <MdOutlineLibraryBooks className="text-xl" />
                        <span className="text-[10px] font-bold">Shelf</span>
                    </button>

                    <button
                        onClick={() => router.push("/account-settings")}
                        className="flex flex-col items-center justify-center gap-1 text-slate-500"
                    >
                        <span className="text-xl">♙</span>
                        <span className="text-[10px]">Account</span>
                    </button>

                    <button className="flex flex-col items-center justify-center gap-1 text-slate-500">
                        <span className="text-xl">⚙</span>
                        <span className="text-[10px]">Settings</span>
                    </button>
                </div>
            </nav>
        </main>
    );
}

export default MyShelfPage;