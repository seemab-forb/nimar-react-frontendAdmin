export enum DepartmentModalModeType {
  Create = "create",
  Edit = "edit",
}

export type UseManageDepartmentsPageType = {
  isDepartmentModalOpen: boolean;
  departmentModalMode: DepartmentModalModeType;
  departmentId: number | null; // for editing
  toggleIsDepartmentModalOpen: () => void;
  setIsDepartmentModalOpen: (isOpen: boolean) => void;
  setDepartmentModalMode: (mode: DepartmentModalModeType) => void;
  setDepartmentId: (id: number | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearState: () => void;
};
