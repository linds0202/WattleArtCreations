import Link from "next/link"

export default function Corporate() {
    

    return (
        <main className="bg-black text-white no-underline flex justify-around items-center min-h-screen px-8">
            <Link href={{
              pathname: '/corporate/orders',
              query: {productChoice: 'Advertising'},
              }} 
              className="text-2xl no-underline border-2 border-white rounded-lg p-2"
            >
                <p>Advertising</p>
            </Link>
            <Link href={{
              pathname: '/corporate/orders',
              query: {productChoice: 'StoryOrBookIllustrations'},
              }} 
              className="text-2xl no-underline border-2 border-white rounded-lg p-2"
            >
                <p>Story / Book Illustrations</p>
            </Link>
            <Link href={{
              pathname: '/corporate/orders',
              query: {productChoice: 'TableTopIllustrations'},
              }} 
              className="text-2xl no-underline border-2 border-white rounded-lg p-2"
            >
                <p>Table Top Illustrations</p>
            </Link>
            <Link href={{
              pathname: '/corporate/orders',
              query: {productChoice: 'VideoGameAssets'},
              }} 
              className="text-2xl no-underline border-2 border-white rounded-lg p-2"
            >
                <p>Video Game Assets</p>
            </Link>

        </main>
    )
}