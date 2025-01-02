import LoginForm from "./LoginForm";
import LoginMotive from "./LoginMotive";

function LoginMainContainer() {
  return (
    <div className="w-full h-screen flex justify-center lg:justify-between items-center">
      <LoginMotive />
      <div className="w-full lg:w-4/12 2xl:w-2/5 h-full flex justify-center items-center px-10 sm:px-0">
        <LoginForm className="w-full sm:w-[300px] lg:w-[270px] 2xl:w-[300px] h-[50vh] lg:h-fit bg-white border-2 lg:border-none p-3" />
      </div>
    </div>
  );
}
export default LoginMainContainer;
