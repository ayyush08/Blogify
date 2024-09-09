import React from 'react'

const About = () => {
    return (
        <section id='about' className='p-10 relative bg-gradient-to-b from-teal-200 via-teal-100 to-teal-50 dark:from-teal-700 dark:via-emerald-800 dark:to-teal-800 text-black 
'>
            <div className='flex flex-col p-14'>
                <h1 className='text-4xl font-motserrat font-bold'>About Us</h1>
                <p className='text-xl italic pt-4'>Welcome to Blogify, your go-to platform for discovering, sharing, and engaging with insightful content across various domains. Whether you're a writer looking to express your thoughts, a reader seeking fresh perspectives, or someone who enjoys discussions, Blogify is the perfect place for you.</p>
            </div>
            <div className='flex flex-col p-14'>

            <h2 className='text-4xl font-motserrat font-bold'>Why Blogify?</h2>
            <ul className='text-xl italic pt-4'>
                <li className=''>
                    <span className='font-bold'> - Ease of Use:    
                        </span>
                    <p className='py-3'>
                    Blogify offers an intuitive, user-friendly interface that makes writing, reading, and interacting with content enjoyable and accessible to all. Whether you're new to blogging or an experienced content creator, you'll find our platform easy to navigate.
                    </p>
                    </li>
                <li className=''>
                    <span className='font-bold'> - Responsive Design:  
                        </span>
                    <p className='py-3'>
                    Our platform is fully responsive, ensuring a seamless experience on any device—be it desktop, tablet, or mobile. No matter where you are, you can always stay connected with your favorite content.
                    </p>
                    </li>
                <li className=''>
                    <span className='font-bold'> - Secure and Private:    
                        </span>
                    <p className='py-3'>
                    Your security and privacy are our top priorities. With robust authentication and encryption features, Blogify ensures that your data remains safe and secure.
                    </p>
                    </li>
            </ul>
            </div>









        </section>
    )
}

export default About
