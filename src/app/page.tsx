import ProductSliderSection from '@/components/Common/ProductSliderSection';
import ServiceHighlights from '@/components/Common/ServiceHighlights';
import AllProductsSection from '@/components/Sections/AllProductsSection';
import HeroSection from '@/components/Sections/Hero';
import demoProducts from '@/data/demoProducts.json';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-[#14532d] selection:text-white">

      <main className="grow">        
        <HeroSection />

        {/* Featured Products */}
        <ProductSliderSection
          id="flash-deals"
          title="Flash Deals"
          subtitle="Hand-tested high rated Chinese gadgets ready in Dhaka or direct flight dispatch"
          products={demoProducts}
          filterKey="isFeatured"
        />

        {/* All products */}      
        <AllProductsSection products={demoProducts} />

        {/* Trust & WhatsApp Support */}
        <ServiceHighlights />

      </main>
    </div>
  );
}