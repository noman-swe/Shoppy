import React from 'react';
import Link from 'next/link';

const EmptyCart = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Checkout</h1>
                <div className="bg-slate-50 p-10 rounded-3xl border border-dashed border-slate-200">
                    <p className="text-base font-bold text-slate-800">Your cart is empty</p>
                    <p className="text-xs text-slate-500 mt-1 mb-6">
                        Please add some products to your cart before proceeding to checkout.
                    </p>
                    <Link
                        href="/shop"
                        className="bg-[#14532d] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-green-800 transition"
                    >
                        Explore Shop
                    </Link>
                </div>
            </div>
    );
};

export default EmptyCart;