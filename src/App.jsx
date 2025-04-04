
import { motion } from 'framer-motion';
import GhibliImageConverter from './components/GhibliImageConverter';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen bg-neoxr-dark py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >
        <Header />
        <GhibliImageConverter />
        <Footer />
      </motion.div>
    </div>
  );
}
