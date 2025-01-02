function DepartmentTableHeader() {
  return (
    <thead className="relative">
      <tr>
        <th>Logo</th>
        <th className="py-3">Department Name</th>
        <th>Department Head</th>
        <th>Allocated Storage</th>
        <th>Users</th>
        <th>Groups</th>
        <th>Circles</th>
        <th>Created</th>
        <th>Edit</th>
      </tr>
      {/* because i was unable to apply rounded borders on <tr> */}
      <tr className="absolute inset-0 border border-gray-500 rounded-lg" />
    </thead>
  );
}
export default DepartmentTableHeader;
