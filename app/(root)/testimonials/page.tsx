'use client';
import FullPageSlider from '@/components/fullPageSlider/FullPageSlider';
import { POST_QUERY, SANITY_QUERY_OPTION } from '@/lib/constants';
import { sanityFetch } from '@/sanity/lib/fetch';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default function Reviews() {
    const instagram = "/logos/instagram.png";

    const google = "/logos/google.png";

    const [reviewContent, setReviewContent] = React.useState([]);
    React.useEffect(() => {
        const getReviews = async () => {
            const reviews = await sanityFetch(
                POST_QUERY.getTestemonial,
                SANITY_QUERY_OPTION
            );
            setReviewContent(reviews[0].heroBannerHeading.testemonials);
            console.log(reviews[0].heroBannerHeading.testemonials);
        }
        getReviews();
    }, [])

    return (
        <>
            <div className='container p-5 md:p-20 mx-auto flex flex-col md:flex-row gap-8'>
                <div className='flex flex-col'>
                    <h1 className='text-theme-primary-dark text-4xl md:text-6xl my-5 md:my-10'>
                        Happy Escapes
                    </h1>
                    <p className='text-theme-primary-dark text-md md:text-xl font-extralight'>
                        As your travel plans take shape, our excitement to craft an unforgettable journey for you only grows stronger.
                    </p>
                    <br></br>
                    <p className='text-theme-primary-dark text-md md:text-xl'>When you return, your stories, smiles, and memories become part of what inspires us every day. Share your experience, send us your favourite moments, and join our ever-growing circle of happy travellers - because with Wings of Escape, every journey is just the beginning.</p>
                </div>
                <Image
                    src="/images/reviewsImage.jpg"
                    alt="Reviews Image"
                    width={600}
                    height={400}
                    className="object-cover"
                />
            </div>
            {reviewContent.length && <FullPageSlider reviewContent={reviewContent} />}
            <section className='w-full md:px-20 mx-auto flex items-center justify-center relative'>
                <div className='flex bg-theme-primary-light/10 py-5 md:py-10 md:px-20 flex-col items-center justify-center my-5 md:my-20 mx-auto w-3/4'>
                    <h2 className='text-md md:text-2xl lg:text-3xl my-5 md:my-6 text-theme-primary-dark z-10 text-center px-8 md:px-0 italic'>CHECK OUT MORE REVIEWS ON</h2>
                    <div className='flex gap-1 nnd:gap-10 w-full md:w-3/4'>
                        <div className="w-full p-4 md:p-6 md:h-50 flex flex-col justify-between items-center text-center">
                            <div className="iconContainer mb-4 ">
                                <Image src={instagram} alt="Instagram" width={100} height={100} className="inline-block !h-15 !w-15 md:!h-30 md:!w-30" />
                            </div>
                            <div className="contentBox">
                                <Link href="https://www.instagram.com/wingsofescape_?igsh=eDgwOXRoeWc0ODh4&utm_source=qr" target="_blank" rel="noopener noreferrer">
                                    <h3 className="text-xs md:text-lg font-extralight mb-5 text-theme-primary-dark cursor-pointer underline">Instagram</h3>
                                </Link>
                            </div>
                        </div>
                        <div className="w-full p-4 md:p-6 md:h-50 flex flex-col justify-between text-center">
                            <div className="iconContainer mb-4 ">
                                <Image src={google} alt="Google Reviews" width={100} height={100} className="inline-block !h-15 !w-15 md:!h-30 md:!w-30" />
                            </div>
                            <div className="contentBox">
                                <Link href="https://www.google.com/search?q=wings+of+escape&rlz=1C1CHBF_enIN1128IN1128&oq=wings+of+escape&gs_lcrp=EgZjaHJvbWUyDggAEEUYJxg5GIAEGIoFMggIARAAGBYYHjIICAIQABgWGB4yCAgDEAAYFhgeMggIBBAAGBYYHjIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDU5ODVqMGo3qAIIsAIB8QWXTLWSeHEMQfEFl0y1knhxDEE&sourceid=chrome&ie=UTF-8#" target="_blank" rel="noopener noreferrer">
                                    <h3 className="text-xs md:text-lg font-extralight mb-5 text-theme-primary-dark cursor-pointer underline" >Google Reviews</h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
