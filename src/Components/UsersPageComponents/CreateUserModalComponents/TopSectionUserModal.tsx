import { toast } from "react-toastify";
import { useCreateUser } from "../../../API/useCreateUser";
import useManageUsersPage, {
  CreateUserModalModeType,
} from "../../../Context/useManageUsersPage";
import useCreateUserModalContext from "./useCreateUserModalContext";
import type { UserDetail } from "../../../API/useCreateUser.types";
import userPlaceholder from "../../../assets/placeholderUser.jpg";
import { useQueryClient } from "@tanstack/react-query";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { AxiosError } from "axios";
import { useEditUser } from "../../../API/useEditUser";
import ButtonFillPrimary from "../../Primitives/ButtonFillPrimary";
import useStorageUtils from "../../../hooks/useStorageUtils";

function TopSectionUserModal() {
  const { convertBtwStorageUnits } = useStorageUtils();
  const { isPending, mutate: createUser, isError, error } = useCreateUser();
  const {
    setCreateUserModalMode,
    userId,
    setUserId,
    createUserModalMode,
    setUsersModalOpen,
  } = useManageUsersPage();
  const { userDetails, allocatedStorage } = useCreateUserModalContext();
  const queryClient = useQueryClient();
  const {
    mutate: editUser,
    isError: isErrorInEditing,
    error: editingError,
  } = useEditUser(userId ?? null);

  const isAnyFieldEmptyForCreation = () => {
    return (
      userDetails.firstName &&
      userDetails.lastName &&
      userDetails.username &&
      userDetails.email &&
      userDetails.password &&
      allocatedStorage.assigned
    );
  };

  const allocatedStorageInBytes = convertBtwStorageUnits({
    value: allocatedStorage.assigned,
    from: "GB",
    to: "B",
  });

  const dataForCreation: UserDetail = {
    name: userDetails.username,
    email: userDetails.email,
    password: userDetails.password,
    allocatedStorage: allocatedStorageInBytes,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
  };

  const isAnyFieldEmptyForEdit = () => {
    return (
      userDetails.firstName &&
      userDetails.lastName &&
      userDetails.email &&
      allocatedStorage.assigned
    );
  };

  const dataForEdit = {
    email: userDetails.email,
    allocatedStorage: allocatedStorageInBytes,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
  };

  let errMessage = "";

  if (isError && error instanceof AxiosError) {
    if (error.request.status === 500) {
      errMessage = "Internal Server Error";
    } else {
      errMessage = error?.response?.data?.error;
    }
  }

  if (isErrorInEditing && editingError instanceof AxiosError) {
    if (editingError.request.status === 500) {
      errMessage = "Internal Server Error";
    } else {
      errMessage = editingError?.response?.data?.error;
    }
  }

  return (
    <div className="flex items-center justify-between w-full">
      <img
        className="w-16 overflow-hidden rounded-full aspect-square"
        src={userPlaceholder}
        alt="user"
      />
      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <ButtonFillPrimary
            onClick={() => {
              setUsersModalOpen(false);
              setCreateUserModalMode(CreateUserModalModeType.CREATE);
              setUserId(null);
            }}
          >
            Back
          </ButtonFillPrimary>
          <ButtonFillPrimary
            type="button"
            onClick={() => {
              if (createUserModalMode === CreateUserModalModeType.CREATE) {
                if (!isAnyFieldEmptyForCreation())
                  return toast.error("Please fill all fields");

                createUser(dataForCreation, {
                  onSuccess: () => {
                    setCreateUserModalMode(CreateUserModalModeType.CREATE);
                    toast.success("User created successfully");
                    queryClient.invalidateQueries({
                      queryKey: ["getAllUsers"],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["getConsumedStorage"],
                    });

                    // no need to remove the query per user id as in edit case, the user id will be null
                    setUsersModalOpen(false);
                  },
                  onError: (err) => {
                    toast.error(
                      (err instanceof AxiosError &&
                        err?.response?.data?.error) ||
                        (err instanceof AxiosError &&
                          err?.request?.status === 500 &&
                          "Internal Server Error")
                    );
                  },
                });
              }
              if (createUserModalMode === CreateUserModalModeType.EDIT) {
                if (!isAnyFieldEmptyForEdit())
                  return toast.error("Please fill all fields");
                editUser(dataForEdit, {
                  onError: (err) => {
                    console.log(err);
                    toast.error(
                      (err instanceof AxiosError &&
                        err?.response?.data?.error) ||
                        (err instanceof AxiosError &&
                          err?.request?.status === 500 &&
                          "Internal Server Error")
                    );
                  },
                });
              }
            }}
            isLoading={isPending}
          >
            {createUserModalMode === CreateUserModalModeType.CREATE && (
              <div className="flex items-center gap-2">
                <HiMiniSquaresPlus size={20} />
                Create
              </div>
            )}
            {createUserModalMode === CreateUserModalModeType.EDIT && (
              <div className="flex items-center gap-2">
                <FiEdit size={20} />
                Save
              </div>
            )}
          </ButtonFillPrimary>
        </div>
        {(isError || isErrorInEditing) && (
          <div className="text-sm text-red-500">
            {errMessage || "something went wrong"}
          </div>
        )}
      </div>
    </div>
  );
}
export default TopSectionUserModal;
