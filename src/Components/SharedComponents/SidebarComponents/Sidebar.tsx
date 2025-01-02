import SidebarProfile from "./SidebarProfile";
import SidebarBottomButtons from "./SidebarBottomButtons";
import SidebarLogo from "./SidebarLogo";
import SidebarRoutes from "./SidebarRoutes";
function Sidebar() {
  return (
    <div className="w-[150px] 2xl:w-[220px] h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex flex-col items-center justify-between">
      <div className="w-full">
        <SidebarLogo />
        <SidebarProfile />
        <SidebarRoutes />
      </div>
      <SidebarBottomButtons />
    </div>
  );
}
export default Sidebar;
