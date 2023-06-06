import {
    motion
} from "framer-motion";

const ActionCall = () => {

    return (
        <div 
            className="w-full h-[90vh] mt-[100px] mb-[200px] flex justify-center items-center"
        >
            <motion.div
                className="w-full h-[90vh] mt-[100px] flex flex-col justify-center items-center cta-frame pl-[200px] pr-[225px]"
                initial={{opacity: 0, scale: 0}} 
                whileInView={{opacity: 1, scale: 1}}
                viewport={{ once: true }} 
                transition={{type: "spring", bounce: 0.5, duration: 1}}
            >
                <h2 className="mx-auto text-center text-4xl font-bold mb-8 w-6/12">Ready to start building something epic?</h2>
                <p className="text-center ml-[150px] mr-[75px] mb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                autem est vitae magni alias, delectus atque repudiandae maiores
                molestiae fuga error a, laboriosam velit voluptas odio inventore
                modi libero, ratione quas neque. Corporis, nam?
                </p>
                <button className="mx-auto block mb-14 text-black text-3xl border-black border-2 px-10 py-2 rounded-2xl hover:bg-black hover:text-white transition-color duration-200">Start Customizing</button>
            </motion.div>
        </div>
    )
}

export default ActionCall