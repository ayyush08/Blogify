import React from 'react';
import { Button } from './ui/button';
const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-400 dark:bg-gradient-to-r dark:from-teal-800 dark:via-teal-900 dark:to-emerald-700 text-white py-[10rem]">
        <div className="absolute inset-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-teal-200 dark:to-teal-700"></div>
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Welcome to Blogify
                </h1>
                <p className="text-lg md:text-2xl mb-8">
                    Discover insightful articles, tutorials, and updates from across the web.
                </p>
            </div>
            <div>
                <Button>Learn More</Button>
            </div>
        </section>
    );
};

export default Hero;
