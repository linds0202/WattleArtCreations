import * as React from "react";
import { useRef, useState } from "react";
import { motion, sync} from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

import './styles.css'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const MenuContainer = () => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const [open, setOpen] = useState(true)

  const toggleThingy = () => {
    setOpen(prev => !prev)
  }
  console.log(open)

  return (
    <motion.nav
      initial={false}
      animate={open ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className="background" variants={sidebar} />
      <Navigation />
      <MenuToggle toggle={toggleThingy} func={toggleThingy}/>
      {/* <button onClick={() => console.log('this works')}>Click me</button> */}
    </motion.nav>
  );
};