import DepSearchComponent from "./DepSearchComponent";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { useManageDepartmentsPage } from "../../Context/useManageDepartmentsPage";
import ButtonFillPrimary from "../Primitives/ButtonFillPrimary";

function DepSearchbar() {
  const { toggleIsDepartmentModalOpen } = useManageDepartmentsPage();

  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 px-[1px] pt-6 pb-3">
      <DepSearchComponent />
      <ButtonFillPrimary
        type="button"
        onClick={() => {
          toggleIsDepartmentModalOpen();
        }}
      >
        <TbSquareRoundedPlus />
        Create Department
      </ButtonFillPrimary>
    </div>
  );
}
export default DepSearchbar;
