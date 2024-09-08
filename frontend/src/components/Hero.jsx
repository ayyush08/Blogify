import React from 'react';

const Hero = () => {
    return (
        <section className="bg-gradient-to-r from-teal-500 from-10% via-teal-500 via-30% to-emerald-500 to-90%  dark:bg-teal-800 text-white py-[10rem]">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to Blogify
                </h1>
                <p className="text-lg md:text-2xl mb-8">
                    Discover insightful articles, tutorials, and updates from across the web.
                </p>
                <a href="/about" className="bg-white dark:bg-gray-700 dark:text-white text-teal-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-100 dark:hover:bg-gray-600 transition-colors duration-300">
                    Learn More
                </a>
            </div>
        </section>
    );
};

export default Hero;
