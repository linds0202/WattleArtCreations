import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    opacity: 1,
    y: [-150, 0],
    transition: { staggerChildren: 0.07, delayChildren: 0.4 }
  },
  closed: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = () => (
  <div>
    <motion.ul variants={variants} className="ml-[12%] border-l-2 border-white">
      {itemIds.map(i => (
        <MenuItem i={i} key={i} />
      ))}
    </motion.ul>
  </div>
  
);

const itemIds = [0, 1, 2, 3, 4, 5, 6, 7];