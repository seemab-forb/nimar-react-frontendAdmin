import { departmentsUrl } from './constants';
import { useAxiosPrivate } from "./useAxiosPrivate";
import type { CreateDeparatmentType } from './useCreateDepartment.types';
import { useMutation } from '@tanstack/react-query';



export const useCreateDepartment = () => {
  const axiosPrivate = useAxiosPrivate();


  return useMutation({
    mutationKey: ['createDepartment'],
    mutationFn: (formdata: CreateDeparatmentType) => {
      const formData = new FormData();


      const departmentAllocatedStorageInBytes = formdata.departmentAllocatedStorage;



      formData.append("departmentName", formdata.departmentName);
      formData.append("departmentAbbreviation", formdata.departmentAbbreviation);
      formdata.departmentLogo && formData.append("departmentLogo", formdata.departmentLogo);
      // formData.append("departmentPermissions", [700, 600]);
      formData.append(
        "departmentAllocatedStorage",
        departmentAllocatedStorageInBytes.toString()
      );
      formData.append("departmentAdminFirstName", formdata.departmentAdminFirstName);
      formData.append("departmentAdminLastName", formdata.departmentAdminLastName);
      formData.append("departmentAdminUsername", formdata.departmentAdminUsername);
      formData.append("departmentAdminEmail", formdata.departmentAdminEmail);
      formData.append("departmentAdminPassword", formdata.departmentAdminPassword);



      return axiosPrivate.post(departmentsUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },

  });




};
