import React, { useState, useEffect } from 'react'
import { fabric } from 'fabric'

function NewPostcard() {
  const [selectedFile, setSelectedFile] = useState("");
  const [canvas, setCanvas] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [backgroundcolor, setBackgroundColor] = useState(null);

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

    //setting background color to state so we can access it in the download function
    setBackgroundColor(color)
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

  function createDummyCanvas() {
    // creating a dummy canvas and copying the original canvas content onto it
    const sourceCanvas = document.querySelector("#canvas");

    const destinationCanvas = document.createElement("canvas");
    destinationCanvas.width = sourceCanvas.width;
    destinationCanvas.height = sourceCanvas.height;
    const destCtx = destinationCanvas.getContext('2d');

    //create a rectangle with the desired color
    destCtx.fillStyle = backgroundcolor;
    destCtx.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);

    //draw the original canvas onto the destination canvas
    destCtx.drawImage(sourceCanvas, 0, 0);

    //converts the canvas to base-64 data that represents a file type(defaults to PNG)
    const postcardImg = destinationCanvas.toDataURL();

    return postcardImg;
  }

  function handleDownloadClick(){
    const postcardImg = createDummyCanvas();

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

  function submitImage() {
    const data = createDummyCanvas();

    //creating the FormData object to be easily sent in an HTTP request
    let formData = new FormData();

    //appending the image key with the file data in the FormData object
    formData.append("image", data);

    fetch("/postcards", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  return (
    <div>
      NewPostcard
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleSelectedFileChange}></input>
        <button>Submit</button>
      </form>

      {/* <img src="" alt="Postcard"></img> */}

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