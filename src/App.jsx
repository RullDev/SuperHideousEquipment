
import { motion } from 'framer-motion';
import GhibliImageConverter from './components/GhibliImageConverter';
import Header from './components/Header';
import Footer from './components/Footer';
import ApiDocumentation from './components/ApiDocumentation';
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto"
      >
        <Header />
        <GhibliImageConverter />
        <ApiDocumentation />
        <Footer />
      </motion.div>
    </div>
  );
}
