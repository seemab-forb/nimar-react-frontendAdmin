import { create } from "zustand";
import {
  DepartmentModalModeType,
  type UseManageDepartmentsPageType,
} from "./useManageDepartmentsPage.types";
import { mountStoreDevtool } from "simple-zustand-devtools";

export const useManageDepartmentsPage = create<UseManageDepartmentsPageType>()(
  (set, get) => ({
    isDepartmentModalOpen: false,
    departmentModalMode: DepartmentModalModeType.Create,
    departmentId: null,
    searchQuery: "",
    toggleIsDepartmentModalOpen() {
      set({
        isDepartmentModalOpen: !get().isDepartmentModalOpen,
      });
    },
    setIsDepartmentModalOpen(isOpen) {
      set({
        isDepartmentModalOpen: isOpen,
      });
    },
    setDepartmentModalMode(mode) {
      set({
        departmentModalMode: mode,
      });
    },
    setDepartmentId(id) {
      set({
        departmentId: id,
      });
    },
    setSearchQuery(query) {
      set({
        searchQuery: query,
      });
    },
    clearState() {
      set({
        isDepartmentModalOpen: false,
        departmentModalMode: DepartmentModalModeType.Create,
        departmentId: null,
        searchQuery: "",
      });
    },
  })
);

if (import.meta.env.DEV) {
  mountStoreDevtool("DepartmentsPage", useManageDepartmentsPage);
}
