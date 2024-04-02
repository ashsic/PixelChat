import { Link } from "react-router-dom";


export default function NavBar() {
  const navItems = [
    {
      name: "Home",
      route: "/",
      icon: "home"
    },
    {
      name: "Search",
      route: "/search",
      icon: "search"
    },
    {
      name: "Messages",
      route: "/messages",
      icon: "message"
    },
    {
      name: "Create",
      route: "/create",
      icon: "add_box"
    },
    {
      name: "Notifications",
      route: "/notifications",
      icon: "notifications"
    },
    {
      name: "Profile",
      route: "/profile",
      icon: "person"
    }
  ];


  return (
    <div 
    className="w-20 lg:w-56 2xl:w-80 max-h-full min-h-screen">
      <nav className="fixed flex flex-col h-screen p-3 w-20 lg:w-56 2xl:w-80
      border-r border-gray-500">
        <h1 className="text-2xl p-3 hidden lg:block mb-2">Website Name</h1>
        <ul className="flex flex-1 flex-col">
          {navItems.map((item) => {
            return (
              <li
              className="h-12 text-lg flex items-center mt-1 mb-1
              hover:bg-slate-200 active:bg-slate-300 rounded-md w-12 lg:w-full"
              key={item.name}>
                <Link to={item.route} className="w-12 lg:w-full h-full p-3" >
                  <div className="flex w-32">
                    <i className="material-icons h-6">{item.icon}</i>
                    <p className="hidden h-6 ml-3 items-center lg:flex">
                      {item.name}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="h-14 p-3 text-lg flex items-center">
          <Link to="/settings">
            <div className="flex w-32">
              <i className="material-icons h-6">settings</i>
              <p className="hidden h-6 ml-3 items-center lg:flex">
                Settings
              </p>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};
