

export default function MyCarousel ({ selection }) {

    console.log('this is the options: ', selection)

    return (
        <div className="p-4 w-7/12 h-full flex items-center border-2 border-red-600">
            <div className="w-3/12 h-4/5 overflow-hidden border-2 border-red-600 flex flex-col justify-start items-center">
                <div className="w-[100px] h-[150px] mt-4" >
                    <img src='/featured_8.png' />
                </div>
                <div className="w-[100px] h-[150px] mt-4" >
                    <img src='/featured_8.png' />
                </div>
                <div className="w-[100px] h-[150px] mt-4" >
                    <img src='/featured_8.png' />
                </div>
                <div className="w-[100px] h-[150px] mt-4" >
                    <img src='/featured_8.png' />
                </div>
                <div className="w-[100px] h-[150px] mt-4" >
                    <img src='/featured_8.png' />
                </div>
                <div className="w-[100px] h-[150px] mt-4" >
                    <img src='/featured_8.png' />
                </div>
                <div className="w-[100px] h-[150px] mt-4" >
                    <img src='/featured_8.png' />
                </div>
                <div className="w-[100px] h-[150px] mt-4" >
                    <img src='/featured_8.png' />
                </div>
            </div>
            <div className="w-full h-[90%] flex justify-center">
                <img className="w-10/12 object-contain" src='/featured_8.png' />
            </div>
        </div>
    );
}
