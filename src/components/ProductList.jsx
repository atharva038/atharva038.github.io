import { motion } from 'framer-motion';

const StatusTag = ({ status }) => {
  const statusStyles = {
    'Production': 'bg-green-500/10 text-green-400 border-green-500/30',
    'Production-ready': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Live': 'bg-green-500/10 text-green-400 border-green-500/30',
    'Scaling': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };

  return (
    <span className={`px-2 py-1 text-xs font-mono border rounded ${statusStyles[status] || 'bg-dark-border text-dark-muted'}`}>
      {status}
    </span>
  );
};

const ProductList = ({ products, onSelect, selectedProduct }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 text-[#6b5d52] dark:text-[#737373]">
        <p className="text-sm">No products match this capability</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-3 sm:space-y-4"
    >
      <h2 className="text-xs sm:text-sm font-mono text-[#6b5d52] dark:text-[#737373] uppercase tracking-wider mb-4 sm:mb-6">
        Products built with this capability
      </h2>
      
      {products.map((product) => {
        const isSelected = selectedProduct?.id === product.id;
        
        return (
          <motion.button
            key={product.id}
            onClick={() => onSelect(product)}
            className={`
              w-full text-left p-3 sm:p-4 border rounded-lg transition-all
              touch-manipulation active:scale-98
              ${isSelected 
                ? 'bg-blue-500/5 border-blue-500' 
                : 'bg-[#f5f1eb] dark:bg-[#0f0f0f] border-[#d4cfc5] dark:border-[#262626] hover:border-[#b8b0a3] dark:hover:border-[#404040]'
              }
            `}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm sm:text-base font-medium text-[#0a0a0a] dark:text-[#e5e5e5] pr-2">
                {product.name}
              </h3>
              <StatusTag status={product.status} />
            </div>
            
            <p className="text-xs sm:text-sm text-[#6b5d52] dark:text-[#737373] mb-3 line-clamp-2">
              {product.problem}
            </p>
            
            <div className="flex flex-wrap gap-1.5">
              {product.stack.slice(0, 4).map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-xs font-mono bg-[#d4cfc5] dark:bg-[#262626] text-[#6b5d52] dark:text-[#737373] rounded">
                  {tech}
                </span>
              ))}
              {product.stack.length > 4 && (
                <span className="px-2 py-0.5 text-xs font-mono text-[#6b5d52] dark:text-[#737373]">
                  +{product.stack.length - 4}
                </span>
              )}
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default ProductList;
