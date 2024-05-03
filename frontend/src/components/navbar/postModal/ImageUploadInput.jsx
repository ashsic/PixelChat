export default function ImageUploadForm({ handleFileUpload }) {

  return (
    <div
      id="uploadForm"
      className="flex flex-col items-center justify-center"
    >
      <i className="material-icons text-9xl">image</i>
      {/* <span className="font-medium text-lg mb-2">Drag photos here from your desktop</span>
      <span>- or -</span> */}
      <label htmlFor="file"
      className="hover:bg-cyan-400 cursor-pointer m-4 border
      h-10 rounded-lg py-2 px-4 font-medium bg-cyan-300">
        Select from computer
      </label>
      <input 
        type="file" 
        accept="image/*"
        id="file" 
        name="file" 
        className="hidden" 
        onChange={handleFileUpload}
      />
    </div>
  );
}
