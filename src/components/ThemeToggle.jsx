import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full transition-colors duration-300 bg-[#262626] dark:bg-[#1f1f1f]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Toggle indicator */}
      <motion.div
        className="absolute top-1 w-5 h-5 rounded-full bg-[#0a0a0a] dark:bg-[#e5e5e5] shadow-md"
        animate={{
          left: theme === 'dark' ? '4px' : 'calc(100% - 24px)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      
      {/* Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <span className="text-xs">🌙</span>
        <span className="text-xs">☀️</span>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
