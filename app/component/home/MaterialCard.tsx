"use client";

import { useRouter } from "next/navigation";
import { IoBookOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useCartStore } from "../../store/cartStore";
import MaterialImage, { Material } from "./MaterialImage";

function MaterialCard({
  material,
}: {
  material: Material;
}) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAction = async () => {
    if (material.action === "Read Now" && material.href) {
      router.push(material.href);
      return;
    }

    if (material.action === "Add to Cart") {
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            materialId: material.id,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to add material to cart.");
        }

        addToCart({
          title: material.title,
          subtitle: material.subtitle,
          price: material.price ?? "",
          type: material.type,
        });

        toast.success(
          data.message === "Material is already in your cart."
            ? "Already in cart"
            : "Added to cart",
          {
            description: material.title,
          }
        );
      } catch (error) {
        console.error("Add to cart error:", error);

        toast.error("Unable to add to cart", {
          description: "Please try again.",
        });
      }
    }
  };

  return (
    <article className="overflow-hidden rounded-[5px] border border-slate-300 bg-white p-3 shadow-sm">
      <div className="relative overflow-hidden rounded-xs">
        <MaterialImage material={material} />

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
        onClick={handleAction}
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
  );
}

export default MaterialCard;