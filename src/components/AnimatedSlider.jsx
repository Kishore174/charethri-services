import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  "Property Registrations",
  "E-Stamp at Your Doorstep",
  "Khata Transfers (BBMP / CMS / Panchayat)",
  "Marriage Registrations",
  "Legal Opinion – Property Document Checklist",
  "Certified Copies of Revenue Documents",
  "Encumbrance Certificate Services",
];

const AnimatedSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000); // change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      <div className="text-center px-6">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-3xl md:text-5xl font-bold tracking-wide"
          >
            {slides[index]}
          </motion.h1>
        </AnimatePresence>

        <p className="mt-4 text-gray-300 text-sm md:text-lg">
          Trusted • Fast • Government Approved Services
        </p>
      </div>
    </div>
  );
};

export default AnimatedSlider;
