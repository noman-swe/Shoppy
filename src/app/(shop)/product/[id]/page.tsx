'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import demoProducts from '@/data/demoProducts.json';
import ProductSliderSection from '@/components/Common/ProductSliderSection';
import { Product } from '@/data/types';
import { useCartStore } from '@/store/useCartStore';
import {
    FaStar,
    FaCartPlus,
    FaBolt,
    FaSpellCheck,
    FaTruck,
    FaRotateLeft,
    FaMinus,
    FaPlus,
    FaWhatsapp,
    FaCheck,
} from 'react-icons/fa6';

function ProductDetailsContent({ product }: { product: Product }) {
    const router = useRouter();

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [addedFeedback, setAddedFeedback] = useState(false);

    const addToCart = useCartStore((state) => state.addToCart);
    const setBuyNowProduct = useCartStore((state) => state.setBuyNowProduct);

    const decreaseQty = () => setQuantity((prev) => Math.max(1, prev - 1));
    const increaseQty = () => setQuantity((prev) => prev + 1);

    const handleAddToCart = () => {
        addToCart(
            {
                id: product.id,
                title: product.title,
                price: product.price,
                oldPrice: product.oldPrice,
                image: product.image,
            },
            quantity
        );
        setAddedFeedback(true);
        setTimeout(() => setAddedFeedback(false), 1800);
        toast.success(`${product.title} added to cart`, {
  style: {
    background: '#14532d',
    color: '#ffffff',
    border: '1px solid #16a34a',
  },
});
    };

    const handleBuyNow = () => {
        setBuyNowProduct({
            id: product.id,
            title: product.title,
            price: product.price,
            oldPrice: product.oldPrice,
            image: product.image,
            quantity,
        });
        router.push('/checkout?mode=buynow');
    };

    return (
        <div className="max-w-7xl xl:container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="text-xs text-slate-500 mb-6 flex items-center gap-2">
                <Link href="/" className="hover:text-[#14532d]">Home</Link>
                <span>/</span>
                <Link href="/shop" className="hover:text-[#14532d]">Shop</Link>
                <span>/</span>
                <span className="text-slate-900 font-semibold line-clamp-1">{product.title}</span>
            </nav>

            {/* Main Product Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-xs mb-12">

                {/* Left: Product Images Gallery */}
                <div className="lg:col-span-6 space-y-4">
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                        <Image
                            src={selectedImage}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            {product.badge || 'Ready Stock'}
                        </span> */}
                    </div>

                    {/* Thumbnail preview list */}
                    <div className="flex gap-3 overflow-x-auto pb-1">
                        {[product.image, product.image].map((img, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedImage(img)}
                                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img
                                    ? 'border-[#14532d]'
                                    : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <Image src={img} alt="Thumbnail" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Product Meta & Purchase Options */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                            {product.title}
                        </h1>

                        {/* Ratings & Stock Badge */}
                        <div className="flex items-center gap-4 mt-3 text-xs">
                            <div className="flex items-center text-amber-400 gap-1 font-semibold">
                                <FaStar /> <span>{product.rating}</span>
                                <span className="text-slate-400 font-normal">({product.reviewsCount} customer reviews)</span>
                            </div>
                            <span className="text-slate-300">|</span>
                            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                In Stock
                            </span>
                        </div>

                        {/* Price Box */}
                        <div className="flex items-baseline gap-3 mt-5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <span className="text-2xl sm:text-3xl font-black text-slate-900">
                                ৳{(product.price * quantity).toLocaleString()}
                            </span>
                            {product.oldPrice && (
                                <span className="text-sm text-slate-400 line-through font-medium">
                                    ৳{(product.oldPrice * quantity).toLocaleString()}
                                </span>
                            )}
                            {product.oldPrice && (
                                <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full ml-auto">
                                    Save ৳{((product.oldPrice - product.price) * quantity).toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Short Description */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
                            High-performance direct import gadget. Quality double-checked in Shenzhen factory &amp; Dhaka warehouse before shipping. Cash on delivery available.
                        </p>

                        {/* Quantity Selector */}
                        <div className="mt-6">
                            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center border border-slate-200 rounded-xl w-36 bg-slate-50">
                                <button
                                    type="button"
                                    onClick={decreaseQty}
                                    className="p-3 text-slate-600 hover:text-slate-900 transition-colors"
                                    aria-label="Decrease quantity"
                                >
                                    <FaMinus className="text-xs" />
                                </button>
                                <span className="flex-1 text-center font-bold text-sm text-slate-900">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={increaseQty}
                                    className="p-3 text-slate-600 hover:text-slate-900 transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    <FaPlus className="text-xs" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="w-full bg-[#14532d] hover:bg-green-800 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                            >
                                {addedFeedback ? (
                                    <>
                                        <FaCheck className="text-base" /> Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <FaCartPlus className="text-base" /> Add to Cart
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleBuyNow}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                            >
                                <FaBolt className="text-base" /> Buy Now (COD)
                            </button>
                        </div>

                        <a
                            href={`https://wa.me/8801700000000?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(product.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-emerald-50 hover:bg-emerald-100 text-[#14532d] border border-emerald-200 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                            <FaWhatsapp className="text-base text-emerald-600" /> Order via WhatsApp Direct
                        </a>
                    </div>

                    {/* Guarantee Badges */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-[11px] text-slate-600 font-medium text-center">
                        <div className="flex flex-col items-center gap-1">
                            <FaSpellCheck className="text-emerald-600 text-base" /> 100% Authentic
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <FaTruck className="text-[#14532d] text-base" /> Fast BD Delivery
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <FaRotateLeft className="text-amber-600 text-base" /> 7 Days Replacement
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Slider */}
            <ProductSliderSection
                id="related-products"
                title="Related Products"
                subtitle="Customer also viewed these authentic gadgets"
                products={demoProducts as Product[]}
                filterKey="isFeatured"
            />
        </div>
    );
}

export default function ProductDetailsPage() {
    const params = useParams();
    const productId = params?.id as string;

    const product = (demoProducts as Product[]).find((p) => p.id === productId) || demoProducts[0];

    return <ProductDetailsContent key={product.id} product={product} />;
}