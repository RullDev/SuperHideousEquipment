
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="text-center mb-12">
      <motion.h1 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-fantasy font-bold text-ghibli-blue"
      >
        Studio Ghibli Image Transformer
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-3 text-xl text-gray-600"
      >
        Transform your photos into magical Ghibli-style art
      </motion.p>
    </header>
  );
};

export default Header;
