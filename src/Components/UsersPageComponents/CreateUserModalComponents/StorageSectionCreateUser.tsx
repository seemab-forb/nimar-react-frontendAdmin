import useCreateUserModalContext from "./useCreateUserModalContext";
import { useUser } from "../../../Context/useUser";
import useStorageUtils from "../../../hooks/useStorageUtils";

function StorageSectionCreateUser() {
	const { allocatedStorage, setAllocatedStorage } = useCreateUserModalContext();
	const { allocatedStorage: userAllocatedStorage, consumedStorage } = useUser();
	const { convertBtwStorageUnits } = useStorageUtils();

	const remainingStorage = userAllocatedStorage - consumedStorage;

	const superAdminRemainingStorageInGbs = convertBtwStorageUnits({
		value: remainingStorage,
		from: "B",
		to: "GB",
	});

	return (
		<div className="flex flex-col w-full overflow-hidden shadow-md rounded-xl shadow-gray-200">
			<div className="w-full px-3 py-1 text-xl text-white bg-gradient-primary">
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
							className="w-2/6 pr-3 input-field-form"
							value={allocatedStorage.assigned}
							onChange={(e) => {
								if (+e.target.value < 1) {
									setAllocatedStorage({ ...allocatedStorage, assigned: 1 });
									return;
								}
								if (+e.target.value > superAdminRemainingStorageInGbs) {
									setAllocatedStorage({
										...allocatedStorage,
										assigned: Math.floor(superAdminRemainingStorageInGbs),
									});
									return;
								}

								setAllocatedStorage({
									...allocatedStorage,
									assigned: +e.target.value,
								});
							}}
						/>
						Gbs out of
						<p className="font-bold whitespace-nowrap">
							{superAdminRemainingStorageInGbs.toFixed(2)} Gbs
						</p>
					</div>
					<div className="flex items-center justify-center w-full mt-6">
						<input
							type="range"
							name="storage"
							id="storage"
							min={1}
							max={superAdminRemainingStorageInGbs}
							value={allocatedStorage.assigned}
							onChange={(e) =>
								setAllocatedStorage({
									...allocatedStorage,
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
export default StorageSectionCreateUser;
