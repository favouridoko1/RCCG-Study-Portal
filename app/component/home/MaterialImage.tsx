import { IoBookOutline } from "react-icons/io5";

export type Material = {
  id: number;
  title: string;
  subtitle: string;
  price: string | null;
  tag: string | null;
  type: string;
  action: string;
  href: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

 function MaterialImage({
  material,
}: {
  material: Material;
}) {
  if (material.imageUrl) {
    return (
      <div className="relative h-44 w-full overflow-hidden rounded-t-2xl bg-slate-100">
        <img
          src={material.imageUrl}
          alt={material.title}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-44 w-full items-center justify-center rounded-t-2xl ${
        material.type === "book"
          ? "bg-linear-to-br from-blue-100 to-blue-200"
          : material.type === "training"
            ? "bg-linear-to-br from-amber-100 to-amber-200"
            : material.type === "ethics"
              ? "bg-linear-to-br from-emerald-100 to-emerald-200"
              : "bg-linear-to-br from-slate-100 to-slate-200"
      }`}
    >
      <IoBookOutline className="text-[#00256f]" size={48} />
    </div>
  );
}
export default MaterialImage;