import React, { useState, useEffect } from 'react'
import { fabric } from 'fabric'
// import FontFaceObserver from "fontfaceobserver";

function NewPostcard({ user }) {
  const [selectedFile, setSelectedFile] = useState("");
  const [canvas, setCanvas] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [backgroundcolor, setBackgroundColor] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    fetch("/institutions")
    .then(res => res.json())
    .then(data => setInstitutions(data));
  }, []);

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
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

  const addLine = canvi => {
    const line = new fabric.Line([10, 100, 200, 200], {
      left: 170,
      top: 150,
      stroke: 'black'
    });
    canvi.add(line);
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

  // var fonts = ["Poppins", "Cormorant Garamond", "Patrick Hand", "Special Elite"];

  const addText = canvi => {
    const text = new fabric.Textbox('Type Here', {
      width:250,
      cursorColor :"blue",
      top:10,
      left:10
    })
    canvi.add(text);
    canvi.setActiveObject(text);
    canvi.renderAll();
  }

  function changeTextClr() {
    // const textColor = document.querySelector('#text-color')
    // canvas.getActiveObject().setColor(textColor)
    // canvas.renderAll();
    console.log("text color is changing")
  }

  function changeFont() {
  // document.getElementById('font-family')
  //   canvas.getActiveObject().setFontFamily(this.value);
  //   canvas.renderAll();
    console.log("font is changing")
  }

  function addDrawing() {
    canvas.isDrawingMode= true;
    canvas.freeDrawingBrush.color = "black";
    canvas.freeDrawingBrush.width = 10;
    canvas.renderAll();
  };

  function cancelDrawing() {
    canvas.isDrawingMode= false;
  }

  function clearCanvas() {
    canvas.clear()
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

  // POST request for uploaded images
  function sendPostRequest(data, method) {
    let formData = new FormData();
    formData.append("image", data);
    formData.append("method", method);
    formData.append("user_id", user.id);
    
    fetch("/postcards", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => console.log(data));
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

  function handleFormUpload(e) {
    e.preventDefault();
    sendPostRequest(selectedFile, "upload");
  }

  function submitImage() {
    const data = createDummyCanvas();
    sendPostRequest(data, "submit");
  }

  function handleInstitutionChange(e) {
    setSelectedInstitution(e.target.value);
  }

  return (
    <>

      <h3>Create your Postcard</h3>

      <form onSubmit={handleFormUpload}>
        <input type="file" onChange={handleSelectedFileChange}></input>
        <button>Upload</button>
      </form>

      {/* <img src="" alt="Postcard"></img> */}

      <div className='canvas-tool-box'>
        <button onClick={() => addRect(canvas)}>Rectangle</button>
        <button onClick={() => addCirc(canvas)}>Circle</button>
        <button onClick={() => addLine(canvas)}>Line</button>
        <button onClick={() => addText(canvas)}>Add Text</button>
        <button onClick={() => addDrawing(canvas)}>Enter Drawing Mode</button>
        <button onClick={() => cancelDrawing(canvas)}>Exit Drawing Mode</button>
        <button onClick={() => clearCanvas(canvas)}>Clear Canvas</button>
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

        <select placeholder="Select an Institution" name="institutionId" value={selectedInstitution} onChange={handleInstitutionChange}>
          <option value="" disabled>Select an Institution</option>
          {
            institutions.map(institution => <option key={institution.id} value={institution.id}>{institution.name}</option>)
          }
        </select>

        {/* Conditional rendering of recipients based on selected instiution */}
        {
          selectedInstitution !== "" ?
          institutions.filter(i => i.id === parseInt(selectedInstitution))[0].recipients.map(r => <p key={r.id}>{r.first_name} {r.last_name}</p>)
          : null
        }

        <div id="text-controls">
        <input type="color" value="" id="text-color" size="10" onChange={changeTextClr} />
        <label for="font-family">Font family:</label>
          <select id="font-family" onChange={changeFont}>
            <option value="poppins">Poppins</option>
            <option value="cormorant garamond" selected>Cormorant Garamond</option>
            <option value="patrick hand">Patrick Hand</option>
            <option value="special elite">Special Elite</option>
          </select>
        </div>

        <canvas id="canvas" />
        <input type="color" value="#001A57" id="clr" onChange={pickColor}/>
      </div>


    </>
  )
}

export default NewPostcard