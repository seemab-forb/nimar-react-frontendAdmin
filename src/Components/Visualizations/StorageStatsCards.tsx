import { TbDatabase } from "react-icons/tb";
import useStorageUtils from "../../hooks/useStorageUtils";
import { useUser } from "../../Context/useUser";
import useGetConsumedStorage from "../../API/useGetConsumedStorage";

function StorageStatsCards() {
  const { formatFileSize } = useStorageUtils();
  const { allocatedStorage, consumedStorage } = useUser();
  const { data } = useGetConsumedStorage();

  return (
    <div className="grid w-full h-full grid-cols-2 gap-4 xl:grid-cols-3">
      <StatCard title="Storage" mainText={formatFileSize(allocatedStorage)} />
      <StatCard
        title="Allocated"
        mainText={formatFileSize(consumedStorage)}
        chipText={formatFileSize(180000000000 - consumedStorage)}
      />
      <StatCard
        title="Consumed"
        mainText={formatFileSize(data?.data.consumedStorage ?? 0)}
        chipText={formatFileSize(
          consumedStorage - (data?.data.consumedStorage ?? 0)
        )}
      />
    </div>
  );
}
export default StorageStatsCards;

function StatCard(props: {
  title: string;
  mainText: string;
  chipText?: string;
}) {
  const { title, mainText, chipText } = props;
  return (
    <div className="bg-white w-full h-full grid grid-cols-[auto_1fr] py-6 px-3 gap-2 rounded-xl shadow-lg">
      <div className="flex items-center justify-center p-0.5 xl:p-2.5 rounded-md 2xl:p-3 bg-gradient-to-br from-blue-500 to-blue-300 aspect-square">
        <TbDatabase className="text-xl text-white 2xl:text-2xl" />
      </div>
      <div className="flex flex-col justify-end">
        <h2 className="text-xs text-gray-400 2xl:text-sm">{title}</h2>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-400 2xl:text-xl">
            {mainText}
          </p>
          <span className="px-2 text-xs text-green-700 bg-green-100 rounded-full 2xl:text-sm ">
            {chipText}
          </span>
        </div>
      </div>
    </div>
  );
}
