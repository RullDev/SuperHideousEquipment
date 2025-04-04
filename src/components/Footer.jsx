
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="mt-16 text-center text-gray-500"
    >
      <p className="text-sm">
        Created with ❤️ using React, Tailwind CSS, and Framer Motion
      </p>
      <p className="text-xs mt-2">
        Powered by Ghibli AI API
      </p>
    </motion.footer>
  );
};

export default Footer;
