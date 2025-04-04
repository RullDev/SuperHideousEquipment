
import { motion } from 'framer-motion';
import GhibliImageConverter from './components/GhibliImageConverter';
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto"
      >
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
        
        <GhibliImageConverter />

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center text-gray-500"
        >
          <p className="text-sm">
            Created with ❤️ using React, Tailwind CSS, and Framer Motion
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
