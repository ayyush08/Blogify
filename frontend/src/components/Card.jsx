import React from 'react'

const Card = ({ _id, title, content, description, avatar, ownerDetails,onClick }) => {
    return (
        <div onClick={onClick} className="max-w-sm  cursor-pointer w-[80%] md:w-[35%] rounded-lg overflow-hidden shadow-lg shadow-teal-300 dark:shadow-gray-300 dark:border-green-800  border-green-300 border-4 p-4 bg-slate-300 dark:bg-[#31d0d0] transition duration-500 ease-in-out hover:scale-[1.05] dark:text-black ">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                    <img className="w-full h-full object-cover" src={ownerDetails.avatar} alt={ownerDetails.username} />
                </div>
                <div className="text-sm">
                    <p className="text-gray-900 font-bold font-mono leading-none">{ownerDetails.username}</p>
                </div>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 font-motserrat ">{title}</h2>
                <p className="text-gray-700 font-motserrat font-semibold">{description}</p>
            </div>
            {/* <div className="text-gray-700 dark:text-gray-300">
                {content}
            </div> */}
        </div>
    )
}

export default Card
