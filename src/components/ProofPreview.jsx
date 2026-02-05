import { motion } from 'framer-motion';

const ProofPreview = ({ capability }) => {
  if (!capability) {
    return (
      <div className="h-full flex items-center justify-center text-[#6b5d52] dark:text-[#737373]">
        <div className="text-center">
          <div className="text-6xl mb-4">👈</div>
          <p className="text-sm">Select a capability to see proof</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={capability.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col items-center justify-center"
    >
      <div className="text-8xl mb-6">{capability.icon}</div>
      <h2 className="text-2xl font-medium text-[#0a0a0a] dark:text-[#e5e5e5] mb-3">
        {capability.label}
      </h2>
      <p className="text-[#6b5d52] dark:text-[#737373] text-center max-w-md">
        {capability.description}
      </p>
      
      <div className="mt-8 px-6 py-3 bg-[#d4cfc5] dark:bg-[#262626] rounded-lg">
        <p className="text-xs font-mono text-[#6b5d52] dark:text-[#737373]">
          CAPABILITY ACTIVE
        </p>
      </div>
    </motion.div>
  );
};

export default ProofPreview;
