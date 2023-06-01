import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
const text = ['Menu', 'Portraits', 'Consultations', 'Customers', 'Artists']

export const MenuItem = ({ i }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={text[i] !== 'Menu' ? { scale: 1.1 } : {}}
      whileTap={text[i] !== 'Menu' ? { scale: 1.1 } : {}}
    ><p className={text[i] === 'Menu' ? 'text-white text-5xl font-bold mb-2 pl-[5%]' : 'text-white text-xl hover:underline pl-[10%]'}>{text[i]}</p>
    </motion.li>
  );
};
