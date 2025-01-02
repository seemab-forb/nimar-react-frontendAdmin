import { twMerge } from "tailwind-merge";
import { useManageDepartmentsPage } from "../../Context/useManageDepartmentsPage";
import InputFieldPrimary from "../Primitives/InputFieldPrimary";

function DepSearchComponent() {
  const { setSearchQuery, searchQuery } = useManageDepartmentsPage();
  return (
    <InputFieldPrimary
      type="text"
      name="searchDepartment"
      id="searchDepartment"
      placeholder="search"
      className={twMerge("py-0.5 2xl:py-2")}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />

    // </div>
  );
}
export default DepSearchComponent;
