import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-10 text-center text-sm text-gray-500"
    >
      <p className="flex items-center justify-center">
        <span className="mono-font mr-1">© {new Date().getFullYear()}</span> 
        <span>Ghibli Image Transformer</span>
        <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mx-2"></span>
        <span>All rights reserved</span>
      </p>
    </motion.footer>
  );
};

export default Footer;