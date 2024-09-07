import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const SharedLayout = () => {
    return (
        <>
            <Navbar />
            <p className='mt-10  text-center text-2xl font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ipsam corrupti saepe, explicabo minus, corporis labore unde sapiente assumenda iure soluta ex consequuntur ab fuga. Laudantium esse recusandae quia quos sequi obcaecati blanditiis, natus quae autem dolore ducimus sunt nesciunt vel impedit? Deleniti numquam in esse commodi possimus accusamus corrupti qui quas soluta tempore laborum perspiciatis reiciendis vero impedit, labore dignissimos provident nobis dolor! Natus laborum reprehenderit ratione, ut dignissimos facere tempore, alias repellat, totam neque laudantium necessitatibus! Ipsum, blanditiis voluptas vero culpa dicta, facilis suscipit iusto, fuga perferendis rerum dolores. Optio libero vero dolorem quam blanditiis dignissimos doloremque facilis!</p>
            <Outlet />
        </>
    )
}

export default SharedLayout
