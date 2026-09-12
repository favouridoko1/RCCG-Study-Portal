"use client";

type HeroSectionProps = {
  onExploreStore: () => void;
};

 function HeroSection({
  onExploreStore,
}: HeroSectionProps) {
  return (
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

        <button
          onClick={onExploreStore}
          className="mt-5 cursor-pointer rounded-[9px] bg-[#ffd477] px-5 py-2.5 text-xs font-bold text-[#765313] transition hover:bg-[#ffca58]"
        >
          Explore Store
        </button>
      </div>
    </div>
  );
}

export default HeroSection;