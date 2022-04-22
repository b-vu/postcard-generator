import React from "react"
import { Link } from "react-router-dom"
import postcardBorder from "../../../assets/postcard-border.jpeg"

function PostcardCard({ postcards }) {
    return(
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center">
            {
                postcards.map(postcard => {
                    return <div key={postcard.id} className="rounded overflow-hidden shadow-md shadow-gray-600">
                        <Link to="/"><img className="w-full" src={postcard.image.url} alt="Postcard" /></Link>
                        <div className="relative">
                            <img src={postcardBorder} alt="Postcard" />
                            <p className="absolute top-5 left-6 font-serif text-xl md:text-2xl uppercase font-bold">From: {postcard.user_fullname}</p>
                            <p className="absolute top-12 left-6 font-serif text-md pr-6">{postcard.message}</p>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default PostcardCard