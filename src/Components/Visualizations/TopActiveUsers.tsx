import useTopActiveConsumers from "../../API/useTop10ActiveConsumers";
import { UserProfile } from "./TopStorageConsumers";

export default function TopActiveUsers() {
  const { data, isError, isLoading } = useTopActiveConsumers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-gray-300 h-96 animate-pulse rounded-xl">
        <p>Top active users</p>
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
    <div className="w-full px-3 py-3 bg-white shadow-lg rounded-xl">
      <div className="">
        <p className="font-medium">Top Active Users</p>
      </div>
      {data?.map((user, index) => {
        const { username, department, noOfPosts, UUID } = user;
        return (
          <div
            className="flex items-center justify-between w-full py-3 h-fit"
            key={`storageTop-${UUID}`}
          >
            <UserProfile
              SrNo={index + 1}
              username={username}
              department={department}
            />
            <div className="flex items-center justify-center px-3 py-1 text-xs bg-gray-100 2xl:text-sm rounded-xl whitespace-nowrap">
              {noOfPosts} Posts
            </div>
          </div>
        );
      })}
    </div>
  );
}
