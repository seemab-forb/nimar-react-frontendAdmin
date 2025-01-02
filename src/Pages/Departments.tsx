import MainHeader from "../Components/SharedComponents/MainHeader";
import OutletMainContainer from "../Components/SharedComponents/OutletMainContainer";
import DepSearchbar from "../Components/DepartmentsComponents/DepSearchbar";
import DepartmentBasicTable from "../Components/DepartmentsComponents/DepartmentList/DepartmentBasicTable";
import ModalContainer from "../Components/SharedComponents/ModalContainer";
import DepartmentModal from "../Components/DepartmentsComponents/CreateDepartmentModalComponents/DepartmentModal";
import { useManageDepartmentsPage } from "../Context/useManageDepartmentsPage";
import { TbBuildingBank } from "react-icons/tb";
import { useUser } from "../Context/useUser";
import { Navigate } from "react-router-dom";

function Departments() {
  const { isDepartmentModalOpen } =    useManageDepartmentsPage();
  const { userType } = useUser();

  if (userType !== "super") {
    // TODO: redirect to 401 page
    return <Navigate to="/" />;
  }

  return (
    <OutletMainContainer>
      <div className="grid grid-cols-1 grid-rows-[auto_auto_1fr] h-full">
        <MainHeader
          title="Departments"
          icon={<TbBuildingBank className="text-2xl 2xl:text-4xl" />}
        />
        <DepSearchbar />
        <DepartmentBasicTable />
      </div>
      {isDepartmentModalOpen && (
        <ModalContainer>
          <DepartmentModal />
        </ModalContainer>
        // <div className="h-screen bg-white">
        //   <button
        //     type="button"
        //     onClick={() => setIsDepartmentModalOpen(false)}
        //     className="absolute top-0 right-0 p-2 bg-red-500"
        //   >
        //     close
        //   </button>
        // </div>
      )}
    </OutletMainContainer>
  );
}
export default Departments;
