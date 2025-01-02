import DepModalButtons from "./DepModalButtons";
import DepartmentModalNameImage from "./DepartmentModalNameImage";

function DepModalTopSection() {
  return (
    <div className="flex items-center justify-between">
      <DepartmentModalNameImage />
      <DepModalButtons />
    </div>
  );
}
export default DepModalTopSection;
