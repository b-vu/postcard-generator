import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Postcard() {
    const { id } = useParams();
    const [postcard, setPostcard] = useState(null)

    useEffect(() => {
        fetch(`/postcards/${id}`)
        .then(res => res.json())
        .then(data => setPostcard(data));
    }, [id]);

    return(
        <div className="p-10 grid justify-center h-min-screen">
            <h1 className="font-serif mb-6 text-xl md:text-4xl uppercase font-bold flex justify-center">Wishing you were here</h1>
            {
                postcard ?
                <div className="overflow-hidden">
                    <img className="mb-10" src={postcard.image.url} alt="Postcard" />
                </div>
                :
                null
            }
            <a href="https://www.freepik.com/vectors/postcard">Postcard vector created by rawpixel.com - www.freepik.com</a>
        </div>
    )
}

export default Postcard;