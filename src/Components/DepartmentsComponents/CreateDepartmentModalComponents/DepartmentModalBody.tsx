// import PermissionsSection from "./PermissionsSection";
import DepModalTopSection from "./DepModalTopSection";
import StorageSection from "./StorageSection";
import AdministratorSection from "./AdministratorSection";
import { useDepartmentModalContext } from "./useDepartmentModalContext";
import { useManageDepartmentsPage } from "../../../Context/useManageDepartmentsPage";
import StorageComponentEditModeDept from "./StorageComponentEditModeDept";
function DepartmentModalBody() {
  const {} = useDepartmentModalContext();
  const { departmentModalMode } = useManageDepartmentsPage();

  const isEditMode = departmentModalMode === "edit";

  return (
    <div className="px-6 py-3">
      <div className="">
        <DepModalTopSection />
        <div style={{ height: "1rem" }} />
        <div className="grid grid-cols-1 lg:grid-cols-[70%_1fr] gap-3">
          <AdministratorSection />
          {!isEditMode && <StorageSection />}
          {isEditMode && <StorageComponentEditModeDept />}
        </div>
      </div>
    </div>
  );
}
export default DepartmentModalBody;
