import { useUser } from "../../../Context/useUser";
import useStorageUtils from "../../../hooks/useStorageUtils";
import { useDepartmentModalContext } from "./useDepartmentModalContext";

function StorageSection() {
	const { convertBtwStorageUnits } = useStorageUtils();
	const { departmentAllocatedStorage, setDepartmentAllocatedStorage } =
		useDepartmentModalContext();
	const { allocatedStorage, consumedStorage } = useUser();

	const superAdminRemainingStorage = allocatedStorage - consumedStorage;

	const superAdminRemainingStorageInGbs = convertBtwStorageUnits({
		value: superAdminRemainingStorage,
		from: "B",
		to: "GB",
	});

	return (
		<div className="grid grid-rows-[auto_1fr] overflow-hidden shadow-md rounded-xl shadow-gray-200 max-w-xs lg:max-w-none ">
			<div className="w-full px-3 py-1 text-white bg-gradient-primary">
				Storage Allowed
			</div>
			<div className="flex items-center justify-center px-3 py-6 border grow">
				<div className="w-full">
					<div className="flex items-center justify-center gap-2">
						<input
							type="number"
							name="storage"
							min={1}
							max={superAdminRemainingStorageInGbs}
							step={1}
							className="w-2/6 input-field-form"
							value={departmentAllocatedStorage.assigned}
							onChange={(e) => {
								if (+e.target.value < 1) {
									setDepartmentAllocatedStorage({
										...departmentAllocatedStorage,
										assigned: 1,
									});
									return;
								}

								if (+e.target.value > superAdminRemainingStorageInGbs) {
									setDepartmentAllocatedStorage({
										...departmentAllocatedStorage,
										assigned: Math.round(superAdminRemainingStorageInGbs),
									});
									return;
								}

								setDepartmentAllocatedStorage({
									...departmentAllocatedStorage,
									assigned: +e.target.value,
								});
							}}
						/>
						<span className="min-w-fit">

						Gbs out of
						</span>
						<p className="font-bold min-w-fit">
							{superAdminRemainingStorageInGbs.toFixed(2)} GBs
						</p>
					</div>
					<div className="flex items-center justify-center w-full mt-6">
						<input
							type="range"
							name="storage"
							id="storage"
							min={1}
							max={superAdminRemainingStorageInGbs}
							value={departmentAllocatedStorage.assigned}
							onChange={(e) =>
								setDepartmentAllocatedStorage({
									...departmentAllocatedStorage,
									assigned: +e.target.value,
								})
							}
							className="w-full h-1"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default StorageSection;
