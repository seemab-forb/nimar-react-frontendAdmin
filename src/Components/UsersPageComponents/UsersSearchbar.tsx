import UsersSearchComponent from "./UsersSearchComponent";
import { TbSquareRoundedPlus } from "react-icons/tb";
import useManageUsersPage from "../../Context/useManageUsersPage";
import { useUser } from "../../Context/useUser";
import ButtonFillPrimary from "../Primitives/ButtonFillPrimary";
function UsersSearchbar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { toggleIsUsersModalOpen } = useManageUsersPage();
  const { userType } = useUser();

  return (
    <div className="flex items-center gap-3 px-[1px] pt-6 pb-3">
      <UsersSearchComponent query={query} setQuery={setQuery} />
      {userType === "admin" && (
        <ButtonFillPrimary
          type="button"
          onClick={toggleIsUsersModalOpen}
        >
          <TbSquareRoundedPlus />
          Create User
        </ButtonFillPrimary>
      )}
    </div>
  );
}
export default UsersSearchbar;
