import { twMerge } from "tailwind-merge";
import {
  CircleDepartmentsDataType,
  CircleMembersDataType,
} from "../../API/ResponseTypes/useGetAllCircles.types";
import { getCircleColor, verifyResourceUrl } from "../../Utils/helpers";
import { PieChart } from "react-minimal-pie-chart";
import facebook from "../../assets/facebook_default.jpg";

function ResponsiveCircle({
  departmentsData = [],
  circleUsersData = [],
  circleMembersCount = 0,
  circleDepartmentsCount = 0,
  isAdmin,
  isContributor,
}: {
  departmentsData: Array<CircleDepartmentsDataType>;
  circleUsersData: Array<CircleMembersDataType>;
  circleMembersCount: number;
  circleDepartmentsCount: number;
  isAdmin: boolean;
  isContributor: boolean;
}) {
  return (
    <div
      className={twMerge(
        "relative w-[80px] aspect-square",
        isContributor && "border-2 border-blue-500 rounded-full",
        isAdmin && " border-red-500"
      )}
    >
      <PieChart
        data={departmentsData.map(
          (department: CircleDepartmentsDataType, index) => {
            const { departmentAbbreviation } = department;
            return {
              title: departmentAbbreviation,
              value: 1,
              color: getCircleColor(index),
            };
          }
        )}
        radius={50}
        lengthAngle={360}
        lineWidth={20}
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          fontSize: "20%",
          fill: "#f1f1f1",
        }}
        labelPosition={90}
      />

      <svg
        width="100%"
        height="100%"
        viewBox="-100 -100 200 200"
        className="absolute inset-0"
      >
        <title>
          {circleMembersCount} Users, {circleDepartmentsCount} Departments
        </title>
        <circle cx="0" cy="0" r={30} className="fill-blue-500" />
        {/* 2 texts */}
        <text
          x="0"
          y="-9"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fill="white"
        >
          {circleMembersCount} Users
        </text>
        <text
          x="0"
          y="9"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fill="white"
        >
          {circleDepartmentsCount} Deps
        </text>
        {circleUsersData.slice(0, 7).map((_, index) => {
          const angle = (360 / 7) * index;
          const x = Math.cos((angle * Math.PI) / 180) * 55;
          const y = Math.sin((angle * Math.PI) / 180) * 55;

          return (
            <clipPath
              id={`myClip${index}`}
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
            >
              <circle cx={x} cy={y} r={20} fill={getCircleColor(index)} />
            </clipPath>
          );
        })}
        {/* an array of images for picsum exactly on each circle from previous array */}
        {circleUsersData.slice(0, 7).map((member, index) => {
          const angle = (360 / 7) * index;
          const x = Math.cos((angle * Math.PI) / 180) * 55;
          const y = Math.sin((angle * Math.PI) / 180) * 55;

          const { profilePic: profile_pic } = member;

          return (
            <image
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              href={verifyResourceUrl(profile_pic, facebook)}
              x={x - 20}
              y={y - 20}
              width="40"
              clipPath={`url(#myClip${index})`}
              //   height="40"
            />
          );
        })}
      </svg>
    </div>
  );
}
export default ResponsiveCircle;
