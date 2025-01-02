import {
  CircleDepartmentsDataType,
  CircleMembersDataType,
} from "../../API/ResponseTypes/useGetAllCircles.types";
import ResponsiveCircle from "./ResponsiveCircle";

function CircleWithName({
  selectedCircleName,
  selectedCircleMembersData,
  selectedCircleDepartmentsData,
  isContributor,
  isAdmin,
}: {
  selectedCircleName: string;
  selectedCircleMembersData: Array<CircleMembersDataType>;
  selectedCircleDepartmentsData: Array<CircleDepartmentsDataType>;
  isContributor: boolean;
  isAdmin: boolean;
}) {
  return (
    <div className="">
      <div className="w-full">
        <ResponsiveCircle
          departmentsData={selectedCircleDepartmentsData}
          circleUsersData={selectedCircleMembersData}
          circleMembersCount={selectedCircleMembersData.length}
          circleDepartmentsCount={selectedCircleDepartmentsData.length}
          isAdmin={isAdmin}
          isContributor={isContributor}
        />
      </div>
      <p
        className="overflow-hidden text-xs font-semibold text-center 2xl:text-base line-clamp-1"
        title={selectedCircleName}
      >
        {selectedCircleName}
      </p>
    </div>
  );
}
export default CircleWithName;
