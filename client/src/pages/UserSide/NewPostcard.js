import React, { useState, useEffect } from 'react'
import { fabric } from 'fabric'

function NewPostcard() {
  const [selectedFile, setSelectedFile] = useState("");
  const [canvas, setCanvas] = useState("");
  const [imgURL, setImgURL] = useState("");
  

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      // backgroundColor: 'pink'
    })
  )

  function pickColor() {
    const myCanvas = document.querySelector("#canvas");
    const colorInput = document.querySelector("#clr");
    const color = colorInput.value;
    myCanvas.style.backgroundColor = color;
  }

  const addRect = canvi => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: '#FF6699'
    });
    canvi.add(rect);
    canvi.renderAll();
  }

  const addCirc = canvi => {
    const circ = new fabric.Circle({
      radius: 50,
      fill: '#FF6699'
    });
    canvi.add(circ);
    canvi.renderAll();
  }

  const addImg = (e, url, canvi) => {
    e.preventDefault();
    new fabric.Image.fromURL(url, img => {
      img.scale(0.75);
      canvi.add(img);
      canvi.renderAll();
      setImgURL('');
    }, { crossOrigin: 'anonymous' });
  }

  const addText = canvi => {
    const text = new fabric.Textbox('Type Here', {
      width:250,
      cursorColor :"blue",
      top:10,
      left:10
    })
    canvi.add(text);
    canvi.renderAll();
  }

  function handleDownloadClick(){
    const postcardImg = canvas.toDataURL({
      format: 'png'
    })
    const link = document.createElement('a');
    link.download = "my-postcard.png";
    link.href = postcardImg;
    link.click();
    console.log('Download button clicked')
  }


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

      {/* <img src='/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--067ea5ad84b1c04d315a5a444e92863574e47c83/pexels-helena-lopes-2253275.jpg' alt="Dog"></img> */}

      <div className='canvas-box'>
        <button onClick={() => addRect(canvas)}>Rectangle</button>
        <button onClick={() => addCirc(canvas)}>Circle</button>
        <button onClick={() => addText(canvas)}>Add Text</button>
        <button onClick={submitImage}>Submit</button>
        <form onSubmit={e => addImg(e, imgURL, canvas)}>
          <div>
            <input 
              type="text" 
              value={imgURL} 
              onChange={ e => setImgURL(e.target.value)} 
            />
            <button type="submit">Add Image from URL</button>
          </div>
        </form>
        <button onClick={handleDownloadClick}>Download Postcard</button>
        <canvas id="canvas" />
        <input type="color" value="#001A57" id="clr" onChange={pickColor}/>
      </div>


    </div>
  )
}

export default NewPostcard