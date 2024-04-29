import { NavLink } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import PostModal from "./postModal/PostModal";
import NavBarItem from "./NavBarItem";

export default function NavBar() {

  const openPostModal = () => {
    const modal = document.querySelector("#postModal");
    modal.style.display = "flex";
    console.log('in createpost')
    const fileLoader = document.querySelector("#file");
  }

  const navItems = [
    {
      name: "Home",
      route: "/",
      icon: "home"
    },
    {
      name: "Search",
      //route: "/search",
      icon: "search",
      fn: openPostModal
    },
    {
      name: "Messages",
      route: "/messages",
      icon: "message"
    },
    {
      name: "Create",
      // route: "/create",
      icon: "add_box",
      fn: openPostModal
    },
    {
      name: "Notifications",
      //route: "/notifications",
      icon: "notifications",
      fn: openPostModal
    },
    {
      name: "Profile",
      route: "/profile",
      icon: "person"
    }
  ];

  return (
    <div className="flex">
      <div
      className="w-20 lg:w-56 2xl:w-80 max-h-full min-h-screen">
        <nav className="fixed flex flex-col h-screen p-3 w-20 lg:w-56 2xl:w-80
        border-r border-slate-400">

          <h1 className="text-2xl p-3 mb-2 w-64">Website Name</h1>

          <ul className="flex flex-1 flex-col">
            {navItems.map((item) => {
              return (
                <NavBarItem key={item.name} item={item} />
              );
            })}
          </ul>

          <div>
            <div className="h-12 text-lg flex items-center m-1 hover:bg-slate-200 active:bg-slate-300  rounded-md w-12 lg:w-full">
              <NavLink to="/settings" className="w-12 lg:w-full h-full p-3">
                <div className="flex w-fit">
                  <i className="material-icons h-6">settings</i>
                  <p className="hidden h-6 ml-5 items-center lg:flex">
                    Settings
                  </p>
                </div>
              </NavLink>
            </div>
            <div className="h-12 text-lg flex items-center m-1 hover:bg-slate-200 active:bg-slate-300 rounded-md w-12 lg:w-full">
              <LogOutButton />
            </div>
          </div>

        </nav>

        <PostModal />
      </div>


    </div>
  );
};
