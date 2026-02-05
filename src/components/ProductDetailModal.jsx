import { motion, AnimatePresence } from 'framer-motion';

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#f5f1eb] dark:bg-[#0f0f0f] border border-[#d4cfc5] dark:border-[#262626] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#f5f1eb] dark:bg-[#0f0f0f] border-b border-[#d4cfc5] dark:border-[#262626] p-4 sm:p-6 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-medium text-[#0a0a0a] dark:text-[#e5e5e5] mb-2 break-words">
                {product.name}
              </h2>
              <span className={`
                px-3 py-1 text-xs font-mono rounded inline-block
                ${product.status === 'Production' || product.status === 'Live' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }
              `}>
                {product.status}
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-[#6b5d52] dark:text-[#737373] hover:text-[#0a0a0a] dark:hover:text-[#e5e5e5] transition-colors text-2xl leading-none touch-manipulation active:scale-90"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Problem */}
            <div>
              <h3 className="text-xs font-mono text-[#6b5d52] dark:text-[#737373] uppercase tracking-wider mb-3">
                Problem Solved
              </h3>
              <p className="text-sm sm:text-base text-[#0a0a0a] dark:text-[#e5e5e5] leading-relaxed">
                {product.problem}
              </p>
            </div>

            {/* Role */}
            <div>
              <h3 className="text-xs font-mono text-[#6b5d52] dark:text-[#737373] uppercase tracking-wider mb-3">
                My Role
              </h3>
              <p className="text-sm sm:text-base text-[#0a0a0a] dark:text-[#e5e5e5]">
                {product.role}
              </p>
            </div>

            {/* Stack */}
            <div>
              <h3 className="text-xs font-mono text-[#6b5d52] dark:text-[#737373] uppercase tracking-wider mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs sm:text-sm font-mono bg-[#d4cfc5] dark:bg-[#262626] text-[#0a0a0a] dark:text-[#e5e5e5] rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact */}
            <div>
              <h3 className="text-xs font-mono text-[#6b5d52] dark:text-[#737373] uppercase tracking-wider mb-3">
                Impact & Outcomes
              </h3>
              <ul className="space-y-3">
                {product.impact.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm sm:text-base text-[#0a0a0a] dark:text-[#e5e5e5]">
                    <span className="text-blue-500 mr-3 mt-1 font-bold flex-shrink-0">→</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
