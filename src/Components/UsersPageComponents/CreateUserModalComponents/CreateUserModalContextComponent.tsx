import { createContext, useEffect, useState } from "react";
import useGetSingleUser from "../../../API/useGetSingleUser";
import useManageUsersPage, {
  CreateUserModalModeType,
} from "../../../Context/useManageUsersPage";
import type { CreateUserModalContextType } from "./CreateUserModalContextComponent.types";
import { useUser } from "../../../Context/useUser";
import useStorageUtils from "../../../hooks/useStorageUtils";

export const CreateUserModalContext = createContext<CreateUserModalContextType>(
  {
    userDetails: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },

    setUserDetails: () => {},
    allocatedStorage: {
      assigned: 0,
      total: 0,
    },
    setAllocatedStorage: () => {},
    thisUserConsumedStorage: 0,
  }
);

function CreateUserModalContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: shift the modal into edit button and save a global state for the user id
  const { createUserModalMode, userId } = useManageUsersPage();
  const { allocatedStorage: depAdminAllocatedStorage, consumedStorage } =
    useUser();
  const { convertBtwStorageUnits } = useStorageUtils();

  const depAdminRemainingStorageInGbs = convertBtwStorageUnits({
    value: depAdminAllocatedStorage - consumedStorage,
    from: "B",
    to: "GB",
  });

  const { data, isLoading } = useGetSingleUser({
    id: userId,
    mode: createUserModalMode,
  });

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [allocatedStorage, setAllocatedStorage] = useState({
    assigned: 1,
    total: depAdminRemainingStorageInGbs,
  });

  // only used in edit mode
  const [thisUserConsumedStorage, setThisUserConsumedStorage] = useState(0);

  const userDetailsAreEmpty = Object.values(userDetails).every(
    (value) => value === ""
  );

  useEffect(() => {
    if (
      !isLoading &&
      data &&
      createUserModalMode === CreateUserModalModeType.EDIT &&
      userDetailsAreEmpty
    ) {
      // SingleUserSchema.parse(data.results);
      const {
        firstName,
        lastName,
        username,
        email,
        allocatedStorage,
        consumedStorage,
      } = data.results;

      const userAllocatedStorageInGbs = convertBtwStorageUnits({
        value: allocatedStorage,
        from: "B",
        to: "GB",
      });

      setUserDetails({
        firstName,
        lastName,
        username,
        email,
        password: "",
      });

      setAllocatedStorage({
        assigned: userAllocatedStorageInGbs,
        total: depAdminRemainingStorageInGbs,
      });

      const thisUserConsumedStorageInGbs = convertBtwStorageUnits({
        value: consumedStorage,
        from: "B",
        to: "GB",
      });

      setThisUserConsumedStorage(thisUserConsumedStorageInGbs);
    }
  }, [data, isLoading, createUserModalMode, convertBtwStorageUnits]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CreateUserModalContext.Provider
      value={{
        userDetails,
        setUserDetails,
        allocatedStorage,
        setAllocatedStorage,
        thisUserConsumedStorage,
      }}
    >
      {children}
    </CreateUserModalContext.Provider>
  );
}
export default CreateUserModalContextComponent;
