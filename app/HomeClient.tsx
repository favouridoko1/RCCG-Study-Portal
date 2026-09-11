"use client";

import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import { MdOutlineVerifiedUser } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoBookOutline } from "react-icons/io5";
import { RiArrowRightLine } from "react-icons/ri";
import { useCartStore } from "./store/cartStore";
import { GiCheckMark } from "react-icons/gi";
import { toast } from "sonner";

type Material = {
id: number;
title: string;
subtitle: string;
price: string | null;
tag: string | null;
type: string;
action: string;
href: string | null;
createdAt: string;
updatedAt: string;
};


function MaterialImage({ type }: { type: string }) {
if (type === "book") {
return ( <div className="relative h-52.5 overflow-hidden bg-linear-to-br from-[#eef2f4] via-[#d7dde1] to-[#7c8992] sm:h-55"> <div className="absolute left-10 top-10 h-36 w-24 rotate-20 rounded-sm bg-[#122d59] shadow-xl"> <div className="absolute inset-2 border border-[#d6b45e]" />

      <div className="absolute left-3 top-12 text-[9px] text-[#d6b45e]">
        RCCG
      </div>
    </div>

    <div className="absolute right-2 top-3 text-[9px] text-slate-600">
      Welcome to RCCG
    </div>
  </div>
);

}

if (type === "training") {
return ( <div className="relative h-52.5 overflow-hidden bg-linear-to-br from-[#f3f6f6] via-[#d9dfe0] to-[#8e989c] sm:h-55"> <div className="absolute -bottom-8 left-7 h-40 w-40 rotate-12 rounded-lg bg-white/50 blur-[2px]" />

    <div className="absolute right-0 top-0 h-full w-5 bg-white/50" />

    <div className="absolute right-1 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] text-[#173d78] shadow">
      <GiCheckMark />
    </div>
  </div>
);

}

if (type === "ethics") {
return ( <div className="relative h-52.5 overflow-hidden bg-linear-to-br from-[#faf9f4] via-[#eee9df] to-[#ddd4c7] sm:h-55"> <div className="absolute right-0 top-4 h-44 w-4 rounded-sm bg-[#713143] shadow-lg" /> </div>
);
}

return ( <div className="flex h-52.5 items-center justify-center bg-linear-to-br from-[#e9ecee] to-[#d9dddf] sm:h-55"> <div className="text-4xl text-slate-500">▱</div> </div>
);
}

function MaterialSkeleton() {
return ( <article className="overflow-hidden rounded-[5px] border border-slate-300 bg-white p-3 shadow-sm"> <div className="animate-pulse"> <div className="h-52.5 rounded-xs bg-slate-200 sm:h-55" />

    <div className="mt-3 h-4 w-3/4 rounded bg-slate-200" />

    <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />

    <div className="mt-3 h-8 w-full rounded-[9px] bg-slate-200" />
  </div>
</article>

);
}

function HomeClient({ user }: { user: any }) {
const router = useRouter();

const [materials, setMaterials] = useState<Material[]>([]);
const [showAll, setShowAll] = useState(false);
const [isLoading, setIsLoading] = useState(true);

const addToCart = useCartStore((state) => state.addToCart);

useEffect(() => {
const fetchMaterials = async () => {
try {
const response = await fetch("/api/home");

    if (!response.ok) {
      throw new Error("Failed to load materials");
    }

    const data = await response.json();

    if (data.success) {
      setMaterials(data.materials);
    }
  } catch (error) {
    console.error("Failed to load home materials:", error);
  } finally {
    setIsLoading(false);
  }
};

fetchMaterials();

}, []);

const handleClick = (path: string) => {
router.push(path);
};

const handleSwitchAccount = async (path: string) => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    toast.success("Signed out successfully!", {
      description: "You’ve been signed out securely.",
    });

    router.replace(path);
  } catch (error) {
    console.error("Logout failed:", error);

    toast.error("Unable to sign out", {
      description: "Please try again.",
    });
  }
};
const visibleMaterials = showAll
? materials
: materials.slice(0, 4);

return ( <main className="min-h-screen bg-[#eef1f4] text-[#071c49]"> <Sidebar /> <Navbar user={user} />

  <div className="ml-0 pt-14.5 pb-20 lg:ml-53.75 lg:pt-12 lg:pb-0">
    <div className="mx-auto w-full max-w-300 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="relative min-h-67.5 overflow-hidden rounded-lg bg-linear-to-br from-[#182851] to-[#00143f] px-5 py-7 shadow-md sm:px-7 sm:py-8 lg:min-h-64.5">
          <div className="max-w-150">
            <h1 className="text-[32px] font-bold leading-[1.1] tracking-tight text-white sm:text-[38px] lg:text-[40px]">
              Equip Your Spiritual
              <br />
              Journey
            </h1>

            <p className="mt-3 max-w-140 text-[13px] leading-5 text-[#7895d0] sm:text-[14px]">
              Access authoritative study materials, manuals, and
              liturgical resources securely across Europe. Your dedicated
              sanctuary for continuous spiritual growth.
            </p>

            <button className="mt-5 cursor-pointer rounded-[9px] bg-[#ffd477] px-5 py-2.5 text-xs font-bold text-[#765313] transition hover:bg-[#ffca58]">
              Explore Store
            </button>
          </div>
        </div>

        <div className="h-fit rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-1">
            <span className="text-lg text-[#ffbd3d]">
              <MdOutlineVerifiedUser className="text-lg text-[#ffbd3d]" />
            </span>

            <h2 className="text-[20px] font-bold text-[#071c49]">
              Welcome Back
            </h2>
          </div>

          <p className="mt-2 text-[13px] leading-5 text-slate-600">
            Your session is secured with standard DRM protection. Access
            your library offline via the progressive web app.
          </p>

          <div className="mt-3 md:flex lg:flex-col">
            <button
              onClick={() => handleSwitchAccount("/auth/login")}
              className="w-full cursor-pointer rounded-[9px] border-slate-300 py-2.5 text-xs font-bold text-[#071c49] hover:border hover:bg-slate-200"
            >
              Sign In as Different User
            </button>

            <button
              onClick={() => handleSwitchAccount("/auth/signup")}
              className="w-full cursor-pointer rounded-[9px] border-slate-300 py-2.5 text-xs font-bold text-[#071c49] hover:border hover:bg-slate-200"
            >
              Create New Account
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 sm:mt-10">
        <div className="flex items-end justify-between gap-3 border-b border-slate-300 pb-2">
          <h2 className="text-[19px] font-bold text-[#071c49] sm:text-[21px]">
            Featured Study Materials
          </h2>

          {!isLoading && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="flex shrink-0 cursor-pointer items-center gap-px text-xs font-medium text-[#765313] transition hover:text-[#5f430f]"
            >
              {showAll ? "Show Less" : "View All"}

              <RiArrowRightLine
                size={16}
                className={`transition-transform duration-200 ${
                  showAll ? "rotate-90" : ""
                }`}
              />
            </button>
          )}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <MaterialSkeleton key={index} />
              ))
            : visibleMaterials.map((material) => (
                <article
                  key={material.id}
                  className="overflow-hidden rounded-[5px] border border-slate-300 bg-white p-3 shadow-sm"
                >
                  <div className="relative overflow-hidden rounded-xs">
                    <MaterialImage type={material.type} />

                    {material.tag && (
                      <span className="absolute bottom-2 left-2 rounded-full bg-[#ffd477] px-2 py-0.5 text-[10px] font-bold text-[#765313]">
                        {material.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 min-h-9.5 font-serif text-[15px] font-medium leading-4.5 text-[#071c49]">
                    {material.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-600">
                    {material.subtitle}
                  </p>

                  <button
                    onClick={() => {
                      if (
                        material.action === "Read Now" &&
                        material.href
                      ) {
                        router.push(material.href);
                        return;
                      }

                      if (material.action === "Add to Cart") {
                        addToCart({
                          title: material.title,
                          subtitle: material.subtitle,
                          price: material.price ?? "",
                          type: material.type,
                        });
                      }
                    }}
                    className={`mt-3 w-full cursor-pointer rounded-[9px] py-2 text-[11px] font-bold transition ${
                      material.action === "Read Now"
                        ? "border border-slate-300 bg-[#e9ecef] text-[#071c49] hover:bg-slate-200"
                        : "bg-[#00256f] text-white hover:bg-[#0a337f]"
                    }`}
                  >
                    {material.action === "Read Now" ? (
                      <span className="flex items-center justify-center gap-1">
                        <IoBookOutline />
                        <span>Read Now</span>
                      </span>
                    ) : (
                      <span>
                        {material.price} - {material.action}
                      </span>
                    )}
                  </button>
                </article>
              ))}
        </div>
      </section>
    </div>
  </div>
</main>

);
}

export default HomeClient;
