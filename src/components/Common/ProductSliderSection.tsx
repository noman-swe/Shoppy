"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import SliderButtons from "../UI/SliderButtons";
import { Product } from "@/data/types";

interface ProductSliderSectionProps {
    id?: string;
    title?: string;
    subtitle?: string;
    products: Product[];
    filterKey?: keyof Pick<Product, "isFeatured" | "isBestSeller" | "isHot">;
    viewAllLink?: string;
}

export default function ProductSliderSection({
    id = "products-section",
    title = "Products",
    subtitle = "Explore our latest collection of high quality products",
    products = [],
    filterKey = "isFeatured",
    viewAllLink = "/shop"
}: ProductSliderSectionProps) {
    const filteredProducts = products.filter((product) => Boolean(product[filterKey]));

    if (filteredProducts.length === 0) return null;
    const prevClass = `custom-prev-${id}`;
    const nextClass = `custom-next-${id}`;

    return (
        <section id={id} className="max-w-7xl xl:container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

            {/* card header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h2>
                    <p className="text-xs sm:text-sm text-slate-500">{subtitle}</p>
                </div>

                <Link href={viewAllLink} className="text-xs sm:text-sm font-semibold text-[#14532d] hover:text-green-700 flex items-center gap-1 group/link">
                    View all products <FaArrowRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* swapping and floating navigation  */}
            <div className="relative">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={16}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: `.${prevClass}`,
                        nextEl: `.${nextClass}`,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 6 },
                    }}
                    className="pb-4"
                >
                    {filteredProducts.map((product) => (
                        <SwiperSlide key={product.id} className="h-auto">
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <SliderButtons
                    prevClass={prevClass}
                    nextClass={nextClass}
                    className={`absolute inset-x-0 top-[42%] -translate-y-1/2 z-10 flex justify-between pointer-events-none px-0`}
                />
            </div>

        </section>
    );
}