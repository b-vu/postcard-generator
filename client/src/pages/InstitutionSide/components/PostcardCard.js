import React from "react"
import { Link } from "react-router-dom"

function PostcardCard({ postcards }) {
    return(
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center">
            {
                postcards.map(postcard => {
                    return <div key={postcard.id} className="rounded overflow-hidden shadow-md shadow-gray-600">
                        <Link to={`/org/postcards/${postcard.id}`}><img className="w-full" src={postcard.image.url} alt="Postcard" /></Link>
                    </div>
                })
            }
        </div>
    )
}

export default PostcardCard