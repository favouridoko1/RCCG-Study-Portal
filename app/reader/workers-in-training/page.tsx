"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdCloudDone, IoMdLock } from "react-icons/io";
import {
  FiArrowLeft,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
  FiFlag,
  FiMenu,
  FiMoon,
  FiMoreVertical,
  FiSearch,
  FiSun,
  FiType,
  FiX,
} from "react-icons/fi";

type Chapter = {
  id: string;
  title: string;
  page: number;
};

const chapters: Chapter[] = [
  {
    id: "foreword",
    title: "Foreword",
    page: 1,
  },
  {
    id: "foundation",
    title: "Chapter 1: The Foundation",
    page: 18,
  },
  {
    id: "precision",
    title: "Chapter 2: Liturgical Precision",
    page: 45,
  },
  {
    id: "universalism",
    title: "Chapter 3: European Universalism",
    page: 72,
  },
  {
    id: "sanctuaries",
    title: "Chapter 4: Modern Sanctuaries",
    page: 104,
  },
];

function WorkersInTrainingReader() {
  const router = useRouter();

  const [activeChapter, setActiveChapter] = useState(2);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileToc, setShowMobileToc] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  const active = chapters[activeChapter];

  const filteredChapters = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return chapters;
    }

    return chapters.filter((chapter) =>
      chapter.title.toLowerCase().includes(query),
    );
  }, [search]);

  const goToChapter = (index: number) => {
    setActiveChapter(index);
    setShowMobileToc(false);
  };

  const previousPage = () => {
    if (activeChapter > 0) {
      setActiveChapter((current) => current - 1);
    }
  };

  const nextPage = () => {
    if (activeChapter < chapters.length - 1) {
      setActiveChapter((current) => current + 1);
    }
  };

  return (
    <main
      className={`min-h-screen ${
        darkMode
          ? "bg-[#111827] text-slate-100"
          : "bg-[#f4f6f8] text-[#071c49]"
      }`}
    >
      {/* ============================================================
          DESKTOP SIDEBAR
      ============================================================ */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden w-55.75 border-r lg:block ${
          darkMode
            ? "border-slate-700 bg-[#172033]"
            : "border-slate-200 bg-[#f1f4f6]"
        }`}
      >
        {/* TABLE OF CONTENTS TITLE */}
        <div
          className={`flex h-11 items-center gap-2 border-b px-5 ${
            darkMode
              ? "border-slate-700"
              : "border-slate-200"
          }`}
        >
          <FiBookOpen
            className={
              darkMode ? "text-slate-300" : "text-[#071c49]"
            }
            size={12}
          />

          <span
            className={`font-serif text-[11px] font-bold ${
              darkMode ? "text-slate-100" : "text-[#071c49]"
            }`}
          >
            Table of Contents
          </span>
        </div>

        {/* SEARCH */}
        <div
          className={`border-b p-3 ${
            darkMode
              ? "border-slate-700"
              : "border-slate-200"
          }`}
        >
          <div
            className={`flex h-8 items-center gap-2 rounded border px-2.5 ${
              darkMode
                ? "border-slate-600 bg-[#111827]"
                : "border-slate-200 bg-white"
            }`}
          >
            <FiSearch
              size={12}
              className="shrink-0 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search inside book..."
              className={`min-w-0 flex-1 bg-transparent text-[10px] outline-none ${
                darkMode
                  ? "text-slate-200 placeholder:text-slate-500"
                  : "text-slate-600 placeholder:text-slate-400"
              }`}
            />
          </div>
        </div>

        {/* CHAPTERS */}
        <div className="px-0.5 py-2">
          {filteredChapters.map((chapter) => {
            const index = chapters.findIndex(
              (item) => item.id === chapter.id,
            );

            const selected = activeChapter === index;

            return (
              <button
                key={chapter.id}
                onClick={() => goToChapter(index)}
                className={`block w-full border-l-2 px-5 py-2.5 text-left font-serif text-[10px] leading-4 transition ${
                  selected
                    ? "border-[#00256f] bg-[#00256f] text-white"
                    : darkMode
                      ? "border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                      : "border-transparent text-slate-600 hover:bg-slate-200"
                }`}
              >
                {chapter.title}
              </button>
            );
          })}
        </div>
      </aside>

      {/* ============================================================
          MAIN READER
      ============================================================ */}
      <section className="lg:ml-55.75">
        {/* ==========================================================
            HEADER
        ========================================================== */}
        <header
          className={`fixed left-0 right-0 top-0 z-30 h-12 border-b lg:left-55.75 ${
            darkMode
              ? "border-slate-700 bg-[#111827]"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="relative flex h-full items-center justify-between px-3 sm:px-4">
            {/* LEFT */}
            <div className="flex items-center gap-2">
              {/* MOBILE MENU */}
              <button
                onClick={() => setShowMobileToc(true)}
                className="rounded p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
                aria-label="Open table of contents"
              >
                <FiMenu size={15} />
              </button>

              {/* EXIT */}
              <button
                onClick={() => router.back()}
                className={`flex items-center gap-1.5 cursor-pointer rounded border px-2.5 py-1.5 text-[9px] font-medium transition ${
                  darkMode
                    ? "border-slate-600 text-slate-200 hover:bg-slate-800"
                    : "border-slate-300 text-[#071c49] hover:bg-slate-100"
                }`}
              >
                <FiArrowLeft size={10} />
                <span>Exit Reader</span>
              </button>
            </div>

            {/* CENTER TITLE */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <h1
                className={`whitespace-nowrap text-lg font-serif text-[13px] font-bold leading-4 ${
                  darkMode ? "text-slate-100" : "text-[#071c49]"
                }`}
              >
                The Redeemed Order
              </h1>

              <div
                className={`flex items-center justify-center gap-1 text-[10px] ${
                  darkMode ? "text-slate-500" : "text-slate-500"
                }`}
              >
                {/* <span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> */}
                <IoMdLock/>
                Secure Session Active
              </div>
            </div>

            {/* RIGHT */}
            <div className="ml-auto flex items-center gap-1.5 ">
              <span
                className={`hidden items-center gap-1 rounded-full border px-2 py-1 text-[10px] sm:flex ${
                  darkMode
                    ? "border-slate-700 bg-slate-800 text-slate-400"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
              >
                <IoMdCloudDone size={12} />
                Available Offline
              </span>
              <span className="hidden h-4 w-px bg-[#94a3b8]/60 lg:block"></span>
              <button
                onClick={() =>
                  setFontScale((current) =>
                    current >= 1.15 ? 0.9 : current + 0.1,
                  )
                }
                className={`rounded cursor-pointer p-1.5 transition underline text-sm ${
                  darkMode
                    ? "text-slate-300 hover:bg-slate-800"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
                aria-label="Change font size"
              >
                A
              </button>

              <button
                onClick={() => setDarkMode((current) => !current)}
                className={`rounded cursor-pointer p-1.5 transition ${
                  darkMode
                    ? "text-slate-300 hover:bg-slate-800"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
                aria-label="Toggle reader theme"
              >
                {darkMode ? (
                  <FiSun size={12} />
                ) : (
                  <FiMoon size={12} />
                )}
              </button>

              <button
                className="rounded cursor-pointer p-1.5 text-red-500 hover:bg-red-50"
                aria-label="Report"
              >
                <FiFlag size={12} />
              </button>
            </div>
          </div>
        </header>
        <div className="flex min-h-screen justify-center px-3 pb-5 pt-20 sm:px-6 lg:px-10">
          <div className="flex w-full max-w-190 flex-col">
            {/* PAPER */}
            <article
              className={`relative mx-auto min-h-205 w-full overflow-hidden border shadow-[0_2px_10px_rgba(0,0,0,0.045)] sm:min-h-220 ${
                darkMode
                  ? "border-slate-700 bg-[#182131]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {/* CONTENT */}
              <div className="px-7 py-8 sm:px-10 sm:py-11 lg:px-12">
                {/* HEADING */}
                <div
                  className={`border-b pb-3 ${
                    darkMode
                      ? "border-slate-700"
                      : "border-slate-200"
                  }`}
                >
                  <h2
                    className={`font-serif text-[20px] font-bold leading-6 sm:text-[22px] ${
                      darkMode
                        ? "text-slate-100"
                        : "text-[#071c49]"
                    }`}
                  >
                    {active.title}
                  </h2>
                </div>

                {/* BODY */}
                <div
                  style={{
                    fontSize: `${12 * fontScale}px`,
                  }}
                  className={`mt-6 font-serif leading-[1.8] ${
                    darkMode
                      ? "text-slate-300"
                      : "text-slate-700"
                  }`}
                >
                  {activeChapter === 2 ? (
                    <>
                      <p className="mb-5">
                        The architecture of our faith requires structures
                        that are both enduring and illuminating. In the
                        modern era, the sanctuary is not merely a physical
                        space, but a conceptual environment where spiritual
                        focus is maintained against the overwhelming noise
                        of secular distraction.
                      </p>

                      <p className="mb-5">
                        Precision in our approach signifies reverence. It
                        is the understanding that order and clarity in
                        administration, worship, and study reflect the
                        Divine order. When we engage with sacred texts, the
                        medium through which we receive them must honor the
                        weight of the message. It must foster a sanctuary
                        of focus.
                      </p>

                      {/* QUOTE */}
                      <blockquote
                        className={`my-7 border-l-2 border-[#f2c65b] px-5 py-5 ${
                          darkMode
                            ? "bg-[#202b3b]"
                            : "bg-[#fafafa]"
                        }`}
                      >
                        <p
                          className={`font-serif text-[11px] italic leading-5 ${
                            darkMode
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          "The mind, when directed toward the sacred, must
                          be unburdened by the trivialities of poor design."
                        </p>
                      </blockquote>

                      <p className="mb-5">
                        This principle extends into our digital presence.
                        The European Universalism we strive for demands
                        accessibility across diverse congregations, yet it
                        insists on a unified, fortified trust. Data,
                        representing the spiritual history and identity of
                        our members, is guarded with the utmost security.
                      </p>

                      <p className="mb-5">
                        Therefore, the tools we build are not merely
                        functional; they are extensions of our liturgical
                        precision. They balance the aesthetic of the
                        corporate and modern with the deep necessity for
                        spiritual peace and exclusivity.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mb-5">
                        This is the reading content for{" "}
                        <strong>{active.title}</strong>.
                      </p>

                      <p className="mb-5">
                        The document reader is designed to present the
                        material in a clean, focused reading environment.
                      </p>

                      <p>
                        Additional pages and chapter content can be loaded
                        from your backend or document storage system.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* PAGE FOOTER */}
              <div
                className={`absolute bottom-7 left-0 right-0 flex items-center justify-between px-7 sm:px-10 lg:px-12 ${
                  darkMode
                    ? "text-slate-500"
                    : "text-slate-400"
                }`}
              >
                <button
                  onClick={previousPage}
                  disabled={activeChapter === 0}
                  className="flex items-center gap-1 font-serif text-[9px] text-[#071c49] transition hover:underline disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
                >
                  <FiChevronLeft size={9} />
                  Previous Page
                </button>

                <span className="font-serif text-[8px]">
                  Page {active.page} of 210
                </span>

                <button
                  onClick={nextPage}
                  disabled={
                    activeChapter === chapters.length - 1
                  }
                  className="flex items-center gap-1 font-serif text-[9px] text-[#071c49] transition hover:underline disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
                >
                  Next Page
                  <FiChevronRight size={9} />
                </button>
              </div>
            </article>

            {/* MOBILE CURRENT CHAPTER */}
            <div className="mt-3 flex items-center justify-between lg:hidden">
              <span className="truncate text-[10px] text-slate-500">
                {active.title}
              </span>

              <span className="shrink-0 text-[9px] text-slate-400">
                {active.page} / 210
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MOBILE TABLE OF CONTENTS
      ============================================================ */}
      {showMobileToc && (
        <div className="fixed inset-0 z-100 lg:hidden">
          {/* OVERLAY */}
          <button
            onClick={() => setShowMobileToc(false)}
            className="absolute inset-0 bg-black/35"
            aria-label="Close table of contents"
          />
          <aside
            className={`absolute bottom-0 left-0 top-0 w-72.5 border-r bg-white shadow-2xl ${
              darkMode
                ? "border-slate-700 bg-[#172033]"
                : "border-slate-200"
            }`}
          >
            <div
              className={`flex h-14 items-center justify-between border-b px-4 ${
                darkMode
                  ? "border-slate-700"
                  : "border-slate-200"
              }`}
            >
              <div className="flex items-center cursor-pointer gap-2">
                <FiBookOpen size={14} />

                <span className="font-serif text-sm font-bold">
                  Table of Contents
                </span>
              </div>

              <button
                onClick={() => setShowMobileToc(false)}
                className="rounded p-1.5 text-slate-500 hover:bg-slate-100"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="border-b p-3">
              <div className="flex h-9 items-center gap-2 rounded border border-slate-200 px-3">
                <FiSearch size={13} className="text-slate-400" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search inside book..."
                  className="min-w-0 flex-1 bg-transparent text-xs outline-none"
                />
              </div>
            </div>

            <div className="py-2">
              {filteredChapters.map((chapter) => {
                const index = chapters.findIndex(
                  (item) => item.id === chapter.id,
                );

                return (
                  <button
                    key={chapter.id}
                    onClick={() => goToChapter(index)}
                    className={`block w-full px-5 py-3 text-left font-serif text-xs ${
                      activeChapter === index
                        ? "bg-[#00256f] text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {chapter.title}
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
export default WorkersInTrainingReader;