"use client";

import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Material } from "./component/home/MaterialImage";
import WelcomeCard from "./component/home/WelcomeCard";
import HeroSection from "./component/home/HeroSection";
import MaterialsSection from "./component/home/MaterialsSection";

function HomeClient({ user }: { user: any }) {
  const router = useRouter();

  const [materials, setMaterials] = useState<Material[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <main className="min-h-screen bg-[#eef1f4] text-[#071c49]">
      <Sidebar />

      <Navbar user={user} />

      <div className="ml-0 pt-14.5 pb-20 lg:ml-53.75 lg:pt-12 lg:pb-0">
        <div className="mx-auto w-full max-w-300 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
            <HeroSection
              onExploreStore={() => handleClick("/")}
            />

            <WelcomeCard
              onSwitchAccount={handleSwitchAccount}
            />
          </section>

          <MaterialsSection
            materials={materials}
            isLoading={isLoading}
            showAll={showAll}
            onToggleShowAll={() =>
              setShowAll((prev) => !prev)
            }
          />
        </div>
      </div>
    </main>
  );
}

export default HomeClient;