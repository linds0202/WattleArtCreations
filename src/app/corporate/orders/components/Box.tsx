import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface BoxProps {
  choice: string,
  setSelection: Function,
  setOpenWizard: Function
}

export function Box({ choice, setSelection, setOpenWizard }: BoxProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"]
  });

  const scale = useTransform(scrollYProgress, [0, .25, 0.75, 1], [0.5, 1, 1, 0.5]);

  function handleClick(choice: string) {
    setSelection(choice)
    setOpenWizard(true)
  }

  return (
    <motion.div 
      ref={ref} 
      className="box" 
      style={{ scale }}
  >
      <button onClick={() => handleClick(choice)}>
        <motion.p
          style={{ scale }}
          whileHover={{
            rotate: [0, 5, 0, -5, 0],
            transition: {repeat: Infinity, duration: 1}
          }}
        >
          {choice}
        </motion.p>
      </button>
    </motion.div>
  )
}