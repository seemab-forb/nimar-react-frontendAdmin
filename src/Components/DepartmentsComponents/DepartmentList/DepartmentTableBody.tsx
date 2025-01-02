import { useGetAllDepartments } from "../../../API/useGetAllDepartments";
import { RiEdit2Fill } from "react-icons/ri";
import { filterDepartments, verifyResourceUrl } from "../../../Utils/helpers";
import { useManageDepartmentsPage } from "../../../Context/useManageDepartmentsPage";
import LoadingPrimary from "../../SharedComponents/LoadingPrimary";
import { DepartmentModalModeType } from "../../../Context/useManageDepartmentsPage.types";
import { GetAllDepartmentsSchema } from "../../../API/ResponseTypes/getAllDepartmentsApi";
import userPicPlaceholder from "../../../assets/placeholderUser.jpg";
import ThreeValProgressBar from "../../Primitives/ThreeValProgressBar";

function DepartmentTableBody() {
  const { data, isLoading } = useGetAllDepartments();
  const {
    searchQuery,
    toggleIsDepartmentModalOpen,
    setDepartmentModalMode,
    setDepartmentId,
  } = useManageDepartmentsPage();

  // shift to parent component and use useQuery['get-all-departments-key'] to get loading state
  if (isLoading)
    // when shifted to parent component, remove tbody and tr tags. these are used because using div inside table is not a good practice
    return (
      <tbody className="mt-10">
        <tr>
          <td>
            <LoadingPrimary />
          </td>
        </tr>
      </tbody>
    );
  if (!data) {
    return (
      <tbody>
        <tr>
          <td className="py-10 text-center text-gray-500" colSpan={6}>
            No data found
          </td>
        </tr>
      </tbody>
    );
  }

  GetAllDepartmentsSchema.parse({ data });

  const filteredDepartments = filterDepartments(data, searchQuery);

  return (
    <tbody className="">
      {/* TODO: type with response type */}
      {filteredDepartments?.map((entry) => {
        const {
          id,
          departmentName,
          adminFirstName,
          adminLastName,
          departmentUserName,
          allocatedSpace,
          consumedSpace,
          departmentLogo,
          departmentUsersCount,
          departmentGroupsCount,
          created_at,
          departmentCriclesCount,
          departmentAbbreviation,
          usersConsumedStorage,
        } = entry;

        const isThisMOIB = departmentAbbreviation === "MOIB";

        return (
          <tr key={id} className="text-center text-gray-500">
            <td className="px-3 py-3 w-fit">
              {
                <img
                  className="object-cover w-10 mx-auto rounded-full aspect-square"
                  src={verifyResourceUrl(
                    departmentLogo || "",
                    userPicPlaceholder
                  )}
                  alt="department logo"
                />
              }
            </td>
            <td className="pl-6 text-left">{departmentName}</td>
            <td className="">
              <div className="flex items-center justify-center gap-2 py-3">
                <div>{`${adminFirstName} ${adminLastName} ` || "null"}</div>
                <div className="text-xs">({`${departmentUserName}`})</div>
              </div>
            </td>
            <td>
              <ThreeValProgressBar
                usersConsumedSpace={usersConsumedStorage}
                allocatedToUsersSpace={consumedSpace}
                totalAllocatedSpace={allocatedSpace}
              />
            </td>
            <td>{departmentUsersCount}</td>
            <td>{departmentGroupsCount}</td>
            <td>{departmentCriclesCount}</td>
            <td>
              {new Date(created_at)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "-")}
            </td>
            <td>
              {!isThisMOIB && (
                <button
                  type="button"
                  className="p-1 text-blue-500 bg-gray-200 rounded-md w-fit aspect-square hover:bg-gray-400"
                  onClick={() => {
                    setDepartmentModalMode(DepartmentModalModeType.Edit);
                    setDepartmentId(id);
                    toggleIsDepartmentModalOpen();
                  }}
                  title={`Edit ${departmentName} details`}
                  disabled={isThisMOIB}
                >
                  <RiEdit2Fill />
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
export default DepartmentTableBody;
