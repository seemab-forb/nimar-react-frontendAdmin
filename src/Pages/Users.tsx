import MainHeader from "../Components/SharedComponents/MainHeader";
import OutletMainContainer from "../Components/SharedComponents/OutletMainContainer";
import UsersTableBasic from "../Components/UsersPageComponents/TableComponents/UsersTableBasic";
import { FaUsersRectangle } from "react-icons/fa6";
import UsersSearchbar from "../Components/UsersPageComponents/UsersSearchbar";
import { useState } from "react";
import ModalContainer from "../Components/SharedComponents/ModalContainer";
import useManageUsersPage from "../Context/useManageUsersPage";
import CreateUserModal from "../Components/UsersPageComponents/CreateUserModalComponents/CreateUserModal";
function Users() {
  const [query, setQuery] = useState("");
  const { isUsersModalOpen } = useManageUsersPage();
  return (
    <OutletMainContainer>
      <div className="grid grid-cols-1 grid-rows-[auto_auto_1fr] h-full">
        <MainHeader
          title="Users"
          icon={<FaUsersRectangle className="text-2xl 2xl:text-4xl" />}
        />
        <UsersSearchbar
          query={query}
          setQuery={(e) => setQuery(e.target.value)}
        />
        <UsersTableBasic
          query={query}
          setQuery={(e) => setQuery(e.target.value)}
        />
      </div>
      {isUsersModalOpen && (
        <ModalContainer>
          <CreateUserModal />
        </ModalContainer>
      )}
    </OutletMainContainer>
  );
}
export default Users;
