import React from 'react';

const Banner = () => {
    return (
        <div className="bg-transparent font-serif glass  py-6 px-4 sm:p-6 md:py-10 md:px-8 z-[-2] my-4 rounded-xl" >
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
                <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
                    <h1 className="text-xl mb-3 leading-4 font-bold text-black">
                        The Artwork Gallery
                    </h1>
                </div>
                <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
                    <img
                        src='/api/v1/product/product-photo/66579f34a1ca081b353966ff'
                        alt='pictureId-1'
                        className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full"
                        loading="lazy"
                    />
                    <img
                        src='/api/v1/product/product-photo/663a84d7f95207239bfc7254'
                        alt='pictureId-2'
                        className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32"
                        loading="lazy"
                    />
                    <img
                        src='/api/v1/product/product-photo/663a8571f95207239bfc7262'
                        alt='pictureId-3'
                        className="hidden w-full h-52 object-cover rounded-lg md:block lg:row-start-2 lg:col-span-2 lg:h-32"
                        loading="lazy"
                    />
                </div>
                <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
                    <dt className="sr-only">Reviews</dt>
                    <dd className="flex items-center">
                        <svg
                            width={24}
                            height={24}
                            fill="none"
                            aria-hidden="true"
                            className="mr-1 stroke-current dark:stroke-indigo-500"
                        >
                            <path
                                d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>
                            4.89 <span className="font-normal">(128)</span>
                        </span>
                    </dd>
                    <dt className="sr-only">Location</dt>
                    <dd className="flex items-center">
                        <svg
                            width={2}
                            height={2}
                            aria-hidden="true"
                            fill="currentColor"
                            className="mx-3 text-slate-300"
                        >
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <svg
                            width={24}
                            height={24}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1 text-slate-400 dark:text-slate-500"
                            aria-hidden="true"
                        >
                            <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
                            <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                        </svg>
                        Dhaka,Bangladesh
                    </dd>
                </dl>
                <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
                    <button
                        type="button"
                        className="flex gap-2 bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                        Shop Now
                    </button>
                </div>
                <p className="mt-4 text-sm font-semibold leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1">
                    Join us in celebrating creativity and expression. At the art gallery, every visit is a journey through the vibrant and ever-evolving world of art. Welcome to a space where every artwork tells a story, and every visit sparks inspiration.
                </p>
            </div>
        </div>


    );
};

export default Banner;