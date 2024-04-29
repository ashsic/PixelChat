export default function ExitModalButton({ setImgSrc }) {
  
  const closeModal = () => {
    const modal = document.querySelector("#postModal");
    modal.style.display = "none";

    setImgSrc("");
  };

  return (
    <button id="closeModalButton" className="size-8" onClick={closeModal}>
      <i className="material-icons text-3xl">close</i>
    </button>
  );
}
