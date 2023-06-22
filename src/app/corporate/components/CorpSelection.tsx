import { ModeProps } from "./CorpHome"
import Link from "next/link"

const CorpSelection = ({ mode, setMode }: ModeProps) => {

    const handleHome = () => {
        setMode('CorpHome')
    }

    return (
        <div className="h-[100vh] flex flex-col justify-around items-center">
            <h1 className="text-5xl font-bold">{mode}</h1>
            <button onClick={handleHome} >Return to Corporate Home</button>
            {/* <Link href={{
                pathname: '/corporate',
                query: {selection: 'CorpHome'},
                }} 
            className="text-xl no-underline text-center hover:text-orange-600"
        >
            Return to Corporate Home
        </Link> */}
        </div>   
    )
}

export default CorpSelection