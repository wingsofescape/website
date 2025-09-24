'use client';
import React, { useState } from 'react'
const Carousal = () => {

    const array1 = [
        {
            cardName: 'Card1',
            image: '/images/bg1.jpg',
            text: ''
        },
        {
            cardName: 'Card2',
            image: '/images/bg2.jpg',
            text: ''
        },
        {
            cardName: 'Card3',
            image: '/images/bg3.jpg',
            text: ''
        },
        {
            cardName: 'Card4',
            image: '/images/bg4.jpg',
            text: ''
        },
        {
            cardName: 'Card5',
            image: '/images/bg5.jpg',
            text: ''
        },
        {
            cardName: 'Card6',
            image: '/images/bg6.jpg',
            text: ''
        },
        {
            cardName: 'Card7',
            image: '/images/bg7.jpg',
            text: ''
        },
        {
            cardName: 'Card8',
            image: '/images/bg8.jpg',
            text: ''
        },
        {
            cardName: 'Card9',
            image: '/images/bg9.jpg',
            text: ''
        },
        {
            cardName: 'Card10',
            image: '/images/bg2.jpg',
            text: ''
        },
        {
            cardName: 'Card11',
            image: '/images/bg3.jpg',
            text: ''
        }
    ]
    const [center, setCenter] = useState(0);
    const slideLeft = () => {
        setCenter((prev) => (prev - 1 + array1.length) % array1.length);
    }
    const slideRight = () => {
        setCenter((prev) => (prev + 1) % array1.length);
    }

    return (
        <div className="w-full relative overflow-hidden py-20" >
            <div
                className="flex transition-transform duration-700 ease-in-out w-4/5 "
                style={{
                    transform: `translateX(-${center * 256}px)`
                }}>

                {
                    array1.map((element) =>
                        <div key={element.cardName} className={`h-80 w-60 rounded-3xl ring ring-slate-50 text-center text-theme-primary m-2 flex-shrink-0 shadow-xl`}
                            style={{
                                backgroundImage: `url(${element.image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}>
                            {/* //shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] */}
                        </div>
                    )
                }

            </div>
            <button type="button"
                className="ring ring-slate-300 rounded-full cursor-pointer h-8 w-8 bg-transparent text-theme-primary-dark hover:bg-slate-300  font-semibold disabled:bg-slate-300 absolute left-[40%] bottom-1"
                // className="bg-gray-200 p-4 cursor-pointer absolute left-[40%] bottom-1 text-theme-primary"
                onClick={() => slideLeft()}
                //     style={{
                //         borderRadius: '50px',
                //         background: `linear-gradient(315deg, #d2d0d0, #f9f7f7)`,
                //         boxShadow: `-10px -10px 20px #757474,
                //  10px 10px 20px #ffffff`
                //     }}
                disabled={center === 0}
            >{'<'}</button>
            <button type="button"
                className="ring ring-slate-300 rounded-full cursor-pointer h-8 w-8 bg-transparent text-theme-primary-dark  hover:bg-slate-300 font-semibold disabled:bg-slate-300 absolute right-[40%] bottom-1"
                // className="bg-gray-200 p-4 cursor-pointer absolute right-[40%] bottom-1 text-theme-primary !hover:bg-slate-300"
                onClick={() => slideRight()}

                disabled={center === array1.length}
            >{'>'}</button>


        </div >
    )
}

export default Carousal;