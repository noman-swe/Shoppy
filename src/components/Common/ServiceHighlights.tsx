import React from 'react';
import { 
  FaAward, 
  FaHandHoldingDollar, 
  FaRotateLeft, 
  FaPaperPlane, 
  FaWhatsapp, 
  FaArrowUpRightFromSquare 
} from 'react-icons/fa6';
import staticData from '@/data/staticData.json';

// ইনডেক্স অনুযায়ী আইকন ম্যাপিং (Trust Pillars এর জন্য)
const pillarIcons = [
  <FaAward className="text-lg" key="award" />,
  <FaHandHoldingDollar className="text-lg" key="dollar" />,
  <FaRotateLeft className="text-lg" key="rotate" />,
  <FaPaperPlane className="text-lg" key="plane" />
];

const ServiceHighlights = () => {
    return (
        <section className="max-w-7xl xl:container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                {/* Trust Pillars Grid */}
                <div className="lg:col-span-8 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center">
                    {staticData.trustPillars.map((pillar, index) => {
                        return (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-100 text-[#14532d] flex items-center justify-center shrink-0">
                                    {/* ইনডেক্স অনুযায়ী ম্যাপিং থেকে সঠিক আইকনটি রেন্ডার করা হলো */}
                                    {pillarIcons[index] || <FaAward className="text-lg" />}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900">{pillar.title}</h4>
                                    <p className="text-[11px] text-slate-500 leading-snug">{pillar.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* WhatsApp Quick Order Box */}
                <div className="lg:col-span-4 bg-amber-50 border border-amber-200/80 rounded-2xl p-6 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg">
                            <FaWhatsapp />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900">Fast Order via WhatsApp</h4>
                            <p className="text-xs text-slate-600">Send product screenshot to book COD</p>
                        </div>
                    </div>
                    <a
                        href="https://wa.me/8801700000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 w-full bg-[#14532d] hover:bg-green-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl text-center flex items-center justify-center gap-2 transition shadow-sm"
                    >
                        <span>Chat on WhatsApp: +880 1700-000000</span>
                        <FaArrowUpRightFromSquare className="text-[10px]" />
                    </a>
                </div>

            </div>
        </section>
    );
};

export default ServiceHighlights;