
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative inline-block"
      >
        <h1 className="text-4xl sm:text-5xl font-fantasy font-bold text-ghibli-blue relative z-10">
          Studio Ghibli Image Transformer
        </h1>
        <div className="absolute -bottom-3 left-0 w-full h-3 bg-ghibli-green/30 rounded-full transform -rotate-1 z-0"></div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4"
      >
        <p className="text-xl text-gray-600 mb-2">
          Transform your photos into magical Ghibli-style art
        </p>
        <div className="flex justify-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-ghibli-blue"></span>
          <span className="inline-block w-2 h-2 rounded-full bg-ghibli-green"></span>
          <span className="inline-block w-2 h-2 rounded-full bg-ghibli-yellow"></span>
          <span className="inline-block w-2 h-2 rounded-full bg-ghibli-pink"></span>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
