import { useState } from "react";
import ExitModalButton from "./ExitModalButton";
import ImageCrop from "./ImageCrop";
import ReactCrop, { makeAspectCrop } from "react-image-crop";

export default function PostModal() {
  const [crop, setCrop] = useState();
  // const [imgSrc, setImgSrc] = useState('');

  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgUrl = reader.result?.toString() || "";

      document.querySelector("#uploadForm").style.display = "none";
      document.querySelector("#imageContainer").style.display = "flex"

      const userImg = document.querySelector("#userImage");
      userImg.style.display = "flex";
      userImg.src = imgUrl;

    }
    reader.readAsDataURL(file);
    
  }

  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 150;

  const onImgLoad = (e) => {
    console.log(e.target.parentElement.classList)
    e.target.parentElement.classList = "ReactCrop__child-wrapper flex h-full w-full items-center justify-start";
    const { width, height } = e.currentTarget;
    const currCrop = makeAspectCrop(
      {
        unit: "px",
        width: MIN_DIMENSION,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    setCrop(currCrop);
  }

  return (
    <dialog id="postModal" 
    className="hidden fixed top-0 left-0 w-full h-full bg-black/30 border z-10 justify-center flex-col">
      <div className="mx-auto bg-slate-100 h-3/4 max-h rounded-lg max-w-4xl flex flex-col">

        <div className="flex rounded-lg">
          <div className="w-14 h-10"></div>
          <div className="flex-grow flex flex-col justify-end w-96 mx-48">
            <p className="font-bold text-lg text-center pb-1">
              Create new post
            </p>
          </div>
          <div className="w-14 h-10 flex items-center justify-center">
            <ExitModalButton />
          </div>
        </div>

        <div className="flex-grow flex align-middle justify-center h-full pb-10 w-full border-t border-slate-300">

          <form
          id="uploadForm"
          action="/upload"
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col items-center justify-center">
            <i className="material-icons text-9xl">image</i>
            <span className="font-medium text-lg mb-2">Drag photos here from your desktop</span>
            <span>- or -</span>
            <label htmlFor="file"
            className="hover:bg-cyan-400 cursor-pointer m-4 border
            h-10 rounded-lg py-2 px-4 font-medium bg-cyan-300">
              Select from computer
            </label>
            <input type="file" id="file" name="file" className="hidden" onChange={handleFileUpload} />
          </form>

          

          <div id="imageContainer" className="flex flex-col h-full overflow-auto items-start justify-start">

            <ReactCrop 
              className="flex h-full overflow-visible items-start justify-start my-auto"
              crop={crop}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
              onChange={
                (pixelCrop) => setCrop(pixelCrop)
              }
            >
              <img id="userImage" className="hidden h-full object-contain" alt="User-uploaded image." onLoad={onImgLoad} />
              
            </ReactCrop>

            <div className="w-full h-full my-auto flex-grow"></div>

          </div>



        </div>



      </div>
    </dialog>
  );
};
