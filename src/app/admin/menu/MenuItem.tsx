import { motion } from "framer-motion";
import { useContext } from 'react'
import { ViewContext } from "../AdminContext";

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

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF", "ffffff"];
const text = ['Menu', 'Portraits', 'Unordered Portraits', 'All Users', 'Testimonials', 'Consultations', 'Edit']

export const MenuItem = ({ i }: any) => {
  const style = { border: `2px solid ${colors[i]}` };
  const { view, setView } = useContext(ViewContext)
  return (
    <motion.li
      variants={variants}
      whileHover={text[i] !== 'Menu' ? { scale: 1.1 } : {}}
      whileTap={text[i] !== 'Menu' ? { scale: 1.1 } : {}}
      onClick={() => setView(text[i])}
    ><p className={text[i] === 'Menu' ? 'text-white text-5xl font-bold mb-2 pl-[5%]' : 'text-white text-xl hover:underline pl-[10%]'}>{text[i]}</p>
    </motion.li>
  );
};
