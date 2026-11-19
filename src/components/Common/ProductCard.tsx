'use client';

import { Product } from '@/data/types';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import Image from 'next/image';
import { FaCartPlus } from 'react-icons/fa6';
import { toast } from 'sonner';

export default function ProductCard({ product }: { product: Product }) {
    const addToCart = useCartStore((state) => state.addToCart);

    const discountPercentage =
        product.oldPrice && product.oldPrice > product.price
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : null;

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart(
            {
                id: product.id,
                title: product.title,
                price: product.price,
                oldPrice: product.oldPrice,
                image: product.image,
            },
            1
        );

        toast.success(`${product.title} added to cart`, {
            style: {
                background: '#14532d',
                color: '#ffffff',
                border: '1px solid #16a34a',
            },
        });
    };

    return (
        <div className="bg-white hover:bg-[#f3f9f4] rounded-2xl border-2 border-slate-200 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <Link href={`/product/${product.id}`} className="flex flex-col h-full">
                <div className="relative w-full aspect-square rounded-t-2xl bg-slate-50 group-hover:bg-[#e6f4ea] mb-3 overflow-hidden flex items-center justify-center border-b border-slate-100 transition-colors duration-300">
                    {discountPercentage && (
                        <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                            -{discountPercentage}%
                        </span>
                    )}

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

                <div className="mb-2 px-3">
                    <h3 className="font-semibold text-xs text-slate-900 line-clamp-2 h-8 leading-4 group-hover:text-[#14532d] transition-colors">
                        {product.title}
                    </h3>
                </div>

                <div className="flex items-baseline gap-2 mt-auto mb-3 px-3">
                    <span className="text-sm font-bold text-slate-900">৳{product.price.toLocaleString()}</span>
                    {product.oldPrice && (
                        <span className="text-xs text-slate-400 line-through">৳{product.oldPrice.toLocaleString()}</span>
                    )}
                </div>
            </Link>

            <div className="p-3 pt-0">
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-[#14532d] hover:bg-green-800 text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm active:scale-95 cursor-pointer"
                >
                    <FaCartPlus className="text-[11px]" /> Add to Cart
                </button>
            </div>
        </div>
    );
}