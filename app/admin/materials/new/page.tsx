"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IoArrowBack, IoBookOutline } from "react-icons/io5";

export default function NewMaterialPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    price: "",
    tag: "",
    type: "book",
    action: "Add to Cart",
    href: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add material.");
      }

      toast.success("Book added successfully!", {
        description: `${form.title} is now available in the store.`,
      });

      router.push("/");
    } catch (error) {
      console.error("Add material error:", error);

      toast.error("Unable to add book", {
        description:
          error instanceof Error
            ? error.message
            : "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa] px-5 py-8 lg:ml-53.75 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#00256f] hover:text-[#001a50]"
        >
          <IoArrowBack size={18} />
          Back
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00256f] text-white">
            <IoBookOutline size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#071c49]">
              Add New Book
            </h1>
            <p className="text-sm text-slate-500">
              Add a new study material to the store.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
        >
          <div className="grid gap-5">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-[#071c49]"
              >
                Book Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Sunday School Guide 2026"
                className="w-full rounded-[9px] border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#00256f] focus:ring-2 focus:ring-[#00256f]/10"
              />
            </div>

            <div>
              <label
                htmlFor="subtitle"
                className="mb-2 block text-sm font-semibold text-[#071c49]"
              >
                Subtitle / Edition
              </label>

              <input
                id="subtitle"
                name="subtitle"
                type="text"
                value={form.subtitle}
                onChange={handleChange}
                required
                placeholder="e.g. Adult Edition"
                className="w-full rounded-[9px] border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#00256f] focus:ring-2 focus:ring-[#00256f]/10"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-[#071c49]"
                >
                  Price
                </label>

                <input
                  id="price"
                  name="price"
                  type="text"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. €12.99"
                  className="w-full rounded-[9px] border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#00256f] focus:ring-2 focus:ring-[#00256f]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="tag"
                  className="mb-2 block text-sm font-semibold text-[#071c49]"
                >
                  Tag
                </label>

                <input
                  id="tag"
                  name="tag"
                  type="text"
                  value={form.tag}
                  onChange={handleChange}
                  placeholder="e.g. NEW"
                  className="w-full rounded-[9px] border border-slate-300 px-4 py-3 text-sm uppercase outline-none transition focus:border-[#00256f] focus:ring-2 focus:ring-[#00256f]/10"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-semibold text-[#071c49]"
                >
                  Material Type
                </label>

                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded-[9px] border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#00256f] focus:ring-2 focus:ring-[#00256f]/10"
                >
                  <option value="book">Book</option>
                  <option value="training">Training</option>
                  <option value="ethics">Ethics</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="action"
                  className="mb-2 block text-sm font-semibold text-[#071c49]"
                >
                  Button Action
                </label>

                <select
                  id="action"
                  name="action"
                  value={form.action}
                  onChange={handleChange}
                  className="w-full rounded-[9px] border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#00256f] focus:ring-2 focus:ring-[#00256f]/10"
                >
                  <option value="Add to Cart">Add to Cart</option>
                  <option value="Read Now">Read Now</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="href"
                className="mb-2 block text-sm font-semibold text-[#071c49]"
              >
                Reader URL
              </label>

              <input
                id="href"
                name="href"
                type="text"
                value={form.href}
                onChange={handleChange}
                placeholder="e.g. /reader/sunday-school-guide"
                className="w-full rounded-[9px] border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#00256f] focus:ring-2 focus:ring-[#00256f]/10"
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Only needed when the button action is Read Now.
              </p>
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="mb-2 block text-sm font-semibold text-[#071c49]"
              >
                Cover Image URL
              </label>

              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/book-cover.jpg"
                className="w-full rounded-[9px] border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#00256f] focus:ring-2 focus:ring-[#00256f]/10"
              />

              <p className="mt-1.5 text-xs text-slate-500">
                We'll add direct image uploading later.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="rounded-[9px] border border-slate-300 px-5 py-3 text-sm font-bold text-[#071c49] transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-[9px] bg-[#00256f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0a337f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Adding Book..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}