'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
const ANIMATION_DURATION = 400;

interface IReviewContent {
    destinationVisited: string
    guestImage: { asset: string }
    guestName: string
    guestReview: string
}

const FullPageSlider = ({ reviewContent }: { reviewContent: IReviewContent[] }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const [isAnimating, setIsAnimating] = useState(false);

    const startSlide = (dir: 'left' | 'right') => {
        if (isAnimating) return;
        setDirection(dir);
        const computedNext =
            dir === 'right'
                ? (currentIndex + 1) % reviewContent.length
                : (currentIndex - 1 + reviewContent.length) % reviewContent.length;
        setNextIndex(computedNext);
        setIsAnimating(true);

        setTimeout(() => {
            setCurrentIndex(computedNext);
            setNextIndex(null);
            setIsAnimating(false);
        }, ANIMATION_DURATION);
    };

    const current = reviewContent[currentIndex];
    const incoming = nextIndex !== null ? reviewContent[nextIndex] : null;

    const slideClassForCurrent = isAnimating
        ? direction === 'right'
            ? 'slide-out-left'
            : 'slide-out-right'
        : 'slide-center';

    const slideClassForNext = isAnimating
        ? direction === 'right'
            ? 'slide-in-from-right'
            : 'slide-in-from-left'
        : '';

    return (
        <div>
            <div className="relative inset-0 bg-theme-primary flex items-center justify-center z-10 overflow-hidden">
                <button
                    onClick={() => startSlide('left')}
                    className="absolute left-0 md:left-8 bottom-1 md:top-1/2 -translate-y-1/2 w-10 h-10 flex items-center rounded-full justify-center hover:border-2 hover:border-slate-200 hover:scale-105 transition-transform duration-800 z-50 cursor-pointer"
                    aria-label="Previous"
                    disabled={isAnimating}
                >
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="white" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-full max-w-6xl h-[80vh] md:h-[90vh]">
                        {/* Current slide */}
                        <div
                            key={`current-${currentIndex}`}
                            className={`absolute inset-0 flex items-center justify-center overflow-hidden ${slideClassForCurrent}`}
                            style={{ transitionDuration: `${ANIMATION_DURATION}ms` }}
                        >
                            <div className="w-2/5 md:w-1/2 p-6 md:p-10 flex flex-col justify-center h-full">
                                <h2 className="hidden md:block md:text-3xl font-bold text-white mb-4">{current.guestName}</h2>
                                <p className="text-xs md:text-sm text-white  mb-6">{current.guestReview}</p>
                                <span className="hidden md:block text-xs md:text-sm text-slate-300">{current.destinationVisited}</span>
                            </div>
                            <div className="w-3/5 md:w-1/2 h-3/5 md:h-4/5 flex items-center justify-center bg-theme-primary-light relative">
                                <h2 className="block md:hidden absolute -top-10 text-sm md:text-3xl font-bold text-white mb-4">{current.guestName}</h2>
                                <Image src={urlFor(current.guestImage?.asset)?.url()} alt={`${current.guestName} image`} fill className="object-cover" priority />
                                <span className="block md:hidden  text-xs md:text-sm text-slate-300 absolute -bottom-10">{current.destinationVisited}</span>
                            </div>
                        </div>

                        {/* Incoming slide (render only during animation) */}
                        {isAnimating && incoming && (
                            <div
                                key={`next-${nextIndex}`}
                                className={`absolute inset-0 flex items-center justify-center overflow-hidden ${slideClassForNext}`}
                                style={{ animationDuration: `${ANIMATION_DURATION}ms` }}
                            >
                                <div className="w-2/5 md:w-1/2 p-6 md:p-10 flex flex-col justify-center h-full">
                                    <h2 className=" hidden md:block md:text-3xl font-bold text-white mb-4">{incoming.guestName}</h2>
                                    <p className="text-xs md:text-sm text-white mb-6">{incoming.guestReview}</p>
                                    <span className="hidden md:block md:text-sm text-slate-300">{incoming.destinationVisited}</span>
                                </div>
                                <div className="w-3/5 md:w-1/2 h-3/5 md:h-4/5 flex items-center justify-center bg-theme-primary-light relative">
                                    <Image src={urlFor(incoming.guestImage?.asset)?.url()} alt={`${incoming.guestName} image`} fill className="object-cover" priority />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => startSlide('right')}
                    className="absolute right-0 md:right-8 bottom-1 md:top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hover:border-2 hover:border-slate-200 hover:scale-105 transition-transform duration-800 z-50 cursor-pointer"
                    aria-label="Next"
                    disabled={isAnimating}
                >
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="white" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>



                <style jsx global>{`
                .slide-center {
                    transform: translateX(0);
                    z-index: 10;
                }
                .slide-out-left {
                    transform: translateX(-100vw);
                    transition: transform ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 10;
                }
                .slide-out-right {
                    transform: translateX(100vw);
                    transition: transform ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 10;
                }
                .slide-in-from-right {
                    transform: translateX(100vw);
                    animation: slideInFromRight ${ANIMATION_DURATION}ms forwards cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 20;
                }
                .slide-in-from-left {
                    transform: translateX(-100vw);
                    animation: slideInFromLeft ${ANIMATION_DURATION}ms forwards cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 20;
                }
                @keyframes slideInFromRight {
                    to {
                        transform: translateX(0);
                    }
                }
                @keyframes slideInFromLeft {
                    to {
                        transform: translateX(0);
                    }
                }
            `}</style>
            </div >
            <div className="text-center mt-4 text-black font-medium mb-10">
                {currentIndex + 1} / {reviewContent.length}
            </div>
        </div>
    );
};

export default FullPageSlider;