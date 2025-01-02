import { twMerge } from "tailwind-merge";
import useStorageUtils from "../../hooks/useStorageUtils";

function ThreeValProgressBar({
  usersConsumedSpace,
  allocatedToUsersSpace,
  totalAllocatedSpace,
}: {
  usersConsumedSpace: number;
  allocatedToUsersSpace: number;
  totalAllocatedSpace: number;
}) {
  const { formatFileSize } = useStorageUtils();
  return (
    <div>
      <div className="text-[8px] 2xl:text-xs flex justify-between">
        <p>{formatFileSize(usersConsumedSpace) || 0}</p>

        <p>{formatFileSize(allocatedToUsersSpace) || 0}</p>

        <p>{formatFileSize(totalAllocatedSpace) || 0}</p>
      </div>
      <div>
        <div className="w-full max-w-[250px] h-2 bg-gray-300 mx-auto my-1 rounded-full overflow-hidden relative">
          <div
            className={twMerge(
              "bg-green-500 absolute inset-y-0",
              usersConsumedSpace > totalAllocatedSpace * 0.9 && "bg-red-500"
            )}
            style={{
              left: 0,
              right: `${
                100 - (allocatedToUsersSpace / totalAllocatedSpace) * 100
              }%`,
            }}
          />
          <div
            className={twMerge("bg-yellow-500 absolute inset-y-0")}
            style={{
              left: 0,
              right: `${
                100 - (usersConsumedSpace / totalAllocatedSpace) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default ThreeValProgressBar;
