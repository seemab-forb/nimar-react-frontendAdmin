import { RiCloseCircleFill } from "react-icons/ri";
import useManageUsersPage, {
	CreateUserModalModeType,
} from "../../../Context/useManageUsersPage";
import { useUser } from "../../../Context/useUser";
function CreateUserModalHeader() {
	const { toggleIsUsersModalOpen, setCreateUserModalMode, setUserId } =
		useManageUsersPage();
	const { userDepartment } = useUser();
	const { createUserModalMode } = useManageUsersPage();

	return (
		<div className="flex items-center justify-between w-full px-6 py-1 border-b">
			{/* dynamically input department name */}
			<div className="font-semibold text-blue-500">
				{createUserModalMode === CreateUserModalModeType.CREATE &&
					`Create User for ${userDepartment}`}
				{createUserModalMode === CreateUserModalModeType.EDIT && "Edit User"}
			</div>

			<button
				type="button"
				onClick={() => {
					toggleIsUsersModalOpen();
					setCreateUserModalMode(CreateUserModalModeType.CREATE);
					setUserId(null);
				}}
				className="text-gray-400 cursor-pointer"
			>
				<RiCloseCircleFill size={30} />
			</button>
		</div>
	);
}
export default CreateUserModalHeader;
