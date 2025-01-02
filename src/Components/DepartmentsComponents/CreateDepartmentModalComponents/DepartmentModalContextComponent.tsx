import React, { useEffect, useState } from "react";
import { permissionToCode } from "../../../Utils/roles";
import { useGetSingleDepartment } from "../../../API/useGetSingleDepartment";
import { useManageDepartmentsPage } from "../../../Context/useManageDepartmentsPage";
import { baseUrlFileAccess } from "../../../API/constants";
import { DepartmentModalModeType } from "../../../Context/useManageDepartmentsPage.types";
import { useUser } from "../../../Context/useUser";
import useStorageUtils from "../../../hooks/useStorageUtils";

type DepartmentModalContextType = {
  allPermissions: Array<string>;
  setAllPermissions: React.Dispatch<React.SetStateAction<Array<string>>>;
  givenPermissions: Array<string>;
  setGivenPermissions: React.Dispatch<React.SetStateAction<Array<string>>>;
  selectedPermission: string;
  setSelectedPermission: React.Dispatch<React.SetStateAction<string>>;
  departmentAllocatedStorage: {
    assigned: number;
    total: number;
  };
  setDepartmentAllocatedStorage: React.Dispatch<
    React.SetStateAction<{
      assigned: number;
      total: number;
    }>
  >;
  departmentLogo: File | null;
  setDepartmentLogo: React.Dispatch<React.SetStateAction<File | null>>;
  departmentLogoUrl: string;
  setDepartmentLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  departmentName: string;
  setDepartmentName: React.Dispatch<React.SetStateAction<string>>;
  departmentAbbreviation: string;
  setDepartmentAbbreviation: React.Dispatch<React.SetStateAction<string>>;
  userFormdata: Record<string, string>;
  setUserFormdata: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  thisDepConsumedStorage: number;
};

const initialContext: DepartmentModalContextType = {
  allPermissions: [],
  setAllPermissions: () => {},
  givenPermissions: [],
  setGivenPermissions: () => {},
  selectedPermission: "",
  setSelectedPermission: () => {},
  departmentAllocatedStorage: {
    assigned: 0,
    total: 0,
  },
  setDepartmentAllocatedStorage: () => {},
  departmentLogo: null,
  setDepartmentLogo: () => {},
  departmentLogoUrl: "",
  setDepartmentLogoUrl: () => {},
  departmentName: "",
  setDepartmentName: () => {},
  departmentAbbreviation: "",
  setDepartmentAbbreviation: () => {},
  userFormdata: {
    departmentAdminFirstName: "",
    departmentAdminLastName: "",
    departmentAdminUsername: "",
    departmentAdminEmail: "",
    departmentAdminPassword: "",
  },
  setUserFormdata: () => {},
  thisDepConsumedStorage: 0,
};

export const DepartmentModalContext =
  React.createContext<DepartmentModalContextType>(initialContext);

function DepartmentModalContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { convertBtwStorageUnits } = useStorageUtils();
  const { consumedStorage, allocatedStorage } = useUser();
  const { departmentModalMode, departmentId } = useManageDepartmentsPage();
  const { data, isLoading } = useGetSingleDepartment({
    id: departmentId,
    mode: departmentModalMode,
  });
  const [allPermissions, setAllPermissions] = useState([
    ...Object.keys(permissionToCode),
  ]);
  const [givenPermissions, setGivenPermissions] = useState<Array<string>>([]);
  const [selectedPermission, setSelectedPermission] = useState("");

  // only used in edit mode
  const [thisDepConsumedStorage, setThisDepConsumedStorage] = useState(0);

  const superAdminRemainingStorageInGbs = convertBtwStorageUnits({
    value: allocatedStorage - consumedStorage,
    from: "B",
    to: "GB",
  });

  const [departmentAllocatedStorage, setDepartmentAllocatedStorage] = useState({
    assigned: 1,
    total: Math.floor(superAdminRemainingStorageInGbs),
  });
  const [departmentLogo, setDepartmentLogo] = useState<File | null>(null);
  const [departmentLogoUrl, setDepartmentLogoUrl] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departmentAbbreviation, setDepartmentAbbreviation] = useState("");
  const [userFormdata, setUserFormdata] = useState<Record<string, string>>({
    departmentAdminFirstName: "",
    departmentAdminLastName: "",
    departmentAdminUsername: "",
    departmentAdminEmail: "",
    departmentAdminPassword: "",
  });

  const userFormDataEmpty = Object.values(userFormdata).every(
    (value) => value === ""
  );

  useEffect(() => {
    if (
      !isLoading &&
      data &&
      departmentModalMode === DepartmentModalModeType.Edit &&
      userFormDataEmpty
    ) {
      const {
        adminFirstName,
        adminLastName,
        allocatedSpace,
        departmentEmail,
        departmentLogo,
        departmentName,
        departmentUserName,
        departmentAbbreviation,
        consumedSpace,
      } = data;

      const departmentAllocatedStorageInGbs = convertBtwStorageUnits({
        value: allocatedSpace,
        from: "B",
        to: "GB",
      });

      setDepartmentAllocatedStorage({
        assigned: departmentAllocatedStorageInGbs,
        total: superAdminRemainingStorageInGbs,
      });

      const thisUserConsumedStorageInGbs = convertBtwStorageUnits({
        value: consumedSpace,
        from: "B",
        to: "GB",
      });

      setThisDepConsumedStorage(thisUserConsumedStorageInGbs);

      setDepartmentLogoUrl(`${baseUrlFileAccess}media/${departmentLogo}`);
      setUserFormdata({
        departmentAdminFirstName: adminFirstName,
        departmentAdminLastName: adminLastName,
        departmentAdminUsername: departmentUserName,
        departmentAdminEmail: departmentEmail,
      });
      setDepartmentName(departmentName);
      setDepartmentAbbreviation(departmentAbbreviation);
    }
  }, [data, isLoading, departmentModalMode, convertBtwStorageUnits]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <DepartmentModalContext.Provider
      value={{
        allPermissions,
        setAllPermissions,
        givenPermissions,
        setGivenPermissions,
        selectedPermission,
        setSelectedPermission,
        departmentLogo,
        setDepartmentLogo,
        departmentLogoUrl,
        setDepartmentLogoUrl,
        departmentName,
        setDepartmentName,
        departmentAbbreviation,
        setDepartmentAbbreviation,
        userFormdata,
        setUserFormdata,
        departmentAllocatedStorage,
        setDepartmentAllocatedStorage,
        thisDepConsumedStorage,
      }}
    >
      {children}
    </DepartmentModalContext.Provider>
  );
}
export default DepartmentModalContextComponent;
