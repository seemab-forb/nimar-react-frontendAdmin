import DepartmentTableHeader from "./DepartmentTableHeader";
import DepartmentTableBody from "./DepartmentTableBody";
function DepartmentBasicTable() {
  return (
    <div
      // padding-right for giving space for scrollbar
      className="w-full pr-3 mt-3 overflow-auto grow"
      style={{
        scrollbarWidth: "thin",
      }}
    >
      <table className="w-[1200px] xl:w-full text-sm 2xl:text-base ">
        <DepartmentTableHeader />
        <DepartmentTableBody />
      </table>
    </div>
  );
}
export default DepartmentBasicTable;
