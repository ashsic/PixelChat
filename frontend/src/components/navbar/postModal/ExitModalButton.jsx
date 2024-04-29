export default function ExitModalButton() {
  
  const closeModal = (event) => {
    const modal = document.querySelector("#postModal");
    modal.style.display = "none";

    const fileUploadForm = document.querySelector("#uploadForm");
    fileUploadForm.style.display = "flex";

    const fileInput = document.querySelector("#file");
    fileInput.value = '';

    const imageContainer = document.querySelector("#imageContainer");
    imageContainer.style.display = "none";

    const userImage = document.querySelector("#userImage");
    userImage.style.display = "none";
    userImage.src = "";
  };

  return (
    <button id="closeModalButton" className="size-8" onClick={closeModal}>
      <i className="material-icons text-3xl">close</i>
    </button>
  );
}
