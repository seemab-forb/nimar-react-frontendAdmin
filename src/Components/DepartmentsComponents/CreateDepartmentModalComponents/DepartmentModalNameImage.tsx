import { useState } from "react";
import { useManageDepartmentsPage } from "../../../Context/useManageDepartmentsPage";
import { DepartmentModalModeType } from "../../../Context/useManageDepartmentsPage.types";
import DepModalNameImageEdit from "./DepModalNameImageEdit";
import { RiEdit2Fill } from "react-icons/ri";

function DepartmentModalNameImage() {
  const { departmentModalMode } = useManageDepartmentsPage();
  const [, setIsEditing] = useState(false);

  if (
    departmentModalMode === DepartmentModalModeType.Edit ||
    departmentModalMode === DepartmentModalModeType.Create
  )
    return <DepModalNameImageEdit />;

  return (
    <DepModalNameImageDisplay
      departmentModalMode={departmentModalMode}
      setIsEditing={setIsEditing}
    />
  );
}
export default DepartmentModalNameImage;

function DepModalNameImageDisplay(props: {
  departmentModalMode: DepartmentModalModeType;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="overflow-hidden bg-blue-500 border-2 border-white rounded-full w-fit">
        <img // src="https://picsum.photos/200/300?blue"
          // TODO: check this must not be used in production
          src="https://ptv.com.pk/user/assets/images/ptv-logo.jpg"
          alt="" // TODO: change this to auto height. also for other img tag instances
          className="object-cover w-16 aspect-square"
        />
      </div>
      <div>
        <p className="flex gap-2 text-2xl font-semibold text-gray-500">
          Pakistan Televison Corp. Ltd
          {props.departmentModalMode === DepartmentModalModeType.Edit && (
            <button
              type="button"
              className="text-gray-600 hover:text-blue-500"
              onClick={() => props.setIsEditing(true)}
            >
              <RiEdit2Fill />
            </button>
          )}
        </p>
        <p>
          <span className="text-gray-400">Created : </span>
          <span className="text-gray-500">12-12-2021 12:12:12 PM</span>
        </p>
      </div>
    </div>
  );
}
