import { NavLink } from "react-router-dom";
import { handleNavlink } from "../../../Utils/helpers";
import { useUser } from "../../../Context/useUser";

type RouteType = {
  name: string;
  path: string;
  // any means that the route is available for all users
  // super means that the route is only available for super users
  // admin means that the route is only available for admin users
  for: Array<"super" | "admin" | "user" | null>;
};

const routes: Array<RouteType> = [
  {
    name: "Overview",
    path: "/",
    for: ["super", "admin"],
  },

  {
    name: "Departments",
    path: "/departments",
    for: ["super"],
  },
  {
    name: "Users",
    path: "/users",
    for: ["super", "admin"],
  },
  {
    name: "Dictionaries",
    path: "/dictionaries",
    for: ["admin"],
  },
  {
    name: "Alerts",
    path: "/alerts",
    for: ["admin"],
  },
];

function SidebarRoutes() {
  const { userType } = useUser();
  return (
    <div className="w-full pl-6 text-xs 2xl:text-base">
      {routes.map((route) => {
        const thisRouteIsForThisUserType = route.for.includes(userType);

        if (!thisRouteIsForThisUserType) return;

        return (
          <NavLink to={route.path} key={route.name} className={handleNavlink}>
            {route.name}
          </NavLink>
        );
      })}
    </div>
  );
}
export default SidebarRoutes;
