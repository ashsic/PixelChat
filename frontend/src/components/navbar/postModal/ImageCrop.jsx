import ReactCrop, { convertToPixelCrop } from "react-image-crop";
import { useState, useRef } from "react";
import 'react-image-crop/dist/ReactCrop.css';
import setCroppedImg from "./helpers/setCroppedImg";
import { useAsyncError } from "react-router-dom";

export default function ImageCrop({ setCrop, imgSrc, onImgLoad, crop }) {
  const croppedUrlRef = useRef("");
  const imgRef = useRef("");

  const [isCaptionOpen, setIsCaptionOpen] = useState(false);
  const [isCropped, setIsCropped] = useState(false);

  const updateCropped = (url) => {
    croppedUrlRef.current = url;
    console.log(croppedUrlRef.current)
  };

  const onCropButtonClick = () => {
    setCroppedImg(
      imgRef.current, // HTMLImageElement
      croppedUrlRef.current, // HTMLCanvasElement
      convertToPixelCrop(
        crop,
        imgRef.current.width,
        imgRef.current.height
      )
    );
    const dataUrl = croppedUrlRef.current.toDataURL();
    updateCropped(dataUrl);
    setIsCropped(true);
    document.querySelector("#croppedCanvas").classList = "h-full object-contain w-full ";
  }

  const onBackButtonClick = () => {
    const canv = document.querySelector("#croppedCanvas");
    updateCropped(canv);
    setIsCropped(false);
    canv.classList += "hidden";
  }

  const onConfirmPostClick = () => {
    setIsCaptionOpen(true);
  }

  const submitPost = () => {

  }

  return (
    <div id="imageContainer" className="relative flex flex-col h-full w-full overflow-hidden items-center justify-center">

      {
        crop && 
        <>
          {
            isCropped &&
            <div className="w-full h-full my-auto flex-grow"></div>
          }

          <div className="flex h-full overflow-visible items-center justify-center my-auto">
            <div className="flex h-full w-full items-center justify-center">
              <canvas
                id="croppedCanvas"
                ref={croppedUrlRef}
                className="hidden h-full object-contain w-full"
              />
            </div>
          </div>

          {
            isCropped &&
            <form 
              className="w-full h-full my-auto flex-grow flex justify-center items-center relative"
              onSubmit={submitPost}
            >

              {
                isCaptionOpen &&
                <div className="w-full flex justify-center z-20 absolute bottom-2 mx-auto">
                  <div className="my-auto w-1/2 relative">
                    <input
                    className="text-sm p-2 w-full rounded-lg border border-slate-900"
                      type="text"
                      placeholder="Enter a caption..."
                    />
                    <button
                      className="absolute right-0.5 top-0.5 bg-cyan-300 
                      px-3 py-1.5 border border-slate-500 rounded-lg 
                      text-sm hover:animate-pulse active:bg-cyan-500"
                      type="submit"
                    >
                      Post
                    </button>
                  </div>
                </div>
              }

              <div className="opacity-25 hover:opacity-70 transition-all duration-300 flex absolute bottom-0 w-full bg-slate-300 justify-between">
                <button 
                  className="mx-6 mb-2 mt-3 hover:cursor-pointer"
                  onClick={onBackButtonClick}
                >
                  <i className="material-icons text-3xl hover:animate-pulse hover:cursor-pointer">
                    arrow_back_ios
                  </i>
                </button>
                <button 
                  id="createPost"
                  className="mx-6 mb-2 mt-3 hover:cursor-pointer"
                  onClick={onConfirmPostClick}
                >
                  <i className="material-icons text-3xl hover:animate-pulse">
                    check_circle_outline
                  </i>
                </button>
              </div>
            </form>
          }
        </>
      }

      {
        !isCropped && (
          <>
            <div className="w-full h-full my-auto flex-grow"></div>

            <ReactCrop 
              className="flex h-full overflow-visible items-center justify-center my-auto"
              crop={crop}
              keepSelection
              minWidth={100}
              ruleOfThirds
              onChange={(pixelCrop, percentCrop) => setCrop(pixelCrop)}
            >
              <img 
                id="userImage" 
                ref={imgRef}
                className="hidden h-full object-contain" 
                alt="User-uploaded image." 
                src={imgSrc}
                onLoad={onImgLoad} 
              />
            </ReactCrop>

            <div className="relative w-full h-full my-auto flex-grow">
              <div className="opacity-25 hover:opacity-60 transition-all duration-300 flex absolute bottom-0 w-full bg-slate-300 justify-between">
                <div className="mx-6 mb-2 mt-3">
                  <i className="material-icons text-3xl hover:animate-pulse hover:cursor-pointer">
                    aspect_ratio
                  </i>
                </div>
                <button 
                  id="cropButton"
                  className="mx-6 mb-2 mt-3 hover:cursor-pointer"
                  onClick={onCropButtonClick}
                >
                  <i className="material-icons text-3xl hover:animate-pulse">
                    arrow_forward_ios
                  </i>
                </button>
              </div>
            </div>
          </>
        )
      }

    </div>
  );
}
