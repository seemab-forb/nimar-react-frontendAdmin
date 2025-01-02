import { NavLink, useNavigate } from "react-router-dom";

import { clearAppState, handleNavlink } from "../../../Utils/helpers";

const routes = [
  {
    name: "Settings",
    path: "/settings",
  },
];

function SidebarBottomButtons() {
  const navigate = useNavigate();
  return (
    <div className="w-full pb-10 pl-6 text-xs 2xl:text-base">
      {routes.map((route) => {
        return (
          <NavLink to={route.path} key={route.name} className={handleNavlink}>
            {route.name}
          </NavLink>
        );
      })}
      <button
        className="w-full text-left text-gray-400 hover:text-white"
        onClick={() => {
          navigate("/login");
          clearAppState();
        }}
      >
        Logout
      </button>
    </div>
  );
}
export default SidebarBottomButtons;
