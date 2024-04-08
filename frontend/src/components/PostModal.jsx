

export default function PostModal() {

  // Close the modal on clicking X
  const closeModal = () => {
    const modal = document.querySelector("#postModal");
    modal.style.display = "none";
  }

  const fileLoader = document.querySelector("#file");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {

    }
  }

  fileLoader.addEventListener("change", handleFileUpload);

  return (
    <dialog id="postModal" 
    className="hidden fixed top-0 left-0 w-full h-full bg-black/30 border z-10 justify-center flex-col">
      <div className="mx-auto bg-slate-100 h-2/3 max-h rounded-lg max-w-4xl flex flex-col">

        <div className="flex rounded-lg">
          <div className="w-14 h-10"></div>
          <div className="flex-grow flex flex-col justify-end w-96 mx-40">
            <p className="font-bold text-lg text-center pb-1">
              Create new post
            </p>
          </div>
          <div className="w-14 h-10 flex items-center justify-center">
            <button onClick={closeModal} className="size-8">
              <i className="material-icons text-3xl">close</i>
            </button>
          </div>
        </div>

        <div className="flex-grow flex align-middle justify-center w-full border-t-2">

          <form action="/upload" method="POST" encType="multipart/form-data"
          className="flex flex-col items-center justify-center pl-4 pr-6">
            <i className="material-icons text-9xl">image</i>
            <span className="font-medium text-lg mb-2">Drag photos here from your desktop</span>
            <span>- or -</span>
            <label htmlFor="file"
            className="hover:bg-cyan-400 cursor-pointer m-4 border
            h-10 rounded-lg py-2 px-4 font-medium bg-cyan-300">
              Select from computer
            </label>
            <input type="file" id="file" name="file" className="hidden" />



            {/* <form action="/upload" method="post" enctype="multipart/form-data">
    <label for="file">Select file:</label>
    <input type="file" id="file" name="file">
    <button type="submit">Upload</button>
  </form> */}

          </form>

        </div>

        {/* <div className="flex justify-center">
          <button
          className="m-4 border  rounded-lg py-3 font-medium bg-cyan-300">
            Chat
          </button>
        </div> */}

      </div>
    </dialog>
  );
};
