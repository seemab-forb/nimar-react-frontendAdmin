import logoWithText from "../../assets/logoAdminWithText.png";
function LoginMotive() {
  return (
    <div className="grow h-screen hidden lg:flex lg:items-center bg-gradient-to-b from-blue-500 to-blue-950 ">
      <div className="ml-36 w-fit">
        <img src={logoWithText} alt="" className="w-[500px]" />
        <p className="py-3 text-right text-white font-semibold">
          Admin Portal of NIMAR Application{" "}
        </p>
      </div>
    </div>
  );
}
export default LoginMotive;
