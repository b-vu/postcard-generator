import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { fabric } from 'fabric'
import message from "../../assets/postcard-message.webp"

function NewPostcard({ user }) {
  const [selectedFile, setSelectedFile] = useState("");
  const [canvas, setCanvas] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [backgroundcolor, setBackgroundColor] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const navigate = useNavigate();

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
      height: 1600,
      width: 1200,
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
      fill: '#B2BEB5'
    });
    canvi.add(rect);
    canvi.renderAll();
  }

  const addCirc = canvi => {
    const circ = new fabric.Circle({
      radius: 50,
      fill: '#B2BEB5'
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

  function downloadPostcard(fileToDownload) {
    const link = document.createElement('a');
    link.download = "my-postcard.png";
    link.href = fileToDownload;
    link.click();
  }

  function createDummyCanvas(method) {
    let downloadFile;

    //creating a dummy canvas and copying the original canvas content onto it
    const sourceCanvas = document.querySelector("#canvas");
    const destinationCanvas = document.createElement("canvas");
    destinationCanvas.width = sourceCanvas.width;
    destinationCanvas.height = sourceCanvas.height;
    const destCtx = destinationCanvas.getContext('2d');

    //create a rectangle with the desired color
    destCtx.fillStyle = backgroundcolor;
    destCtx.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);

    //appending the postcard message to bottom of canvas
    const img = new Image();
    img.src = message

    //wait for img to load before drawing onto destination canvas
    img.onload = () => {
      destCtx.drawImage(img, 0, 0, img.width, img.height, 0, 800, 1200, 800);
      //draw the original canvas onto the destination canvas
      destCtx.drawImage(sourceCanvas, 0, 0);
      //converts the canvas to base-64 data that represents a file type(defaults to PNG)
      const postcardImg = destinationCanvas.toDataURL();

      if(method === "submit") {
        //send the file in our post request function
        sendPostRequest(postcardImg, "submit")
      }
      else{
        //download the postcard
        downloadFile = postcardImg;
        downloadPostcard(downloadFile);
      }
    }
  }

  //Setting a canvas background with an image uploaded by the user
  function createImageBackgoundCanvas(e) {
    e.preventDefault();

    renderImageOnCanvas();
  }

  function renderImageOnCanvas() {
    const file = selectedFile;
    const reader = new FileReader();
    reader.onload = function(f) {
      const data = f.target.result;
      fabric.Image.fromURL(data, function(img) {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height / 2
        });
      });
    };
    reader.readAsDataURL(file);
  }

  // POST request for uploaded images
  function sendPostRequest(data, method) {
    let formData = new FormData();
    formData.append("image", data);
    formData.append("method", method);
    formData.append("user_id", user.id);
    formData.append("recipient_id", selectedRecipient)

    fetch("/postcards", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => navigate("/"));
  }

  function handleDownloadClick(){
    createDummyCanvas("download");
  }

  function handleSelectedFileChange(e) {
    setSelectedFile(e.target.files[0])
  }

  function submitImage() {
    createDummyCanvas("submit");
  }

  function handleInstitutionChange(e) {
    setSelectedInstitution(e.target.value);
  }

  function handleRecipientChange(e) {
    setSelectedRecipient(e.target.value);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center">
      {/* <form onSubmit={createImageBackgoundCanvas}>
        <input type="file" onChange={handleSelectedFileChange}></input>
        <button>Upload</button>
      </form> */}

      {/* <select placeholder="Select an Institution" name="institutionId" value={selectedInstitution} onChange={handleInstitutionChange}>
        <option value="" disabled>Select an Institution</option>
        {
          institutions.map(institution => <option key={institution.id} value={institution.id}>{institution.name}</option>)
        }
      </select> */}

        {/* Conditional rendering of recipients based on selected instiution */}
        {/* {
          selectedInstitution !== "" ?
          <select placeholder="Select a Recipient" name="recipientId" value={selectedRecipient} onChange={handleRecipientChange}>
            <option value="" disabled>Select a Recipient</option>
            {
              institutions.filter(i => i.id === parseInt(selectedInstitution))[0].recipients.map(r => <option key={r.id} value={r.id}>{r.first_name} {r.last_name}</option>)
            }
          </select>
          : null
        } */}

      <div className="w-96 h-full shadow-md bg-white px-1" id="sidenavExample">
        <ul className="relative">
          {/* SHAPES */}
          <li className="relative" id="sidenavEx1">
            <span className="flex items-center bg-zinc-100 text-lg py-4 px-6 h-12 overflow-hidden text-black text-ellipsis whitespace-nowrap" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx1" aria-expanded="true" aria-controls="collapseSidenavEx1">
              <span className='px-3'>Shapes</span>
              <svg className="h-6 w-6 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="6" cy="6" r="2" />  <circle cx="18" cy="6" r="2" />  <circle cx="6" cy="18" r="2" />  <circle cx="18" cy="18" r="2" />  <line x1="6" y1="8" x2="6" y2="16" />  <line x1="8" y1="6" x2="16" y2="6" />  <line x1="8" y1="18" x2="16" y2="18" />  <line x1="18" y1="8" x2="18" y2="16" /></svg>
            </span>
            <ul className="relative accordion-collapse collapse" id="collapseSidenavEx1" aria-labelledby="sidenavEx1" data-bs-parent="#sidenavExample">
              <li className="relative">
                <button className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={() => addRect(canvas)}> Rectangle </button>
              </li>
              <li className="relative">
                <button className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={() => addCirc(canvas)}> Circle </button>
              </li>
              <li className="relative">
                <button className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={() => addLine(canvas)}> Line </button>
              </li>
            </ul>
          </li>
          {/* CANVAS BG COLOR */}
          <li className="relative" id="sidenavEx2">
            <span className="flex items-center bg-zinc-100 text-lg py-4 px-6 h-12 overflow-hidden text-black text-ellipsis whitespace-nowrap" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx2" aria-expanded="false" aria-controls="collapseSidenavEx2">
              <span className='px-3'>Background Color</span>
              <svg className="h-6 w-6 text-black"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
              </svg>
            </span>

            <ul className="relative accordion-collapse collapse" id="collapseSidenavEx2" aria-labelledby="sidenavEx2" data-bs-parent="#sidenavExample">
              <li className="relative">
                <input className='h-8 w-8 ml-12' type="color" value="#001A57" id="clr" onChange={pickColor}/>
              </li>
            </ul>
          </li>
          {/* TEXT */}
          <li className="relative" id="sidenavEx2">
            <span className="flex items-center bg-zinc-100 text-lg py-4 px-6 h-12 overflow-hidden text-black text-ellipsis whitespace-nowrap" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx2" aria-expanded="false" aria-controls="collapseSidenavEx2">
              <span className='px-3'>Add Text</span>
              <svg className="h-6 w-6 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="20" x2="7" y2="20" />  <line x1="14" y1="20" x2="21" y2="20" />  <line x1="6.9" y1="15" x2="13.8" y2="15" />  <line x1="10.2" y1="6.3" x2="16" y2="20" />  <polyline points="5 20 11 4 13 4 20 20" /></svg>
            </span>

            <ul className="relative accordion-collapse collapse" id="collapseSidenavEx2" aria-labelledby="sidenavEx2" data-bs-parent="#sidenavExample">
              <li className="relative">
                    <button className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={() => addText(canvas)}> Add Text </button>
              </li>
            </ul>
          </li>
          {/* DRAW */}
          <li className="relative" id="sidenavEx3">
            <span className="flex items-center bg-zinc-100 text-lg py-4 px-6 h-12 overflow-hidden text-black text-ellipsis whitespace-nowrap" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx3" aria-expanded="false" aria-controls="collapseSidenavEx3">
              <span className='px-3'>Draw</span>
              <svg className="h-6 w-6 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" /></svg>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"></svg>
            </span>
            <ul className="relative accordion-collapse collapse" id="collapseSidenavEx3" aria-labelledby="sidenavEx3" data-bs-parent="#sidenavExample">
              <li className="relative">
                    <button className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={() => addDrawing(canvas)}> Start Drawing Mode </button>
              </li>
              <li className="relative">
                    <button className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={() => cancelDrawing(canvas)}> Stop Drawing Mode </button>
              </li>
            </ul>
          </li>
          {/* IMAGES */}
          <li className="relative" id="sidenavEx2">
            <span className="flex items-center bg-zinc-100 text-lg py-4 px-6 h-12 overflow-hidden text-black text-ellipsis whitespace-nowrap" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx2" aria-expanded="false" aria-controls="collapseSidenavEx2">
              <span className='px-3'>Add Images</span>
              <svg className="h-6 w-6 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <circle cx="8.5" cy="8.5" r="1.5" />  <polyline points="21 15 16 10 5 21" /></svg>
            </span>

            <ul className="relative accordion-collapse collapse" id="collapseSidenavEx2" aria-labelledby="sidenavEx2" data-bs-parent="#sidenavExample">
              <form className= "flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" onSubmit={e => addImg(e, imgURL, canvas)}>
                <div>
                  <input 
                    type="text" 
                    value={imgURL}
                    placeholder="Image from URL" 
                    onChange={ e => setImgURL(e.target.value)} 
                  />
                  <button type="submit">Upload</button>
                </div>
              </form>
            </ul>

            <ul>
              <form className= "flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" onSubmit={createImageBackgoundCanvas}>
                <input type="file" onChange={handleSelectedFileChange}></input>
                <button>Upload</button>
              </form>
            </ul>
          </li>
          {/* DOWNLOAD */}
          <li className="relative" id="sidenavEx2">
            <span className="flex items-center bg-zinc-100 text-lg py-4 px-6 h-12 overflow-hidden text-black text-ellipsis whitespace-nowrap" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx2" aria-expanded="false" aria-controls="collapseSidenavEx2">
              <span className='px-3'>Download</span>
              <svg className="h-6 w-6 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />  <polyline points="7 11 12 16 17 11" />  <line x1="12" y1="4" x2="12" y2="16" /></svg>
            </span>

            <ul className="relative accordion-collapse collapse" id="collapseSidenavEx2" aria-labelledby="sidenavEx2" data-bs-parent="#sidenavExample">
            <li className="relative">
              <button className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={handleDownloadClick}> Save Postcard</button>
              </li>
            </ul>
          </li>
          {/* CLEAR CANVAS */}
          <li className="relative" id="sidenavEx2">
            <span className="flex items-center bg-zinc-100 text-lg py-4 px-6 h-12 overflow-hidden text-black text-ellipsis whitespace-nowrap" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx2" aria-expanded="false" aria-controls="collapseSidenavEx2">
              <span className='px-3'>Erase</span>
              <svg className="h-6 w-6 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9" />  <path d="M18 12.3l-6.3 -6.3" /></svg>
            </span>
            <ul className="relative accordion-collapse collapse" id="collapseSidenavEx2" aria-labelledby="sidenavEx2" data-bs-parent="#sidenavExample">
            <li className="relative">
              <button className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={() => clearCanvas(canvas)}> Clear Postcard</button>
              </li>
            </ul>
          </li>
          {/* SEND POSTCARD */}
          <li className="relative" id="sidenavEx2">
            <span className="flex items-center bg-zinc-100 text-lg py-4 px-6 h-12 overflow-hidden text-black text-ellipsis whitespace-nowrap" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx2" aria-expanded="false" aria-controls="collapseSidenavEx2">
              <span className='px-3'>Submit</span>
              <svg className="h-6 w-6 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="22" y1="2" x2="11" y2="13" />  <polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </span>

            <div>
              <select className="ml-11" placeholder="Select an Organization" name="institutionId" value={selectedInstitution} onChange={handleInstitutionChange}>
                <option value="" disabled>Select an Organization</option>
                {
                  institutions.map(institution => <option key={institution.id} value={institution.id}>{institution.name}</option>)
                }
              </select>
            </div>

            {/* Conditional rendering of recipients based on selected instiution */}
            <div>
              {
                selectedInstitution !== "" ?
                <select className="ml-11" placeholder="Select a Recipient" name="recipientId" value={selectedRecipient} onChange={handleRecipientChange}>
                  <option value="" disabled>Select a Recipient</option>
                  {
                    institutions.filter(i => i.id === parseInt(selectedInstitution))[0].recipients.map(r => <option key={r.id} value={r.id}>{r.first_name} {r.last_name}</option>)
                  }
                </select>
                : null
              }
            </div>

            <ul className="relative accordion-collapse collapse" id="collapseSidenavEx2" aria-labelledby="sidenavEx2" data-bs-parent="#sidenavExample">
            <li className="relative">
              <button className="flex items-center text-base py-4 pl-12 pr-6 h-6 overflow-hidden text-black text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-stone-200 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark" onClick={submitImage}> Send Postcard</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="place-items-center mt-20 mb-20">
          <h2 className='mb-8 text-4xl font-semibold tracking-wide'>DESIGN YOUR POSTCARD</h2>
          <canvas id="canvas" />
      </div>

    </div>
  )
}

export default NewPostcard
