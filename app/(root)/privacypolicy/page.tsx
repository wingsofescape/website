import { POST_QUERY, SANITY_QUERY_OPTION } from '@/lib/constants';
import { sanityFetch } from '@/sanity/lib/fetch';
import { SanityDocument } from 'next-sanity';
import React from 'react'

async function getPrivacyPolicyContent(): Promise<SanityDocument[]> {
    return await sanityFetch(POST_QUERY.privacyPolicyContent, SANITY_QUERY_OPTION);
}
const PrivacyPolicy = async () => {
    const res = await getPrivacyPolicyContent();
    const data = res[0];
    console.log(data);


    return (
        <div className="flex flex-col md:justify-end items-center mx-auto w-full flex-wrap pb-5 md:pb-0 bg-background text-white">
            <div className='bg-theme-primary w-full py-5'>
                <h1 className="text-3xl md:text-4xl px-2 text-center">
                    {data.heading}
                </h1>
                <hr className="w-20 h-1 bg-theme-primary-accent rounded-2xl mx-auto mt-5"></hr>
            </div>
            {data?.privacyPolicyContent?.length && <section className="w-full flex flex-col items-start bg-background text-black pt-0 md:py-5 px-5 md:px-15">
                {data.privacyPolicyContent.map((item: { heading: string, text: string[] }, index: number) => (
                    <div key={index} className="my-5 w-full">
                        <div key={index} className="w-full md:w-3/5 md:px-0 my-4">
                            <h2 className="text-2xl md:text-3xl mb-2 ">{item.heading}</h2>
                        </div>
                        {
                            item.text.map((paragraph: string, pIndex: number) => (
                                <p key={pIndex} className="text-md md:text-lg leading-7 w-full my-4 font-light">{paragraph}</p>
                            ))
                        }
                    </div>
                ))}
            </section>}
        </div>
    )
}

export default PrivacyPolicy;