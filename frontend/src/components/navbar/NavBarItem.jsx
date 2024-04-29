import { NavLink } from "react-router-dom";

export default function NavBarItem({ item }) {
  return (
    (
      item.route 
    ) ? (
      <li className="h-12 text-lg flex items-center m-1 hover:bg-slate-200 active:bg-slate-300 rounded-md w-12 lg:w-full" key={item.name}>
        <NavLink to={item.route} className="w-12 lg:w-full h-full p-3" >
          <div className="flex w-fit">
            <i className="material-icons h-6">{item.icon}</i>
            <p className="hidden h-6 ml-5 items-center lg:flex">
              {item.name}
            </p>
          </div>
        </NavLink>
      </li>
    ) : (
      <li className="h-12 text-lg flex items-center m-1 hover:bg-slate-200 active:bg-slate-300 rounded-md w-12 lg:w-full" key={item.name}>
        <button className="w-12 lg:w-full h-full p-3" onClick={item.fn}>
          <div className="flex w-fit">
            <i className="material-icons h-6">{item.icon}</i>
            <p className="hidden h-6 ml-5 items-center lg:flex">
              {item.name}
            </p>
          </div>
        </button>
      </li>
    )
  );
}
