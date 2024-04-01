

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
    <nav className="col-auto w-20 lg:w-60 2xl:w-80 flex flex-col h-screen border-r border-gray-500 p-3">
      <h1 className="text-2xl p-3 hidden lg:block">Website Name</h1>
      <ul className="flex flex-1 flex-col">
        {navItems.map((item) => {
          return (
            <li 
            className="h-14 p-3 text-lg flex items-center"
            key={item.name}>
              <a href={item.route}>
                <div className="flex w-32">
                  <i className="material-icons h-6">{item.icon}</i>
                  <p className="hidden h-6 ml-3 items-center lg:flex">
                    {item.name}
                  </p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="h-14 p-3 text-lg flex items-center">
        <a href="/settings">
          <div className="flex w-32">
            <i className="material-icons h-6">settings</i>
            <p className="hidden h-6 ml-3 items-center lg:flex">
              Settings
            </p>
          </div>
        </a>
      </div>
    </nav>
  );
};
