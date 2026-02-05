import { motion } from 'framer-motion';

const CapabilitySelector = ({ capabilities, selectedCapability, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      {capabilities.map((capability, index) => {
        const isSelected = selectedCapability?.id === capability.id;
        
        return (
          <motion.button
            key={capability.id}
            onClick={() => onSelect(capability)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={`
              group relative overflow-hidden
              px-4 py-5 sm:px-5 sm:py-6 text-left 
              border rounded-xl
              transition-all duration-300 ease-out
              touch-manipulation active:scale-95
              ${isSelected 
                ? 'bg-[#e3ddd3] dark:bg-[#1a1f2e] border-[#3b82f6] shadow-lg shadow-blue-500/20' 
                : 'bg-[#ebe7e0] dark:bg-[#0f0f0f] border-[#d4cfc5] dark:border-[#262626] hover:border-[#b8b0a3] dark:hover:border-[#404040] hover:bg-[#e3ddd3] dark:hover:bg-[#151515]'
              }
            `}
            whileHover={{ 
              y: -4,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Subtle gradient overlay */}
            <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-100 
              bg-gradient-to-br from-blue-500/5 to-transparent
              transition-opacity duration-300
              ${isSelected ? 'opacity-100' : ''}
            `} />
            
            {/* Icon - minimal movement */}
            <div className="relative text-3xl sm:text-4xl mb-3 sm:mb-4 opacity-90">
              {capability.icon}
            </div>
            
            {/* Title - clean typography */}
            <h3 className={`
              relative text-base sm:text-lg font-semibold mb-2 tracking-tight
              transition-colors duration-200
              ${isSelected ? 'text-[#0a0a0a] dark:text-[#ffffff]' : 'text-[#1a1410] dark:text-[#e5e5e5] group-hover:text-[#0a0a0a] dark:group-hover:text-[#ffffff]'}
            `}>
              {capability.label}
            </h3>
            
            {/* Description - subtle and readable */}
            <p className="relative text-xs sm:text-sm text-[#6b5d52] dark:text-[#8a8a8a] leading-relaxed">
              {capability.description}
            </p>
            
            {/* Minimal selection indicator */}
            {isSelected && (
              <motion.div
                layoutId="selected-indicator"
                className="absolute inset-0 border border-[#3b82f6] rounded-xl pointer-events-none"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CapabilitySelector;
