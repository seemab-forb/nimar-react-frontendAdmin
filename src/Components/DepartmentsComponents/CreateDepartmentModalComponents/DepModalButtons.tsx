import { toast } from "react-toastify";
import { useCreateDepartment } from "../../../API/useCreateDepartment";
import type { CreateDeparatmentType } from "../../../API/useCreateDepartment.types";
import { useManageDepartmentsPage } from "../../../Context/useManageDepartmentsPage";
import { useDepartmentModalContext } from "./useDepartmentModalContext";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { DepartmentModalModeType } from "../../../Context/useManageDepartmentsPage.types";
import { AxiosError } from "axios";
import { useEditDepartment } from "../../../API/useEditDepartment";
import type { EditDepartmentType } from "../../../API/useEditDepartment.types";
import { FiEdit } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import ButtonFillPrimary from "../../Primitives/ButtonFillPrimary";
import useStorageUtils from "../../../hooks/useStorageUtils";

function DepModalButtons() {
  const { convertBtwStorageUnits } = useStorageUtils();
  const {
    isPending,
    mutate: createDepartment,
    isError,
    error,
  } = useCreateDepartment();

  const {
    departmentModalMode,
    setDepartmentModalMode,
    setIsDepartmentModalOpen,
    departmentId,
    setDepartmentId,
  } = useManageDepartmentsPage();

  const queryClient = useQueryClient();

  const {
    mutate: editDepartment,
    error: editApiError,
    isError: isErrorInEditing,
  } = useEditDepartment(departmentId);

  const {
    userFormdata: {
      departmentAdminFirstName,
      departmentAdminLastName,
      departmentAdminUsername,
      departmentAdminEmail,
      departmentAdminPassword,
    },
    departmentAllocatedStorage,
    departmentLogo,
    departmentName,
    departmentAbbreviation,
  } = useDepartmentModalContext();

  const isAnyFieldEmptyForCreation = () =>
    departmentAdminFirstName &&
    departmentAdminLastName &&
    departmentAdminUsername &&
    departmentAdminEmail &&
    departmentAdminPassword &&
    departmentAllocatedStorage &&
    departmentLogo &&
    departmentName &&
    departmentAbbreviation;

  const isAnyFieldEmptyForEdit = () =>
    departmentAdminFirstName &&
    departmentAdminLastName &&
    departmentAdminEmail &&
    departmentName;
  departmentAbbreviation;

  const allocatedStorageInBytes = convertBtwStorageUnits({
    value: departmentAllocatedStorage.assigned,
    from: "GB",
    to: "B",
  });

  // TODO: specify better type
  const data: CreateDeparatmentType = {
    departmentName,
    departmentAbbreviation,
    departmentAllocatedStorage: allocatedStorageInBytes,
    departmentAdminEmail,
    departmentAdminPassword,
    departmentAdminUsername,
    departmentAdminFirstName,
    departmentAdminLastName,
    departmentLogo,
  };

  const editData: EditDepartmentType = {
    departmentAllocatedStorage: allocatedStorageInBytes,
    departmentAdminEmail,
    departmentAdminFirstName,
    departmentAdminLastName,
    departmentName,
    departmentAbbreviation,
    departmentLogo,
  };

  let errorMessage = error?.message ?? "something went wrong";

  if (
    error instanceof AxiosError &&
    departmentModalMode === DepartmentModalModeType.Create
  ) {
    errorMessage =
      error?.response?.data?.error ||
      (error?.request?.status === 500 && "Internal Server Error");
  }

  // so that we don't get the an empty error message when we are in edit mode
  if (
    editApiError instanceof AxiosError &&
    departmentModalMode === DepartmentModalModeType.Edit
  ) {
    errorMessage =
      editApiError?.response?.data?.error ||
      (editApiError?.request?.status === 500 && "Internal Server Error");
  }

  function handleCreateDepartment() {
    if (!isAnyFieldEmptyForCreation())
      return toast.error("Please fill all fields");

    createDepartment(data, {
      onSuccess: () => {
        setDepartmentModalMode(DepartmentModalModeType.Create);
        setIsDepartmentModalOpen(false);
        toast.success("Department created successfully");
        queryClient.invalidateQueries({
          queryKey: ["getAllDepartments"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getConsumedStorage"],
        });
      },
      onError: (err) => {
        toast.error(
          (err instanceof AxiosError && err?.response?.data?.error) ||
            (err instanceof AxiosError &&
              err?.request?.status === 500 &&
              "Internal Server Error")
        );
      },
    });
  }

  function handleEditDepartment() {
    if (!isAnyFieldEmptyForEdit()) return toast.error("Please fill all fields");

    editDepartment(editData, {
      // onSuccess function has been move to useEditDepartment.ts because react was giving warning of updating state from a component which directly effect its own render
      onError: (err) => {
        toast.error(
          (err instanceof AxiosError && err?.response?.data?.error) ||
            (err instanceof AxiosError &&
              err?.request?.status === 500 &&
              "Internal Server Error")
        );
      },
    });
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        <ButtonFillPrimary
          onClick={() => {
            setIsDepartmentModalOpen(false);
            setDepartmentModalMode(DepartmentModalModeType.Create);
            setDepartmentId(null);
          }}
        >
          Back
        </ButtonFillPrimary>
        <ButtonFillPrimary
          type="button"
          onClick={() => {
            if (departmentModalMode === DepartmentModalModeType.Create) {
              handleCreateDepartment();

              return;
            }
            handleEditDepartment();
          }}
          isLoading={isPending}
        >
          {departmentModalMode === DepartmentModalModeType.Create && (
            <div className="flex items-center gap-2">
              <HiMiniSquaresPlus size={20} />
              Create
            </div>
          )}
          {departmentModalMode === DepartmentModalModeType.Edit && (
            <div className="flex items-center gap-2">
              <FiEdit size={20} />
              Save
            </div>
          )}
        </ButtonFillPrimary>
      </div>
      {isError ||
        (isErrorInEditing && (
          <div className="text-sm text-red-500">
            {errorMessage || "something went wrong"}
          </div>
        ))}
    </div>
  );
}
export default DepModalButtons;
