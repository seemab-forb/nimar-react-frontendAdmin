import { useContext } from "react";
import { DepartmentModalContext } from "./DepartmentModalContextComponent";

export const useDepartmentModalContext = () => {
  if (!useContext(DepartmentModalContext)) {
    throw new Error(
      "useDepartmentModalContext must be used within a DepartmentModalContextProvider"
    );
  }

  return useContext(DepartmentModalContext);
};
