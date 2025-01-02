import {
	FaRegArrowAltCircleLeft,
	FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { useDepartmentModalContext } from "./useDepartmentModalContext";
function PermissionToggleButtons() {
	const {
		selectedPermission,
		givenPermissions,
		setGivenPermissions,
		allPermissions,
		setAllPermissions,
		setSelectedPermission,
	} = useDepartmentModalContext();

	function handleGivePermission() {
		setGivenPermissions((prev) => [...prev, selectedPermission]);
		setAllPermissions((prev) =>
			prev.filter((permission) => permission !== selectedPermission),
		);
		setSelectedPermission("");
	}

	function handleTakePermission() {
		setAllPermissions((prev) => [...prev, selectedPermission]);
		setGivenPermissions((prev) =>
			prev.filter((permission) => permission !== selectedPermission),
		);
		setSelectedPermission("");
	}

	return (
		<div className="flex flex-col justify-center h-full gap-3">
			<button
				type="button"
				className="text-green-700 cursor-pointer disabled:text-gray-400"
				disabled={
					selectedPermission === "" ||
					givenPermissions.includes(selectedPermission)
				}
				onClick={handleGivePermission}
				title="Give Permission"
			>
				<FaRegArrowAltCircleRight size={20} />
			</button>
			<button
				type="button"
				className="text-red-700 cursor-pointer disabled:text-gray-400"
				disabled={
					selectedPermission === "" ||
					allPermissions.includes(selectedPermission)
				}
				onClick={handleTakePermission}
				title="Take Permission"
			>
				<FaRegArrowAltCircleLeft size={20} />
			</button>
		</div>
	);
}
export default PermissionToggleButtons;
