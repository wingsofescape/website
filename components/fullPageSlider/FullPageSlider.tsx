'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const reviewContent = [
    {
        name: 'Test',
        review: 'TestReview1',
        destination: 'Test',
        image: '/images/planyourtrip.jpg'
    },
    {
        name: 'Test',
        review: 'TestReview2',
        destination: 'Test',
        image: '/images/planyourtrip.jpg'
    },
    {
        name: 'Test',
        review: 'TestReview3',
        destination: 'Test',
        image: '/images/planyourtrip.jpg'
    },
    {
        name: 'Test',
        review: 'TestReview4',
        destination: 'Test',
        image: '/images/planyourtrip.jpg'
    },
];

const FullPageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const [isAnimating, setIsAnimating] = useState(false);

    const nextSlide = () => {
        if (isAnimating) return;
        setDirection('right');
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % reviewContent.length);
            setIsAnimating(false);
        }, 400);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setDirection('left');
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + reviewContent.length) % reviewContent.length);
            setIsAnimating(false);
        }, 400);
    };

    const { name, review, destination, image } = reviewContent[currentIndex];

    return (
        <div className="h-[900px] bg-theme-primary flex items-center justify-center">
            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className=" left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200"
                aria-label="Previous"
                disabled={isAnimating}
            >
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            {/* Slide Content */}
            <div
                className={`flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto bg-transparent overflow-hidden
                transition-transform duration-400
                ${isAnimating ? (direction === 'right' ? 'animate-slide-out-left' : 'animate-slide-out-right') : 'animate-slide-in'}
                `}
                style={{ minHeight: 400 }}
            >
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold test-white mb-4">{name}</h2>
                    <p className="text-lg test-white italic mb-6">{review}</p>
                    <span className="test-white font-medium">Destination: {destination}</span>
                </div>
                <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-theme-primary-light">
                    <Image
                        src={image}
                        alt={name + " image"}
                        width={1200}
                        height={1200}
                        className="object-cover"
                        priority
                    />
                </div>

            </div>
            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className=" right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200"
                aria-label="Next"
                disabled={isAnimating}
            >
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            {/* Slide Indicator */}
            {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 test-white text-lg">
                {currentIndex + 1} / {reviewContent.length}
            </div> */}
            {/* <style jsx global>{`
                .animate-slide-in {
                    transform: translateX(0);
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .animate-slide-out-left {
                    transform: translateX(-100vw);
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .animate-slide-out-right {
                    transform: translateX(100vw);
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style> */}
        </div>
    );
};

export default FullPageSlider;