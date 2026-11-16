import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SliderButtonsProps {
    prevClass: string;
    nextClass: string;
    className?: string;
    iconSize?: string;
}

export default function SliderButtons({
    prevClass,
    nextClass,
    className = "absolute inset-x-3 sm:inset-x-5 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none",
    iconSize = "text-xs sm:text-sm",
}: SliderButtonsProps) {
    return (
        <div className={className}>
            {/* প্রিভিয়াস বাটন */}
            <button
                className={`${prevClass} pointer-events-auto w-10 h-10 rounded-full bg-white/90 hover:bg-[#14532d] text-slate-700 hover:text-white flex items-center justify-center transition-all shadow-md border border-slate-200 cursor-pointer hover:scale-110`}
                aria-label="Previous Slide"
            >
                <FaChevronLeft className={iconSize} />
            </button>

            {/* নেক্সট বাটন */}
            <button
                className={`${nextClass} pointer-events-auto w-10 h-10 rounded-full bg-white/90 hover:bg-[#14532d] text-slate-700 hover:text-white flex items-center justify-center transition-all shadow-md border border-slate-200 cursor-pointer hover:scale-110`}
                aria-label="Next Slide"
            >
                <FaChevronRight className={iconSize} />
            </button>
        </div>
    );
}