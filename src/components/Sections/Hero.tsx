"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderButtons from "../UI/SliderButtons";

const slidesData = [
  {
    id: 1,
    badge: "DIRECT FROM SHENZHEN & YIWU • NEW SEASON 2026",
    titleLine1: "সবজি কাটার দিন",
    titleLine2: "এখন হলো শেষ",
    description:
      "মিনিটেই প্রস্তুত সবজি! স্মার্ট, নিরাপদ ও দ্রুত। ১০০% ভেরিফাইড কিচেন গ্যাজেট ও হোম অ্যাপ্লায়েন্স পাইকারি মূল্যে।",
    primaryBtnText: "Shop Ready Stock",
    primaryBtnLink: "#ready-stock",
    secondaryBtnText: "Explore Pre-Orders",
    secondaryBtnLink: "#pre-orders",
    bgImage: "/images/kitchen-tools.avif",
  },
  {
    id: 2,
    badge: "EXCLUSIVELY IMPORTED • TRENDING GADGETS",
    titleLine1: "স্মার্ট হোম গ্যাজেট",
    titleLine2: "আপনার হাতের কাছে",
    description:
      "আপনার দৈনন্দিন জীবনকে আরও সহজ করতে আধুনিক ও প্রিমিয়াম কোয়ালিটির চায়নিজ টেক পণ্য ও লাইফস্টাইল এসেনশিয়ালস।",
    primaryBtnText: "View Smart Tech",
    primaryBtnLink: "#ready-stock",
    secondaryBtnText: "Trending Deals",
    secondaryBtnLink: "#trending",
    bgImage: "/images/banner.jpeg",
  },
  {
    id: 3,
    badge: "WHOLESALE FACTORY RATES • FAST DELIVERY",
    titleLine1: "ডাইরেক্ট চায়না পণ্য",
    titleLine2: "সরাসরি আপনার ঠিকানায়",
    description:
      "হোলসেল ফ্যাক্টরি রেটে সেরা মানের গ্যাজেট সংগ্রহ করুন। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা উপলব্ধ।",
    primaryBtnText: "Explore Collection",
    primaryBtnLink: "#collection",
    secondaryBtnText: "Bulk Ordering",
    secondaryBtnLink: "#wholesale",
    bgImage: "/images/banner-2.jpeg",
  },
];

export default function Hero() {
  return (
    <section className="max-w-7xl xl:container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="rounded-3xl relative overflow-hidden shadow-sm">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={{
            nextEl: ".hero-next",
            prevEl: ".hero-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
            bulletClass: "swiper-custom-bullet",
            bulletActiveClass: "swiper-custom-bullet-active",
          }}
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="p-6 sm:p-10 lg:p-16 relative min-h-120 sm:min-h-130 flex items-center bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              >
                {/* হালকা ওভারলে লেয়ার */}
                <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/80 to-transparent z-0"></div>

                {/* কন্টেন্ট লেআউট */}
                <div className="w-full max-w-2xl relative z-10 px-2 sm:px-4">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#14532d] bg-green-100/90 border border-green-200 px-3 py-1 rounded-full mb-4 shadow-sm">
                    {slide.badge}
                  </span>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                    <span className="text-red-600 block sm:inline mr-2">
                      {slide.titleLine1}
                    </span>
                    <span className="text-[#14532d] block sm:inline">
                      {slide.titleLine2}
                    </span>
                  </h1>

                  <p className="text-slate-700 text-base sm:text-lg mb-8 max-w-lg leading-relaxed font-medium">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                    <Link
                      href={slide.primaryBtnLink}
                      className="bg-[#14532d] hover:bg-green-800 text-white font-semibold px-7 py-3 rounded-full shadow-lg shadow-green-900/20 transition-all text-sm sm:text-base active:scale-95"
                    >
                      {slide.primaryBtnText}
                    </Link>
                    <Link
                      href={slide.secondaryBtnLink}
                      className="bg-white/90 hover:bg-white text-slate-800 border border-slate-300 font-semibold px-7 py-3 rounded-full transition-all text-sm sm:text-base active:scale-95 shadow-sm"
                    >
                      {slide.secondaryBtnText}
                    </Link>
                  </div>

                  {/* প্রোগ্রেস বার ইন্ডিকেটর */}
                  <div className="swiper-pagination-custom flex items-center gap-2"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* রিইউজেবল নেভিগেশন বাটন */}
        <SliderButtons
          prevClass="hero-prev"
          nextClass="hero-next"
          className="absolute inset-x-3 sm:inset-x-5 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none"
        />
      </div>
    </section>
  );
}