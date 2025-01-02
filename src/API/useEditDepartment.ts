import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { departmentsUrl } from "./constants";
import type { EditDepartmentType } from "./useEditDepartment.types";
import { useManageDepartmentsPage } from "../Context/useManageDepartmentsPage";
import { toast } from "react-toastify";
import { DepartmentModalModeType } from "../Context/useManageDepartmentsPage.types";


export const useEditDepartment = (id: number | null) => {
    const axiosInstance = useAxiosPrivate();
    const queryClient = useQueryClient();
    const { setDepartmentModalMode, setIsDepartmentModalOpen, setDepartmentId } = useManageDepartmentsPage();

    const editDepartment = (data: EditDepartmentType) => {

        const { departmentLogo, departmentName, departmentAdminFirstName, departmentAdminLastName, departmentAdminEmail, departmentAllocatedStorage, departmentAbbreviation } = data;

        const formData = new FormData();


        departmentLogo && formData.append("departmentLogo", departmentLogo);
        formData.append("departmentName", departmentName);
        formData.append("departmentAbbreviation", departmentAbbreviation);
        formData.append("departmentAdminFirstName", departmentAdminFirstName);
        formData.append("departmentAdminLastName", departmentAdminLastName);
        formData.append("departmentAdminEmail", departmentAdminEmail);
        formData.append("departmentAllocatedStorage", (departmentAllocatedStorage).toString());


        return axiosInstance.patch(`${departmentsUrl}${id}/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    return useMutation({
        mutationKey: ["editDepartment", id],
        mutationFn: editDepartment,
        onSuccess: () => {
            setDepartmentModalMode(DepartmentModalModeType.Create);
            setIsDepartmentModalOpen(false);
            toast.success("Department edited successfully");
            // if this not done, next time the user opens the same department, cached data will be added to the fields in the modal
            queryClient.removeQueries({
                queryKey: ["getSingleDepartment", id],
            });
            queryClient.invalidateQueries({
                queryKey: ["getAllDepartments"],
            });
            queryClient.invalidateQueries({
                queryKey: ["getConsumedStorage"]
            });
            setDepartmentId(null);

        }
    });
};




