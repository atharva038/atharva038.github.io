import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import CapabilitySelector from './components/CapabilitySelector';
import SkillBreakdownPanel from './components/SkillBreakdownPanel';
import ProofPreview from './components/ProofPreview';
import ProductList from './components/ProductList';
import ProductDetailModal from './components/ProductDetailModal';
import ThemeToggle from './components/ThemeToggle';
import About from './components/About';

// Data
import capabilitiesData from './data/capabilities.json';
import skillsData from './data/skills.json';
import productsData from './data/products.json';

function App() {
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter skills and products based on selected capability
  const filteredSkills = useMemo(() => {
    if (!selectedCapability) return [];
    return skillsData.filter(skill => skill.capability === selectedCapability.id);
  }, [selectedCapability]);

  const filteredProducts = useMemo(() => {
    if (!selectedCapability) return [];
    return productsData.filter(product => 
      product.capabilities.includes(selectedCapability.id)
    );
  }, [selectedCapability]);

  const handleCapabilitySelect = (capability) => {
    setSelectedCapability(capability);
    setSelectedProduct(null);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb] dark:bg-[#0a0a0a] transition-colors duration-300">
      
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40">
        <ThemeToggle />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Hero Section */}
        <header className="mb-16 sm:mb-20 lg:mb-24">
          <div className="max-w-4xl">
            {/* Small Identity Line */}
            <p className="text-xs sm:text-sm text-[#6b5d52] dark:text-[#737373] font-mono mb-3 sm:mb-4">
              SKILL → PROOF → PRODUCT
            </p>
            
            {/* Hero Line - Large, Different Font */}
            <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0a0a] dark:text-[#e5e5e5] leading-tight mb-4 sm:mb-6">
              This is a portfolio of shipped systems — not claims.
            </h1>
            
            {/* Supporting Line - Muted */}
            <p className="text-sm sm:text-base text-[#6b5d52] dark:text-[#737373] leading-relaxed max-w-2xl">
              Explore capabilities to see the skills involved, proof of work, and the products built with them.
            </p>
          </div>
        </header>

        {/* Capabilities Section */}
        <section className="mb-12 sm:mb-16">
          <CapabilitySelector
            capabilities={capabilitiesData}
            selectedCapability={selectedCapability}
            onSelect={handleCapabilitySelect}
          />
        </section>

        {/* Instructional Text Below Cards */}
        {!selectedCapability && (
          <section className="text-center py-12 sm:py-16 lg:py-20">
            <h2 className="text-lg sm:text-xl text-[#0a0a0a] dark:text-[#e5e5e5] mb-3">
              Select a capability to explore
            </h2>
            <p className="text-sm text-[#6b5d52] dark:text-[#737373] max-w-md mx-auto px-4">
              Each capability reveals skills, proof, and real products.
            </p>
          </section>
        )}

        {/* Dynamic Content: Skills → Proof → Products */}
        <AnimatePresence mode="wait">
          {selectedCapability && (
            <section className="mb-16 sm:mb-20">
              {/* Mobile: Stacked Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                
                {/* Skills Panel */}
                <div className="bg-[#ebe7e0] dark:bg-[#0f0f0f] border border-[#d4cfc5] dark:border-[#262626] rounded-lg p-4 sm:p-6">
                  <SkillBreakdownPanel skills={filteredSkills} />
                </div>

                {/* Proof Preview - Hidden on mobile, shown on tablet+ */}
                <div className="hidden lg:block bg-[#ebe7e0] dark:bg-[#0f0f0f] border border-[#d4cfc5] dark:border-[#262626] rounded-lg p-4 sm:p-6 min-h-[400px]">
                  <ProofPreview capability={selectedCapability} />
                </div>

                {/* Products List */}
                <div className="bg-[#ebe7e0] dark:bg-[#0f0f0f] border border-[#d4cfc5] dark:border-[#262626] rounded-lg p-4 sm:p-6 max-h-[600px] overflow-y-auto">
                  <ProductList
                    products={filteredProducts}
                    onSelect={handleProductSelect}
                    selectedProduct={selectedProduct}
                  />
                </div>
              </div>
            </section>
          )}
        </AnimatePresence>

        {/* About Section - Shows after capability explored or at bottom */}
        {selectedCapability && <About />}

        {/* Footer */}
        <footer className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-[#d4cfc5] dark:border-[#262626]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b5d52] dark:text-[#737373]">
            <div className="font-mono text-center sm:text-left">
              Built with React + Vite + Tailwind + Framer Motion
            </div>
            <div>
              {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

