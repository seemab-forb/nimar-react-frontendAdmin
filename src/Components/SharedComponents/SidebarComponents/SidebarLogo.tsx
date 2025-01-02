import logoWithText from "../../../assets/logoWithText.png";

function SidebarLogo() {
  return (
    <div className="flex justify-center px-3 pt-6 pb-1">
      <img src={logoWithText} alt="" className="w-full 2xl:w-10/12" />
    </div>
  );
}
export default SidebarLogo;
