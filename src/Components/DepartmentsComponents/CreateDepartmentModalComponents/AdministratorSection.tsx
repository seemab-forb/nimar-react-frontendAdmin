import { useState } from "react";
import AddNewUser from "./AddNewUser";
// import { useManageDepartmentsPage } from "../../../Context/useManageDepartmentsPage";
// import { DepartmentModalModeType } from "../../../Context/useManageDepartmentsPage.types";
function AdministratorSection() {
	const [isExistingUser] = useState(false);
	// const { departmentModalMode } = useManageDepartmentsPage();
	return (
		<div className="flex flex-col overflow-hidden shadow-md grow rounded-xl shadow-gray-200">
			<div className="w-full px-3 py-1 text-white bg-gradient-primary">
				Department Administrator
			</div>
			<div className="px-6 py-3 border grow">
				{/* because there should be no user if department is being created */}
				{/* TODO: must see how it looks and behaves in edit mode */}

				{/* {departmentModalMode !== DepartmentModalModeType.Create && (
          <form className="flex items-center gap-6 my-3">
            <label htmlFor="addNewUser" className="flex gap-2 text-sm">
              <input
                type="radio"
                name="addNewUser"
                id="addNewUser"
                checked={!isExistingUser}
                onChange={() => setIsExistingUser(false)}
              />
              Add New User
            </label>
            <label htmlFor="existingUser" className="flex gap-2 text-sm">
              <input
                type="radio"
                name="existingUser"
                id="existingUser"
                checked={isExistingUser}
                onChange={() => setIsExistingUser(true)}
              />
              Existing User
            </label>
          </form>
        )} */}

				<div className="">
					{/* not using yet. not adopted new schema yet */}
					{/* {isExistingUser && <ExistingUser />} */}
					{!isExistingUser && <AddNewUser />}
				</div>
			</div>
		</div>
	);
}
export default AdministratorSection;
