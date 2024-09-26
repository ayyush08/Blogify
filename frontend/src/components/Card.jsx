import React from 'react'
import CardLoader from './ui/CardLoader'
const Card = ({ _id, title, description,  ownerDetails,onClick,isFetching,isLoading }) => {
    if(isLoading || isFetching){
        return <CardLoader/>
    }
    return (
        <div onClick={onClick} className="cursor-pointer 
                w-[80%] md:w-[45%] lg:w-[30%] 
                min-h-[200px] max-h-[300px]
                rounded-lg 
                overflow-hidden 
                shadow-lg shadow-teal-300 
                dark:shadow-gray-300 dark:border-green-800  
                border-green-300 border-4 
                p-4 bg-slate-300 
                dark:bg-[#31d0d0] 
                    duration-500 ease-in-out 
                hover:scale-[1.05] 
                dark:text-black transition-all">
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
                <p className="text-gray-700 font-motserrat font-semibold">{description.trim().length > 100 ? `${description.trim().substring(0, 100)}...` : description.trim()}</p>
            </div>
        </div>
    )
}

export default Card
