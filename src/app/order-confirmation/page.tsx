'use client';

import React, { Suspense, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCircleCheck } from 'react-icons/fa6';

interface OrderDetails {
    orderId: string;
    customer?: {
        name?: string;
        mobile?: string;
        address?: string;
        note?: string;
        deliveryArea?: string;
    };
    grandTotal?: number;
}

let cachedRawOrder: string | null | undefined;
let cachedParsedOrder: OrderDetails | null = null;

function subscribeToStorage(callback: () => void) {
    if (typeof window === 'undefined') return () => { };
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
}

function getLatestOrderSnapshot(): OrderDetails | null {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem('latest_order');
    if (raw === cachedRawOrder) {
        return cachedParsedOrder;
    }
    cachedRawOrder = raw;
    if (!raw) {
        cachedParsedOrder = null;
        return null;
    }
    try {
        cachedParsedOrder = JSON.parse(raw) as OrderDetails;
    } catch {
        cachedParsedOrder = null;
    }
    return cachedParsedOrder;
}

function getServerOrderSnapshot(): OrderDetails | null {
    return null;
}

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    const orderDetails = useSyncExternalStore(
        subscribeToStorage,
        getLatestOrderSnapshot,
        getServerOrderSnapshot
    );

    const displayOrderId = orderId || orderDetails?.orderId || 'ORD-948210';

    return (
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-[#14532d] rounded-full flex items-center justify-center mx-auto text-3xl">
                    <FaCircleCheck />
                </div>

                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        Order Placed Successfully!
                    </span>
                    <h1 className="text-2xl font-extrabold text-slate-900 mt-3">ধন্যবাদ আপনার অর্ডারের জন্য!</h1>
                    <p className="text-xs text-slate-500 mt-1">
                        আপনার অর্ডার আইডি: <span className="font-bold text-slate-800">{displayOrderId}</span>
                    </p>
                </div>

                {orderDetails && (
                    <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs space-y-2 border border-slate-100">
                        <div className="font-bold text-slate-900 border-b pb-2">ডেলিভারি ঠিকানা ও বিবরণ</div>
                        <div>
                            <span className="text-slate-500">নাম:</span> {orderDetails.customer?.name}
                        </div>
                        <div>
                            <span className="text-slate-500">মোবাইল:</span> {orderDetails.customer?.mobile}
                        </div>
                        <div>
                            <span className="text-slate-500">ঠিকানা:</span> {orderDetails.customer?.address}
                        </div>
                        <div className="font-bold text-slate-900 pt-2 border-t">
                            সর্বমোট প্রদেয়: ৳{orderDetails.grandTotal} (COD)
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Link
                        href="/shop"
                        className="bg-[#14532d] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-green-800 transition"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="/"
                        className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl text-xs font-semibold hover:bg-slate-200 transition"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-16 text-center text-xs text-slate-500">Loading order details...</div>}>
            <OrderConfirmationContent />
        </Suspense>
    );
}