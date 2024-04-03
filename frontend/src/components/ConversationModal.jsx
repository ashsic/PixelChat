

export default function ConversationModal() {
  const closeModal = () => {
    const modal = document.querySelector("#conversationModal");
    modal.style.display = "none";
  }

  return (
    <dialog id="conversationModal" 
    className="hidden fixed top-0 left-0 w-full h-full bg-black/30 border z-10 justify-center flex-col">
      <div className="mx-auto bg-slate-100 h-2/3 max-h rounded-lg max-w-xl flex flex-col">

        <div className="flex rounded-lg">
          <div className="size-14"></div>
          <div className="flex-grow flex flex-col justify-end w-96 mx-16">
            <p className="font-bold text-lg text-center pb-2">
              New Message
            </p>
          </div>
          <div className="size-14 flex items-center justify-center">
            <button onClick={closeModal}>
              <i className="material-icons text-3xl">close</i>
            </button>
          </div>
        </div>

        <div className="flex-grow flex flex-col">

          <div className="h-10 border flex align-center pl-4 pr-6">
            <label className="mt-1.5 pr-4" htmlFor="searchUser">
              To:
            </label>
            <input className="bg-slate-100 my-2 pl-2 flex-grow outline-none text-sm" type="text" placeholder="Search..." />
          </div>

          <div>
            <p>search results go here</p>
          </div>

        </div>

        <div className="flex justify-center">
          <button
          className="m-4 border w-full rounded-lg py-3 font-medium text-lg bg-cyan-300">
            Chat
          </button>
        </div>

      </div>
    </dialog>
  );
};
