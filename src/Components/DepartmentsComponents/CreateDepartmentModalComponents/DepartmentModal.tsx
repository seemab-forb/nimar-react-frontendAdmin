// import DepartmentModalHeader from "./DepartmentModalHeader";
import DepartmentModalBody from "./DepartmentModalBody";
import DepartmentModalContextComponent from "./DepartmentModalContextComponent";

function DepartmentModal() {
  return (
    <DepartmentModalContextComponent>
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-11/12 bg-white 2xl:w-9/12 rounded-xl">
          <DepartmentModalBody />
        </div>
      </div>
    </DepartmentModalContextComponent>
  );
}
export default DepartmentModal;
