import { RiEdit2Fill } from "react-icons/ri";
import useManageUsersPage, {
  CreateUserModalModeType,
} from "../../../Context/useManageUsersPage";
import type { SingleUserType } from "../../../API/ResponseTypes/GetAllUsersApi";
import userDpPlaceholder from "../../../assets/placeholderUser.jpg";
import { baseUrlFileAccess } from "../../../API/constants";
import StorageProgressBar from "../../Primitives/StorageProgressBar";
import { FaCrown } from "react-icons/fa";
import { useUser } from "../../../Context/useUser";
import { twMerge } from "tailwind-merge";

function UsersTableBody({
  tableData = [],
}: {
  tableData: Array<SingleUserType>;
}) {
  const { setCreateUserModalMode, setUserId, toggleIsUsersModalOpen } =
    useManageUsersPage();
  const { userType: currentLoginUser, UUID: loggedInDeptAdminUUID } = useUser();
  return (
    <tbody className="w-full h-full">
      {tableData.map((user) => {
        // TODO: type the user list response from the server
        const {
          UUID,
          username,
          email,
          allocatedStorage,
          consumedStorage,
          firstName,
          lastName,
          profilePic,
          userGropusCount,
          usersCirclesCount,
          userType,
          department,
        } = user;

        const isThisDeptAdminHimself = UUID === loggedInDeptAdminUUID;

        const isThisADeptAdmin = currentLoginUser === "admin";

        return (
          <tr key={UUID} className="text-center">
            <td className="flex justify-center py-3">
              <img
                className="object-cover w-10 rounded-full aspect-square"
                src={
                  profilePic
                    ? `${baseUrlFileAccess}media/${profilePic}`
                    : userDpPlaceholder
                }
                alt="profile"
              />
            </td>
            <td className="pl-6 text-left w-fit">
              <p className="relative w-fit">
                {firstName} {lastName} ({username})
                {userType !== "user" && (
                  <span
                    className={twMerge(
                      "absolute text-green-700 rotate-45 -top-3 -right-4",
                      userType === "admin" && "text-yellow-500"
                    )}
                    title={
                      userType === "admin"
                        ? `Admin of ${department}`
                        : "Super Admin"
                    }
                  >
                    <FaCrown />
                  </span>
                )}
              </p>
            </td>
            <td>
              <StorageProgressBar
                consumedSpace={consumedStorage}
                allocatedSpace={allocatedStorage}
              />
            </td>
            <td>{email}</td>
            <td>{userGropusCount}</td>
            <td>{usersCirclesCount}</td>

            {/* only dept admin can edit this and also he must not edit himself */}
            {isThisADeptAdmin && !isThisDeptAdminHimself && (
              <td>
                <button
                  type="button"
                  className="p-1 text-blue-500 bg-gray-200 rounded-md w-fit aspect-square hover:bg-gray-400"
                  onClick={() => {
                    setCreateUserModalMode(CreateUserModalModeType.EDIT);
                    setUserId(UUID);
                    toggleIsUsersModalOpen();
                  }}
                >
                  <RiEdit2Fill />
                </button>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
}
export default UsersTableBody;
