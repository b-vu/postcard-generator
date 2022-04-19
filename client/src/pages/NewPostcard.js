import React, { useState } from 'react'

function NewPostcard() {
  const [selectedFile, setSelectedFile] = useState("");

  function handleSelectedFileChange(e) {
    setSelectedFile(e.target.files[0])
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    let formData = new FormData();

    formData.append("image", selectedFile);

    // POST request for uploaded images
    fetch("/postcards", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => console.log(data));

    // Testing POST request for image URL's
    // fetch("/postcards", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     image_url: imageUrl
    //   })
    // })
    // .then(res => res.json())
    // .then(data => console.log(data));
  }

  return (
    <div>
      NewPostcard
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleSelectedFileChange}></input>
        <button>Submit</button>
      </form>
      {/* <img src='/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--067ea5ad84b1c04d315a5a444e92863574e47c83/pexels-helena-lopes-2253275.jpg' alt="Dog"></img> */}
    </div>
  )
}

export default NewPostcard