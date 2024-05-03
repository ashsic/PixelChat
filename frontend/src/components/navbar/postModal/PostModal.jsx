import { useState } from "react";
import ExitModalButton from "./ExitModalButton";
import ImageCrop from "./ImageCrop";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import ImageUploadInput from "./ImageUploadInput";

export default function PostModal() {
  const [crop, setCrop] = useState();
  const [error, setError] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  const ASPECT_RATIO = 16 / 9;
  const MIN_WIDTH = 320;
  const MIN_HEIGHT = 320;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imgUrl = reader.result?.toString() || "";

      document.querySelector("#uploadForm").style.display = "none";
      // document.querySelector("#imageContainer").style.display = "flex"

      // const userImg = document.querySelector("#userImage");
      // userImg.style.display = "flex";
      // userImg.src = imgUrl;
      setImgSrc(imgUrl);

      // userImg.addEventListener("load", (e) => {
      //   const { naturalWidth, naturalHeight } = e.currentTarget;
      //   if (naturalWidth < MIN_WIDTH || naturalHeight < MIN_HEIGHT) {
      //     setError("Image must be at least 320 x 320 pixels.");
      //     userImg.src = "";
      //   }
      // })

    })
    reader.readAsDataURL(file);
    
  }

  const onImgLoad = (e) => {
    e.target.parentElement.classList = "ReactCrop__child-wrapper flex h-full w-full items-center justify-center";
    const { width, height } = e.currentTarget;
    const currCrop = makeAspectCrop(
      {
        unit: "px",
        width: MIN_WIDTH,
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
            <ExitModalButton setImgSrc={setImgSrc} />
          </div>
        </div>

        <div className="flex-grow flex align-middle justify-center h-full pb-10 w-full border-t border-slate-300">

          {/* {error && <p classname="text-red-500">{error}</p>} */}

          {
            (
              imgSrc
            ) ? (
              <ImageCrop 
                imgSrc={imgSrc} 
                setCrop={setCrop} 
                crop={crop} 
                onImgLoad={onImgLoad} 
              />
            ) : (
              <ImageUploadInput handleFileUpload={handleFileUpload} />
            )
          }

        </div>

      </div>
    </dialog>
  );
};
