import React from "react";
import { motion } from "framer-motion";

import HeroImage from "./HeroImage";

const container = {
    show: {
        transition: {
          staggerChildren: 0.75,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: [0, 1, 1, 1, 1, 1, 0],
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 2,
      },
    },
};

const lastItem = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: .5,
      },
    },
  };


const HeroLoader = ({ setLoading }) => {
  
    return (
    <motion.div className="hero w-full">
        <motion.div
            variants={container}
            onAnimationComplete={() => setLoading(false)}
            initial="hidden"
            animate="show" 
            className="relative -z-1"
        >
            <ImageBlock variants={item} id="f_hero_drip_b" />
            <ImageBlock variants={item} id="f_hero_drip_1" />
            <ImageBlock variants={item} id="f_hero_drip_2" />
            <ImageBlock variants={item} id="f_hero_drip_3" />
            <ImageBlock variants={item} id="f_hero_drip_4" />
            <ImageBlock variants={lastItem} id="f_hero_drip" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5, duration: 2 }}
            >
                <h1 className="text-orange-500 font-bold text-6xl absolute top-40 right-40">Wattle Art Creations</h1>
            </motion.div>
        </motion.div>
    </motion.div>
  );
};

export const ImageBlock = ( { variants, id }) => {
  return (
    <motion.div
      variants={variants}
      className="absolute top-0"
    >
      <HeroImage
        src={`./drips/${id}.png`}
        alt={id}
      />
    </motion.div>
  );
};

export default HeroLoader;