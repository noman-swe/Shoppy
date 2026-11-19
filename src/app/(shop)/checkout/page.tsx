'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrash, FaPlus, FaMinus, FaPhone } from 'react-icons/fa6';
import { toast } from 'sonner';

const checkoutSchema = z.object({
  name: z.string().min(2, 'আপনার নাম লিখুন'),
  mobile: z.string().regex(/^(\+88)?01[3-9]\d{8}$/, 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন'),
  address: z.string().min(5, 'সম্পূর্ণ ঠিকানা লিখুন'),
  note: z.string().optional(),
  deliveryArea: z.enum(['inside_dhaka', 'outside_dhaka']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isBuyNowMode = searchParams.get('mode') === 'buynow';

  const { cart, buyNowProduct, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const activeItems = isBuyNowMode && buyNowProduct ? [buyNowProduct] : cart;

  const [selectedItems, setSelectedItems] = useState<string[]>(activeItems.map((i) => i.id));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { deliveryArea: 'inside_dhaka' },
  });

  const deliveryArea = watch('deliveryArea');
  const deliveryCharge = deliveryArea === 'inside_dhaka' ? 70 : 130;

  const subtotal = activeItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const grandTotal = subtotal > 0 ? subtotal + deliveryCharge : 0;

  const onSubmit = async (data: CheckoutFormData) => {
    if (subtotal === 0) {
      toast.error('অনুগহ করে অন্তত একটি প্রোডাক্ট সিলেক্ট করুন');
      return;
    }

    setIsSubmitting(true);
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const orderDetails = {
      orderId,
      customer: data,
      items: activeItems.filter((item) => selectedItems.includes(item.id)),
      deliveryCharge,
      grandTotal,
      date: new Date().toISOString(),
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL;

      if (!webhookUrl) {
        toast.error('Google Sheet Webhook URL সেট করা হয়নি');
        setIsSubmitting(false);
        return;
      }

      // Apps Script Webhook Call
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      // লোকাল স্টোরেজে তথ্য সেভ ও কার্ট ক্লিয়ার
      localStorage.setItem('latest_order', JSON.stringify(orderDetails));
      if (!isBuyNowMode) clearCart();

      toast.success('অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (err) {
      console.error('Submission failed:', err);
      toast.error('অর্ডার জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (activeItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Checkout</h1>
        <div className="bg-slate-50 p-10 rounded-3xl border border-dashed border-slate-200">
          <p className="text-base font-bold text-slate-800">Your cart is empty</p>
          <p className="text-xs text-slate-500 mt-1 mb-6">Please add some products to your cart before proceeding to checkout.</p>
          <Link href="/shop" className="bg-[#14532d] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-green-800 transition">
            Explore Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product List & Billing Form (~65%) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Product List Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">Review Items</h3>
            {activeItems.map((item) => {
              const discount =
                item.oldPrice && item.oldPrice > item.price
                  ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
                  : null;

              return (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() =>
                      setSelectedItems((prev) =>
                        prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                      )
                    }
                    className="accent-[#14532d] w-4 h-4 cursor-pointer"
                  />
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-200">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-xs text-slate-900 line-clamp-1">{item.title}</h4>
                      {discount && (
                        <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold">
                          Save ৳{item.oldPrice! - item.price}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-slate-900">৳{item.price}</span>
                      {item.oldPrice && <span className="text-[11px] text-slate-400 line-through">৳{item.oldPrice}</span>}
                    </div>
                  </div>
                  {/* Quantity & Remove */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-red-600">
                        <FaMinus className="text-[9px]" />
                      </button>
                      <span className="px-2 text-xs font-bold">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-green-600">
                        <FaPlus className="text-[9px]" />
                      </button>
                    </div>
                    {!isBuyNowMode && (
                      <button type="button" onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-600">
                        <FaTrash className="text-xs" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Billing Form Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">বিলিং ডিটেইলস</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">নাম (Name)</label>
                <input
                  {...register('name')}
                  placeholder="আপনার নাম লিখুন"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                />
                {errors.name && <span className="text-[10px] text-rose-600 mt-1 block">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর (Mobile Number)</label>
                <input
                  {...register('mobile')}
                  placeholder="01700000000"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                />
                {errors.mobile && <span className="text-[10px] text-rose-600 mt-1 block">{errors.mobile.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">সম্পূর্ণ ঠিকানা (Full Address)</label>
                <textarea
                  {...register('address')}
                  rows={2}
                  placeholder="বাসা/হোল্ডিং, রোড, থানা, জেলা"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                />
                {errors.address && <span className="text-[10px] text-rose-600 mt-1 block">{errors.address.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">অর্ডার নোট (Optional)</label>
                <textarea
                  {...register('note')}
                  rows={2}
                  placeholder="রঙ বা সাইজ সম্পর্কিত কোনো নির্দেশনা থাকলে লিখুন"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                />
              </div>
            </div>

            {/* Delivery Area Selector */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-900 mb-2">ডেলিভারি এলাকা (Delivery Area)</label>
              <div className="space-y-2">
                <label
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                    deliveryArea === 'inside_dhaka' ? 'border-[#14532d] bg-emerald-50/50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" value="inside_dhaka" {...register('deliveryArea')} className="accent-[#14532d]" />
                    <span className="text-xs font-medium">ঢাকা শহরের ভিতরে (Inside Dhaka)</span>
                  </div>
                  <span className="text-xs font-bold text-[#14532d]">৳70</span>
                </label>

                <label
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                    deliveryArea === 'outside_dhaka' ? 'border-[#14532d] bg-emerald-50/50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" value="outside_dhaka" {...register('deliveryArea')} className="accent-[#14532d]" />
                    <span className="text-xs font-medium">ঢাকা শহরের বাইরে (Outside Dhaka)</span>
                  </div>
                  <span className="text-xs font-bold text-[#14532d]">৳130</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (~35%) */}
        <div className="lg:col-span-5 sticky top-24 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">Order Summary</h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">৳{subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charge</span>
              <span className="font-bold text-slate-900">৳{deliveryCharge}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-3 border-t border-slate-100">
              <span>টোটাল (Total)</span>
              <span className="text-[#14532d]">৳{grandTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || subtotal === 0}
            className="w-full bg-[#14532d] hover:bg-green-800 text-white py-3.5 rounded-xl text-xs font-bold shadow-lg transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডারটি কনফার্ম করুন'}
          </button>

          <a
            href="tel:+8801700000000"
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <FaPhone className="text-[#14532d]" />
            <div className="text-left leading-tight">
              <span>সরাসরি কথা বলুন</span>
              <span className="block font-bold text-[11px] text-[#14532d]">+880 1700-000000</span>
            </div>
          </a>
        </div>
      </form>
    </div>
  );
}