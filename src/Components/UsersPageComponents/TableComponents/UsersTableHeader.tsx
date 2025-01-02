import { useUser } from "../../../Context/useUser";

function UsersTableHeader() {
  const { userType } = useUser();
  return (
    <thead className="relative">
      <tr className="">
        <th className="" />
        <th className="py-3">Full Name</th>
        <th>Allocated Storage</th>
        <th>Email</th>
        <th>Groups</th>
        <th>Circles</th>
        {userType === "admin" && <th>Edit</th>}
      </tr>
      {/* because i was unable to apply rounded borders on <tr> */}
      <tr className="absolute inset-0 border border-gray-500 rounded-lg" />
    </thead>
  );
}
export default UsersTableHeader;
