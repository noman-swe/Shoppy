import Link from 'next/link';
import { FaBagShopping, FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaShieldHalved, FaLock } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-12 text-slate-600 text-xs">
      <div className="max-w-7xl xl:container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#14532d] flex items-center justify-center text-white text-base">
                <FaBagShopping />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">Shoppy<span className="text-[#14532d]">BD</span></span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Bangladesh&apos;s most trusted portal for authentic Chinese consumer tech, smart home devices, and viral lifestyle products directly from vetted suppliers.
            </p>
            <div className="flex items-center space-x-3 text-slate-400">
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-[#14532d] hover:border-[#14532d] transition-colors"><FaFacebookF /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-[#14532d] hover:border-[#14532d] transition-colors"><FaInstagram /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-[#14532d] hover:border-[#14532d] transition-colors"><FaTiktok /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:text-[#14532d] hover:border-[#14532d] transition-colors"><FaYoutube /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Shop Direct</h4>
            <ul className="space-y-2.5">
              <li><Link href="/shop" className="hover:text-[#14532d] transition-colors">All China Imports</Link></li>
              <li><Link href="/shop?type=ready" className="hover:text-[#14532d] transition-colors">Dhaka Ready Stock</Link></li>
              <li><Link href="/shop?type=pre-order" className="hover:text-[#14532d] transition-colors">Pre-Order Deals (7-15 Days)</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Customer Care</h4>
            <ul className="space-y-2.5">
              <li><Link href="/policy/shipping" className="hover:text-[#14532d] transition-colors">Shipping &amp; Customs Policy</Link></li>
              <li><Link href="/policy/return" className="hover:text-[#14532d] transition-colors">7-Day Return &amp; Refund</Link></li>
              <li><Link href="/track-order" className="hover:text-[#14532d] transition-colors">OTP Order Tracking</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4">Delivery Partners</h4>
            <ul className="space-y-2.5">
              <li><span className="text-emerald-600 font-medium">Steadfast Courier</span></li>
              <li><span className="text-red-500 font-medium">Pathao Express</span></li>
              <li><span className="text-red-600 font-medium">RedX Logistics</span></li>
              <li><span className="text-slate-500">Warehouse: Uttara, Dhaka</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Exclusive China Deals</h4>
            <p className="text-xs text-slate-500 mb-3">Subscribe to get secret pre-order drops and weekend coupon codes.</p>
            <form className="space-y-2">
              <div className="flex">
                <input type="email" placeholder="Enter your email" className="w-full text-xs rounded-l-xl border-slate-300 focus:border-[#14532d] focus:ring-[#14532d] py-2.5 px-3" />
                <button type="submit" className="bg-[#14532d] hover:bg-green-800 text-white font-semibold px-4 rounded-r-xl text-xs transition">Subscribe</button>
              </div>
            </form>
            <div className="mt-4 flex items-center gap-3 text-slate-400 text-xs">
              <span><FaShieldHalved className="text-[#14532d] inline" /> No Spam</span>
              <span>•</span>
              <span><FaLock className="text-[#14532d] inline" /> Secure</span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 ShoppyBD (শপিবডি). All rights reserved. Trade License Registered in Bangladesh.</div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-white border border-slate-200 rounded font-semibold text-[11px] text-slate-800">Cash on Delivery</span>
            <span className="px-2 py-1 bg-white border border-slate-200 rounded font-semibold text-[11px] text-pink-600">bKash</span>
            <span className="px-2 py-1 bg-white border border-slate-200 rounded font-semibold text-[11px] text-orange-600">Nagad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}