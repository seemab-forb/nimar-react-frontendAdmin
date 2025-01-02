import StorageSectionCreateUser from "./StorageSectionCreateUser";
import TopSectionUserModal from "./TopSectionUserModal";
import UserDetailFormUserModal from "./UserDetailFormUserModal";
import useManageUsersPage, {
  CreateUserModalModeType,
} from "../../../Context/useManageUsersPage";
import StorageComponentEditModeUser from "./StorageComponentEditModeUser";

function CreateUserModalBody() {
  const { createUserModalMode } = useManageUsersPage();

  const isEditMode = createUserModalMode === CreateUserModalModeType.EDIT;

  return (
    <div className="px-6 py-3">
      <TopSectionUserModal />
      <div style={{ height: "1rem" }} />
      <div className="grid grid-cols-1 lg:grid-cols-[70%_1fr] gap-3">
        <UserDetailFormUserModal />
        {!isEditMode && <StorageSectionCreateUser />}
        {isEditMode && <StorageComponentEditModeUser />}
      </div>
    </div>
  );
}
export default CreateUserModalBody;
