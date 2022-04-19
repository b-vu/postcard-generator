import React, { useState } from 'react'

function NewPostcard() {
  const [selectedFile, setSelectedFile] = useState("");

  function handleSelectedFileChange(e) {
    setSelectedFile(e.target.files[0])
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    //creating the FormData object to be easily sent in an HTTP request
    let formData = new FormData();

    //appending the image key with the uploaded image in the FormData object
    formData.append("image", selectedFile);

    // POST request for uploaded images
    fetch("/postcards", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  function submitImage(e) {
    //converts the canvas to base-64 data that represents a file type(defaults to PNG)
    const data = e.target.parentNode.children[0].toDataURL()

    //creating the FormData object to be easily sent in an HTTP request
    let formData = new FormData();

    //appending the image key with the file data in the FormData object
    formData.append("image", data)

    fetch("/postcards", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  //function for adding text to the canvas
  function addText(e) {
    const canvas = e.target.parentNode.children[0];
    const canvasContext = canvas.getContext("2d");
    canvasContext.font = "30px Arial";
    canvasContext.fillText("Hello World",10,50);
  }

  return (
    <div>
      NewPostcard
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleSelectedFileChange}></input>
        <button>Submit</button>
      </form>

      <div>
      <canvas width="300" height="300" style={{ border: "1px solid #d3d3d3" }}></canvas>
        <button onClick={submitImage}>Submit</button>
        <button onClick={addText}>Add Text</button>
      </div>

      {/* <img src='' alt="Test"></img> */}
    </div>
  )
}

export default NewPostcard