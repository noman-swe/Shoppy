import { Product } from '@/data/types';
import Link from 'next/link';
import Image from 'next/image';
import { FaCartPlus } from 'react-icons/fa6';

export default function ProductCard({ product }: { product: Product }) {
    // Calculate discount percentage dynamically if oldPrice exists and is greater than price
    const discountPercentage = product.oldPrice && product.oldPrice > product.price
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : null;

    return (
        <div className="bg-white hover:bg-[#f3f9f4] rounded-2xl border-2 border-slate-200 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <Link href={`/product/${product.id}`} className="flex flex-col h-full">
                {/* Product Image Container: Hover করলেই ইমেজ বক্সের ব্যাকগ্রাউন্ড কালার পরিবর্তন হবে */}
                <div className="relative w-full aspect-square rounded-t-2xl bg-slate-50 group-hover:bg-[#e6f4ea] mb-3 overflow-hidden flex items-center justify-center border-b border-slate-100 transition-colors duration-300">

                    {/* Discount Badge */}
                    {discountPercentage && (
                        <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                            -{discountPercentage}%
                        </span>
                    )}

                    {/* Product Image Display */}
                    <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-300">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>

                {/* Product Title */}
                <div className="mb-2 px-3">
                    <h3 className="font-semibold text-xs text-slate-900 line-clamp-2 h-8 leading-4 group-hover:text-[#14532d] transition-colors">
                        {product.title}
                    </h3>
                </div>

                {/* Price Section */}
                <div className="flex items-baseline gap-2 mt-auto mb-3 px-3">
                    <span className="text-sm font-bold text-slate-900">৳{product.price.toLocaleString()}</span>
                    {product.oldPrice && (
                        <span className="text-xs text-slate-400 line-through">৳{product.oldPrice.toLocaleString()}</span>
                    )}
                </div>
            </Link>

            {/* Add to Cart Button */}
            <div className="p-3 pt-0">
                <button className="w-full bg-[#14532d] hover:bg-green-800 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm active:scale-95">
                    <FaCartPlus className="text-[11px]" /> Add to Cart
                </button>
            </div>
        </div>
    );
}