"use client";

import { RiArrowRightLine } from "react-icons/ri";
import MaterialCard from "./MaterialCard";
import MaterialSkeleton from "./MaterialSkeleton";
import { Material } from "./MaterialImage";

type MaterialsSectionProps = {
  materials: Material[];
  isLoading: boolean;
  showAll: boolean;
  onToggleShowAll: () => void;
};

function MaterialsSection({
  materials,
  isLoading,
  showAll,
  onToggleShowAll,
}: MaterialsSectionProps) {
  const visibleMaterials = showAll
    ? materials
    : materials.slice(0, 4);

  return (
    <section className="mt-8 sm:mt-10">
      <div className="flex items-end justify-between gap-3 border-b border-slate-300 pb-2">
        <h2 className="text-[19px] font-bold text-[#071c49] sm:text-[21px]">
          Featured Study Materials
        </h2>

        {!isLoading && (
          <button
            onClick={onToggleShowAll}
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
              <MaterialCard
                key={material.id}
                material={material}
              />
            ))}
      </div>
    </section>
  );
}

export default MaterialsSection;