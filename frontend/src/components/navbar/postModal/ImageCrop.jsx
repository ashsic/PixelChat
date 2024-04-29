import ReactCrop from "react-image-crop";
import { useState } from "react";
import 'react-image-crop/dist/ReactCrop.css';

export default function ImageCrop({ src }) {
  const [crop, setCrop] = useState();

  return (
    <ReactCrop crop={crop} onchange={c => setCrop(c)}>
      <img src={src} id="userImage" className="hidden h-full object-cover" alt="User-uploaded image." ></img>
    </ReactCrop>
  );
}
