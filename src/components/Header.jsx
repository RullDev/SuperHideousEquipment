
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="py-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center"
      >
        <div className="flex items-center">
          <div className="neoxr-icon mr-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 2C7.5 2 4.5 4.5 4.5 9.5C4.5 14 8.5 20 12 22C15.5 20 19.5 14 19.5 9.5C19.5 4.5 16.5 2 13 2H11Z" fill="#FFD700" stroke="#FFD700" strokeWidth="1.5"/>
              <path d="M12 18.5C14.5 16.5 16.5 12.5 16.5 9.5C16.5 6 14.5 5 12.5 5H11.5C9.5 5 7.5 6 7.5 9.5C7.5 12.5 9.5 16.5 12 18.5Z" fill="white" stroke="white" strokeWidth="0.5"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              GHIBLI API
            </h1>
            <p className="text-gray-400 text-sm">Image Transformation Service</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="neoxr-status mx-auto mt-6"
      >
        <p className="font-medium">📢 Transform your images into Ghibli style art</p>
      </motion.div>
    </header>
  );
};

export default Header;
