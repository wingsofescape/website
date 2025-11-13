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
                    className="absolute left-0 md:left-8 -bottom-4 md:top-1/2 -translate-y-1/2 w-10 h-10 hidden md:flex items-center rounded-full justify-center hover:border-2 hover:border-slate-200 hover:scale-105 transition-transform duration-800 z-50 cursor-pointer"
                    aria-label="Previous"
                    disabled={isAnimating}
                >
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="white" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-full max-w-6xl h-[90vh]">
                        {/* Current slide */}
                        <div
                            key={`current-${currentIndex}`}
                            className={`absolute inset-0 flex flex-col md:flex-row items-center justify-start md:justify-center overflow-hidden ${slideClassForCurrent} gap-5`}
                            style={{ transitionDuration: `${ANIMATION_DURATION}ms` }}
                        >
                            <div className="w-full md:w-1/2 px-6 md:px-0 pt-10 md:p-10 flex flex-col justify-center h-1/3 md:h-full items-center md:items-start">
                                <h2 className="md:text-3xl font-bold text-white mb-3 md:mb-10">{current.guestName}</h2>
                                <p className="text-xs md:text-sm text-white mb-5">{current.guestReview}</p>
                                <span className="text-xs md:text-sm text-slate-300">{current.destinationVisited}</span>
                            </div>
                            <div className="w-11/12 md:w-1/2 h-2/3 md:h-4/5 flex items-center justify-center bg-theme-primary-light relative mb-5 md:mb-0">
                                <Image src={urlFor(current.guestImage?.asset)?.url()} alt={`${current.guestName} image`} fill className="object-cover" priority />
                            </div>
                        </div>

                        {/* Incoming slide (render only during animation) */}
                        {isAnimating && incoming && (
                            <div
                                key={`next-${nextIndex}`}
                                className={`absolute inset-0 flex flex-col md:flex-row items-center justify-start md:justify-center overflow-hidden ${slideClassForNext} gap-5`}
                                style={{ animationDuration: `${ANIMATION_DURATION}ms` }}
                            >
                                <div className="w-full md:w-1/2 px-6 pt-10 md:p-10 flex flex-col justify-center h-1/3 md:h-full items-center md:items-start">
                                    <h2 className="md:text-3xl font-bold text-white mb-3 md:mb-10">{incoming.guestName}</h2>
                                    <p className="text-xs md:text-sm text-white mb-5">{incoming.guestReview}</p>
                                    <span className="text-xs md:text-sm text-slate-300">{incoming.destinationVisited}</span>
                                </div>
                                <div className="w-11/12 md:w-1/2 h-2/3 md:h-4/5 flex items-center justify-center bg-theme-primary-light relative mb-5 md:mb-0">
                                    <Image src={urlFor(incoming.guestImage?.asset)?.url()} alt={`${incoming.guestName} image`} fill className="object-cover" priority />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => startSlide('right')}
                    className="absolute right-0 md:right-8 -bottom-4 md:top-1/2 -translate-y-1/2 w-10 h-10 rounded-full hidden md:flex items-center justify-center hover:border-2 hover:border-slate-200 hover:scale-105 transition-transform duration-800 z-50 cursor-pointer"
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
            <div className='relative'>
                <button
                    onClick={() => startSlide('left')}
                    className="absolute left-0 -bottom-4 -translate-y-1/4 w-10 h-10 flex md:hidden items-center rounded-full justify-center hover:border-2 hover:border-slate-200 hover:scale-105 transition-transform duration-800 z-50 cursor-pointer"
                    aria-label="Previous"
                    disabled={isAnimating}
                >
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="black" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="text-center my-5 text-black font-medium ">
                    {currentIndex + 1} / {reviewContent.length}
                </div>
                <button
                    onClick={() => startSlide('right')}
                    className="absolute right-0 -bottom-4 md:top-1/2 -translate-y-1/4 w-10 h-10 rounded-full flex md:hidden items-center justify-center hover:border-2 hover:border-slate-200 hover:scale-105 transition-transform duration-800 z-50 cursor-pointer"
                    aria-label="Next"
                    disabled={isAnimating}
                >
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="black" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FullPageSlider;