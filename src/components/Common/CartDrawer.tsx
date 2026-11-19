// src/components/Common/CartDrawer.tsx
'use client';

import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import { FaXmark, FaTrash, FaPlus, FaMinus, FaBasketShopping } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
    const { cart, isCartDrawerOpen, toggleCartDrawer, removeFromCart, updateQuantity } = useCartStore();

    if (!isCartDrawerOpen) return null;

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => toggleCartDrawer(false)} />

            {/* Drawer Box */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2">
                        <FaBasketShopping className="text-[#14532d] text-lg" />
                        <h3 className="font-bold text-slate-900 text-base">Your Cart ({cart.reduce((a, c) => a + c.quantity, 0)})</h3>
                    </div>
                    <button onClick={() => toggleCartDrawer(false)} className="p-2 text-slate-500 hover:text-slate-900 rounded-full">
                        <FaXmark className="text-xl" />
                    </button>
                </div>

                {/* Product List with Scroll */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            <FaBasketShopping className="text-5xl mx-auto mb-3 text-slate-300" />
                            <p className="text-sm font-medium">Your cart is empty</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-200">
                                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-xs text-slate-900 line-clamp-1">{item.title}</h4>
                                    <div className="text-xs font-bold text-slate-900 mt-1">৳{(item.price * item.quantity).toLocaleString()}</div>

                                    {/* Quantity Controller */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:text-red-600">
                                                <FaMinus className="text-[10px]" />
                                            </button>
                                            <span className="px-2 text-xs font-bold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:text-green-600">
                                                <FaPlus className="text-[10px]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                                    <FaTrash className="text-sm" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer with Checkout Button */}
                {cart.length > 0 && (
                    <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
                        <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                            <span>Subtotal:</span>
                            <span>৳{subtotal.toLocaleString()}</span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={() => toggleCartDrawer(false)}
                            className="w-full bg-[#14532d] hover:bg-green-800 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center shadow-md transition-all text-center"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}