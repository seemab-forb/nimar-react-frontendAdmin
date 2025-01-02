import { RiCloseCircleFill } from "react-icons/ri";
import { useManageDepartmentsPage } from "../../../Context/useManageDepartmentsPage";
import { DepartmentModalModeType } from "../../../Context/useManageDepartmentsPage.types";
function DepartmentModalHeader() {
  const {
    toggleIsDepartmentModalOpen,
    departmentModalMode,
    setDepartmentModalMode,
    setDepartmentId,
  } = useManageDepartmentsPage();

  return (
    <div className="flex items-center justify-between w-full px-3 py-1 border-b">
      <div className="font-semibold text-blue-500">Create Department</div>
      {departmentModalMode === DepartmentModalModeType.Create && (
        <div className="text-sm text-red-500">
          Note: Once a department is created, it cannot be deleted.
        </div>
      )}
      <div
        onClick={() => {
          toggleIsDepartmentModalOpen();
          setDepartmentModalMode(DepartmentModalModeType.Create);
          setDepartmentId(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleIsDepartmentModalOpen();
            setDepartmentModalMode(DepartmentModalModeType.Create);
            setDepartmentId(null);
          }
        }}
        className="text-gray-400 cursor-pointer"
      >
        <RiCloseCircleFill size={30} />
      </div>
    </div>
  );
}
export default DepartmentModalHeader;
