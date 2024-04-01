

export default function NavBar() {
  const navItems = [
    {
      name: "Home",
      route: "/"
    },
    {
      name: "Search",
      route: "/search"
    },
    {
      name: "Messages",
      route: "/messages"
    },
    {
      name: "Create",
      route: "/create"
    },
    {
      name: "Notifications",
      route: "/notifications"
    },
    {
      name: "Profile",
      route: "/profile"
    }
  ];

  return (
    <nav className="w-20 lg:w-60 2xl:w-80 flex flex-col h-screen border-r border-gray-500 p-6">
      <ul className="flex flex-1 flex-col">
        {navItems.map((item) => {
          return (
            <li className="m-4 text-xl" key={item.name}>
              <a href={item.route}>
                {/* icon */}
                <p className="hidden lg:block">
                  {item.name}
                </p>
              </a>
            </li>
          );
        })}
      </ul>

      <p className="flex m-4 text-xl">
        <a className="hidden lg:block" href="/settings">Settings</a>
      </p>
    </nav>
  )
}