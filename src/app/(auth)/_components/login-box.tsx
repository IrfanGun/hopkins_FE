"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginBox() {
  return (
    <div className="login__box login__box--image relative hidden overflow-hidden bg-[radial-gradient(50%_50%_at_50%_50%,_#fff_0%,_#f57a31_90%)] md:block md:w-1/2">
      <div className="absolute inset-0">
        <span className="line-animation"></span>
        <span className="line-animation"></span>
        <span className="line-animation"></span>
        <span className="line-animation"></span>
        <span className="line-animation"></span>
        <span className="line-animation"></span>
        <span className="line-animation"></span>
      </div>

      {/* Image dengan animasi scaling & rotation */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center"
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: [0, 1], rotate: [45, 0] }}
        transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
      >
        <Image
          className="login__img"
          src="/img/lmctm.png"
          alt="Safe"
          width={340}
          height={340}
          priority
        />
      </motion.div>
    </div>
  );
}
