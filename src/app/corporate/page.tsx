import Link from "next/link"

export default function Corporate() {
    

    return (
        <main className="bg-white text-black no-underline flex justify-around items-center h-[90vh] px-8">
            <Link href={{
              pathname: '/corporate/orders',
              query: {productChoice: 'Advertising'},
              }} 
              className="text-2xl no-underline border-2 border-black rounded-lg p-2"
            >
                <p>Advertising</p>
            </Link>
            <Link href={{
              pathname: '/corporate/orders',
              query: {productChoice: 'Story Or Book Illustrations'},
              }} 
              className="text-2xl no-underline border-2 border-black rounded-lg p-2"
            >
                <p>Story / Book Illustrations</p>
            </Link>
            <Link href={{
              pathname: '/corporate/orders',
              query: {productChoice: 'Table Top Illustrations'},
              }} 
              className="text-2xl no-underline border-2 border-black rounded-lg p-2"
            >
                <p>Table Top Illustrations</p>
            </Link>
            <Link href={{
              pathname: '/corporate/orders',
              query: {productChoice: 'Video Game Assets'},
              }} 
              className="text-2xl no-underline border-2 border-black rounded-lg p-2"
            >
                <p>Video Game Assets</p>
            </Link>

        </main>
    )
}