import { useContext } from "react";
import { CreateUserModalContext } from "./CreateUserModalContextComponent";

function useCreateUserModalContext() {
  if (CreateUserModalContext === undefined) {
    throw new Error(
      "useCreateUserModalContext must be used within a CreateUserModalContextComponent"
    );
  }

  return useContext(CreateUserModalContext);
}

export default useCreateUserModalContext;
