import React from 'react'

const Contact = () => {
  return (
    <section >
      <div className='flex  flex-col justify-start items-center w-1/3 rounded-xl bg-gray-600/10 mt-20 h-[60vh] mx-auto'>
        <div className='mt-5'>
          <h1 className='text-center text-5xl font-motserrat font-semibold dark:text-teal-300 text-teal-800'>Contact Us</h1>
          <p className='text-2xl p-4 font-semibold text-cyan-900 dark:text-cyan-300 text-center font-motserrat'>For any queries or suggestions, feel free to contact us.</p>
          <div className='text-center font-mono font-semibold p-10'>

          <h2>Visit us at - 123, XYZ Street, ABC City</h2>
          <h2>Email us at - xyz@gmail.com</h2>
          <h2>Call us at - 1234567890</h2>
          </div>

        </div>

      </div>

    </section>
  )
}

export default Contact
