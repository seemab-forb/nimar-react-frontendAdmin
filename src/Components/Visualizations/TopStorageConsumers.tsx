import useTop10StorageConsumers from "../../API/useTop10StorageConsumers";
import useStorageUtils from "../../hooks/useStorageUtils";

export default function TopStorageConsumers() {
  const { data, isError, isLoading } = useTop10StorageConsumers();
  const { formatFileSize } = useStorageUtils();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-gray-300 h-96 animate-pulse rounded-xl">
        <p>Top storage consumers</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-gray-300 h-96 animate-pulse rounded-xl">
        <p></p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-3 bg-white shadow-lg rounded-xl ">
      <div className="">
        <p className="font-medium">Top Storage Consumers</p>
      </div>
      {data?.map((user, index) => {
        const { username, department, consumedStorage, UUID } = user;
        return (
          <div
            className="flex items-center justify-between w-full py-3 h-fit"
            key={`activeUser-${UUID}`}
          >
            <UserProfile
              SrNo={index + 1}
              username={username}
              department={department}
            />
            <div className="flex items-center justify-center px-3 py-1 text-xs bg-gray-100 2xl:text-sm rounded-xl whitespace-nowrap">
              {formatFileSize(consumedStorage)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function UserProfile({
  SrNo,
  username,
  department,
}: {
  SrNo: number;
  username: string;
  department: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-6 p-0.5 font-medium text-white bg-blue-500 rounded-full aspect-square text-sm ">
        {SrNo}
      </div>
      <div>
        <p className="text-sm text-gray-500 2xl:text-base">{username}</p>
        <p className="text-[10px] text-gray-500 2xl:text-xs">{department}</p>
      </div>
    </div>
  );
}
