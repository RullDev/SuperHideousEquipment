
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="mt-16 text-center text-gray-400 text-sm pb-10"
    >
      <div className="neoxr-card p-4 mb-4 text-center">
        <div className="text-white mb-2 font-medium">
          Use the main domain <span className="text-yellow-400 mono-font">ghibli.api.replit.app</span> when accessing this API
        </div>
        <div className="text-xs mono-font text-gray-500">
          Built with ❤️ and React.js
        </div>
      </div>
      
      <div className="neoxr-card p-4">
        <div className="flex items-center space-x-2 text-yellow-400 font-semibold mb-2">
          <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full"></span>
          <h3>CHANGELOG</h3>
        </div>
        <div className="flex space-x-4 py-2">
          <div className="mono-font">{new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}</div>
          <div className="text-left text-gray-200">[Update] UI improvement & design overhaul ✨</div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
