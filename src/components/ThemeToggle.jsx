import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
        isDark ? 'bg-[#1f1f1f]' : 'bg-[#d4cfc5]'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle indicator */}
      <motion.div
        className={`absolute top-1 w-5 h-5 rounded-full shadow-md ${
          isDark ? 'bg-[#e5e5e5]' : 'bg-[#0a0a0a]'
        }`}
        animate={{
          left: isDark ? '4px' : 'calc(100% - 24px)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      
      {/* Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <span className="text-xs opacity-60">🌙</span>
        <span className="text-xs opacity-60">☀️</span>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
