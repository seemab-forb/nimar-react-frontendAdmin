import {
  GetAllUsersApiResponseSchema,
  type SingleUserType,
} from "../../../API/ResponseTypes/GetAllUsersApi";
import { useGetAllUsers } from "../../../API/useGetAllUsers";
import ErrorPrimary from "../../SharedComponents/ErrorPrimary";
import LoadingPrimary from "../../SharedComponents/LoadingPrimary";
import UsersTableBody from "./UsersTableBody";
import UsersTableHeader from "./UsersTableHeader";

function UsersTableBasic({
  query,
}: {
  query: string;
  setQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { data, isLoading, isError } = useGetAllUsers();

  if (isLoading)
    return (
      <div className="mt-10">
        <LoadingPrimary />
      </div>
    );

  if (isError)
    return (
      <div className="mt-10">
        <ErrorPrimary />
      </div>
    );

  GetAllUsersApiResponseSchema.parse({ data });

  let users: SingleUserType[] = [];

  if (data && query === "") {
    users = data;
  }

  if (data && query !== "") {
    users = data.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <div
      // padding-right for giving space for scrollbar
      className="w-full h-full pr-3 mt-3 overflow-auto"
      style={{
        scrollbarWidth: "thin",
      }}
    >
      <table className="w-[1200px] xl:w-full text-sm 2xl:text-base ">
        <UsersTableHeader />
        <UsersTableBody tableData={users} />
      </table>
    </div>
  );
}
export default UsersTableBasic;
