import { motion } from "motion/react";
import { useEffect } from "react";

function BootScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black text-white flex-col gap-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 1.2 }}
        className="text-4xl font-bold tracking-wide"
      >
        DevDesk
      </motion.h1>

      <motion.div
        className="flex gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.3,
              repeat: Infinity,
            },
          },
        }}
      >
        {[1, 2, 3].map((_, index) => (
          <motion.span
            key={index}
            className="w-2 h-2 bg-white rounded-full"
            variants={{
              visible: {
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                },
              },
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default BootScreen;
