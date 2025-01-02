import PermissionToggleButtons from "./PermissionToggleButtons";
import PermissionsBox from "./PermissionsBox";
import { useDepartmentModalContext } from "./useDepartmentModalContext";

function PermissionsSection() {
  const { allPermissions, givenPermissions } = useDepartmentModalContext();
  return (
    <div className="grid grid-cols-[1fr,auto,1fr] gap-2 mx-auto my-6">
      <PermissionsBox
        title="All Permissions"
        permissionsList={allPermissions}
      />
      <PermissionToggleButtons />
      <PermissionsBox
        title="Given Permissions"
        permissionsList={givenPermissions}
      />
    </div>
  );
}
export default PermissionsSection;
