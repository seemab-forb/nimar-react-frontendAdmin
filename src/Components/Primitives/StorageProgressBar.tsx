import { twMerge } from "tailwind-merge";
import useStorageUtils from "../../hooks/useStorageUtils";

function StorageProgressBar({
  consumedSpace,
  allocatedSpace,
}: {
  consumedSpace: number;
  allocatedSpace: number;
}) {
  const { formatFileSize } = useStorageUtils();
  return (
    <div>
      <div>
        {formatFileSize(consumedSpace) || 0}
        <span className="text-xs"> of </span>
        {formatFileSize(allocatedSpace) || 0}
      </div>
      <div>
        <div className="w-full max-w-[250px] h-2 bg-gray-300 mx-auto my-1 rounded-full overflow-hidden">
          <div
            className={twMerge(
              "bg-green-500 w-full h-full",
              consumedSpace > allocatedSpace * 0.9 && "bg-red-500"
            )}
            style={{
              width: `${(consumedSpace / allocatedSpace) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default StorageProgressBar;
