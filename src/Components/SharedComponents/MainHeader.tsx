import { FaBell } from "react-icons/fa";
function MainHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-gray-500">
      <div className="flex items-end gap-2 ">
        {icon}
        <h1 className="text-base font-semibold 2xl:text-2xl">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <p className="px-3 py-0 text-sm font-semibold text-blue-500 bg-white rounded-md shadow-xl 2xl:py-1 2xl:text-base">
          v-2.5
        </p>
        <FaBell className="text-xl 2xl:text-3xl" />
      </div>
    </div>
  );
}
export default MainHeader;
