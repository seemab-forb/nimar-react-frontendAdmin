import { useGetAllUsers } from "../../../API/useGetAllUsers";
import { useEffect, useState } from "react";
import { filterUsers } from "../../../Utils/helpers";
import InputFieldPrimary from "../../Primitives/InputFieldPrimary";
import type { SingleUserType } from "../../../API/ResponseTypes/GetAllUsersApi";

function ExistingUser() {
  const { data, isLoading, error } = useGetAllUsers();
  const [users, setUsers] = useState<Array<SingleUserType>>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (data) {
      // TODO: why is this needed? data?.data?.users is already a state variable
      setUsers(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading Users...</div>;
  }

  if (error) {
    return <div></div>;
  }

  return (
    <div>
      <div className="w-[300px]">
        <InputFieldPrimary
          type="text"
          name="searchUser"
          id="searchUser"
          placeholder="Search User"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="py-3 my-3 border-y">
        <table className="w-full">
          <TableHeader />
          <TableBody tableData={filterUsers(users, searchQuery)} />
        </table>
      </div>
    </div>
  );
}
export default ExistingUser;

function TableHeader() {
  return (
    <thead className="border border-gray-500 ">
      <tr>
        <th className="" />
        <th className="py-3">UID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
      </tr>
    </thead>
  );
}

function TableBody({ tableData = [] }: { tableData: Array<SingleUserType> }) {
  return (
    <tbody className="">
      {tableData.map((user) => {
        // TODO : type defination
        const { UUID, username, email } = user;
        return (
          <tr key={user.UUID} className="text-center">
            <td>
              <input type="radio" name="adminUser" id="adminUser" />
            </td>
            <td>{UUID}</td>
            <td>{username}</td>
            <td className="py-3">{email}</td>
            <td>departmentAdmin</td>
          </tr>
        );
      })}
    </tbody>
  );
}
