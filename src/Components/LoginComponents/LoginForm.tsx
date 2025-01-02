import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../../API/useLoginUser";
import { AxiosError } from "axios";
import { useUser } from "../../Context/useUser";
import { refreshTokenKey } from "../../Utils/constants";
import ButtonFillPrimary from "../Primitives/ButtonFillPrimary";

type LoginFormProps = {
  className: string;
};

function LoginForm({ className }: LoginFormProps) {
  const navigate = useNavigate();
  const [persistLogin, setPersistLogin] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    name: "",
    password: "",
  });
  const { setUser, clearUser } = useUser();
  const { mutate, isError, error, isPending } = useLoginUser();

  useEffect(() => {
    clearUser();
  }, [clearUser]);

  const formElements = [
    {
      id: 1,
      type: "text",
      placeholder: "Username",
      name: "name",
      label: "User Name",
      value: loginDetails.name,
      setValue: setLoginDetails,
    },
    {
      id: 2,
      type: "password",
      placeholder: "Password",
      name: "password",
      label: "Password",
      value: loginDetails.password,
      setValue: setLoginDetails,
    },
  ];

  function revealPassword(checked: boolean) {
    if (checked) {
      const input = document.getElementById("password");
      input?.setAttribute("type", "text");
    } else {
      const input = document.getElementById("password");
      input?.setAttribute("type", "password");
    }
  }

  let errMessage = "";

  if (error instanceof AxiosError)
    errMessage = error?.response?.data?.message || error?.message;

  return (
    <div className={`${className}`}>
      <div className="flex justify-center">{nimarLogo}</div>
      <h1 className="mb-3 text-2xl font-bold text-center text-black 2xl:text-3xl lg:text-slate-900 lg:text-left">
        Hello Again!
      </h1>
      <h1 className="text-lg text-center text-black 2xl:text-xl lg:text-slate-900 lg:text-left">
        Welcome Back
      </h1>
      <div>
        <form
          className="flex flex-col gap-4 mt-6 2xl:mt-14"
          onSubmit={(e) => {
            e.preventDefault();
            mutate(loginDetails, {
              onSuccess: (data) => {
                const userDetails = data.data.results;

                // because the userUser Store and login API response is same
                setUser(userDetails);

                if (persistLogin) {
                  const refreshToken = userDetails.refreshToken;
                  localStorage.setItem(refreshTokenKey, refreshToken);
                }

                navigate("/");
              },
              onError: (err) => {
                console.log(err);
              },
              onSettled: () => {
                // console.log(res);
              },
            });
          }}
        >
          {formElements.map((element) => {
            const { id, name, type, placeholder, value, setValue } = element;
            return (
              <div key={id}>
                <input
                  type={type}
                  name={name}
                  id={name}
                  className="block w-full px-3 py-2 rounded-md ring-1 ring-gray-200"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => {
                    setValue({
                      ...loginDetails,
                      [name]: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            );
          })}
          <div className="flex justify-between">
            {/* remember me */}
            <p className="flex items-center gap-1 text-sm text-black">
              <input
                type="checkbox"
                name="persistLogin"
                id="persistLogin"
                onChange={(e) => setPersistLogin(e.target.checked)}
                defaultChecked={persistLogin}
              />
              Remember me
            </p>
            <p className="flex items-center gap-1 text-sm text-black">
              <input
                type="checkbox"
                onChange={(e) => revealPassword(e.target.checked)}
              />
              Show password
            </p>
          </div>
          <div className="h-6" />
          <ButtonFillPrimary
            type="submit"
            onClick={() => {}}
            isLoading={isPending}
          >
            Login
          </ButtonFillPrimary>
        </form>
        <p className="mt-3 text-sm text-black cursor-pointer select-none hover:text-blue-500">
          Forgot password?
        </p>
        {isError && <p className="mt-3 text-sm text-red-500">{errMessage}</p>}
      </div>
    </div>
  );
}
export default LoginForm;

const nimarLogo = (
  <svg
    viewBox="0 0 163 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="block w-4/5 shrink-0 lg:hidden"
  >
    <title>NIMAR logo with text</title>
    <path
      className="fill-slate-900"
      d="M77.91 35h-5.894l-9.86-14.928V35H56.26V10.798h5.895l9.86 14.997V10.798h5.896V35zm8.79-24.202V35h-5.895V10.798h5.896zm30.303 0V35h-5.896V20.485L105.695 35h-4.758L95.49 20.45V35h-5.896V10.798h6.964l6.792 16.755 6.723-16.755h6.93zm17.927 19.927h-9.033L124.449 35h-6.172l8.757-24.202h6.827L142.618 35h-6.24l-1.448-4.275zm-1.517-4.551l-3-8.86-2.965 8.86h5.965zM156.246 35l-5.033-9.136h-1.414V35h-5.895V10.798h9.895c1.907 0 3.528.333 4.861 1 1.356.666 2.367 1.585 3.034 2.758.666 1.149 1 2.436 1 3.86 0 1.61-.46 3.046-1.379 4.31-.897 1.265-2.23 2.16-4 2.69L162.9 35h-6.654zm-6.447-13.308h3.655c1.08 0 1.885-.264 2.413-.793.552-.529.828-1.276.828-2.24 0-.92-.276-1.644-.828-2.173-.528-.529-1.333-.793-2.413-.793h-3.655v6z"
    />

    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.157 0c-2.661 0-5.214 1.008-7.096 2.803L.979 11.464v3.965c0 2.8 1.262 5.32 3.273 7.071C2.24 24.25.979 26.77.979 29.571v3.965l9.082 8.66C11.943 43.993 14.496 45 17.157 45c2.937 0 5.58-1.203 7.415-3.12 1.835 1.917 4.477 3.12 7.414 3.12 2.662 0 5.214-1.008 7.096-2.803l9.082-8.661V29.57c0-2.8-1.262-5.32-3.273-7.071 2.011-1.75 3.273-4.27 3.273-7.071v-3.965l-9.082-8.66C37.2 1.007 34.648 0 31.986 0c-2.937 0-5.58 1.203-7.414 3.12C22.736 1.204 20.094 0 17.157 0zm14.208 22.5a9.923 9.923 0 01-.333-.303l-6.46-6.162-6.46 6.162c-.11.103-.22.205-.333.303.113.098.224.2.332.303l6.46 6.162 6.46-6.162c.11-.103.22-.205.334-.303zm-4.172 11.036v1.893c0 2.524 2.146 4.571 4.793 4.571 1.271 0 2.49-.482 3.389-1.339l7.546-7.197v-1.893c0-2.524-2.146-4.571-4.793-4.571-1.271 0-2.49.482-3.389 1.339l-7.546 7.197zm-5.243 0l-7.546-7.197A4.913 4.913 0 0011.015 25c-2.647 0-4.793 2.047-4.793 4.571v1.893l7.546 7.197A4.914 4.914 0 0017.158 40c2.646 0 4.792-2.047 4.792-4.571v-1.893zm0-23.965v1.893l-7.546 7.197A4.913 4.913 0 0111.015 20c-2.647 0-4.793-2.047-4.793-4.571v-1.893l7.546-7.197A4.914 4.914 0 0117.158 5c2.646 0 4.792 2.047 4.792 4.571zm12.789 9.09l-7.546-7.197V9.571C27.193 7.047 29.339 5 31.986 5c1.271 0 2.49.482 3.389 1.339l7.546 7.197v1.893c0 2.524-2.146 4.571-4.793 4.571a4.913 4.913 0 01-3.389-1.339z"
      className="fill-slate-900"
    />
  </svg>
);
