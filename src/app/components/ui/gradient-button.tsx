"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function GradientButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="mb-8 w-full max-w-3xl text-center">
        <h1 className="mb-4 text-5xl font-extrabold md:text-7xl">
          <span className="text-blue-600">EVERY</span>
          <br />
          <span className="text-gray-900">SINGLE</span>
          <br />
          <span className="text-blue-600">GIVEAWAY</span>
        </h1>
        <p className="mb-8 text-xl font-semibold text-blue-500 md:text-2xl">
          Get free entries into giveaways with entries that never expire!
        </p>
      </div>

      <motion.button
        className="relative w-full max-w-xl overflow-hidden rounded-md py-6 text-3xl font-bold tracking-wide text-white shadow-lg md:text-4xl"
        style={{
          background: "linear-gradient(90deg, #0ea5e9, #8b5cf6)",
          backgroundSize: isHovered ? "200% 100%" : "100% 100%",
          transition: "background-position 0.5s ease-in-out",
        }}
        animate={{
          backgroundPosition: isHovered ? "100% 0%" : "0% 0%",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10">SIGN ME UP!</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
          animate={{
            opacity: [0, 1, 0],
            x: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          style={{ mixBlendMode: "overlay" }}
        />
      </motion.button>
    </div>
  );
}
