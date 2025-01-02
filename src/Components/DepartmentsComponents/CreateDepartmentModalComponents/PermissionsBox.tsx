import { useDepartmentModalContext } from "./useDepartmentModalContext";

function PermissionsBox({
	title = "",
	permissionsList = [],
}: {
	title: string;
	permissionsList: Array<string>;
}) {
	const { selectedPermission, setSelectedPermission } =
		useDepartmentModalContext();
	return (
		<div className="overflow-hidden shadow-md rounded-xl shadow-gray-200">
			<div className="w-full px-3 py-1 text-xl text-white bg-gradient-primary">
				{title}
			</div>
			<div className="border rounded-b-xl h-[250px]">
				<div>
					{permissionsList.length === 0 && (
						<div className="flex items-center justify-center mt-10 text-gray-400">
							No Permissions
						</div>
					)}
				</div>
				{permissionsList?.length !== 0 && (
					<div className="h-[250px] overflow-auto">
						{permissionsList?.map((permission) => {
							return (
								<button
									key={permission}
									type="button"
									className={`${
										selectedPermission === permission
											? "bg-blue-400 text-white"
											: "bg-none text-gray-500"
									} py-[3px] border-b px-6 cursor-pointer text-sm`}
									onClick={() => setSelectedPermission(permission)}
								>
									{permission}
								</button>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
export default PermissionsBox;
