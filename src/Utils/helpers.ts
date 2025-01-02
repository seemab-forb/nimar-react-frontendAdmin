import type { SingleUserType } from "../API/ResponseTypes/GetAllUsersApi";
import type { SingleDepartmentType } from "../API/ResponseTypes/getAllDepartmentsApi";
import { baseUrlFileAccess } from "../API/constants";
import { useManageDepartmentsPage } from "../Context/useManageDepartmentsPage";
import { useUser } from "../Context/useUser";
import { refreshTokenKey } from "./constants";

export const handleNavlink = ({ isActive }: { isActive: boolean }) =>
  `block hover:text-white pb-3 ${
    isActive ? "text-white font-semibold tracking-wider" : "text-gray-400"
  }`;

// TODO: type defination
export const filterUsers = (
  // TODO: type it with response type
  users: Array<SingleUserType>,
  query: string
) => {
  return users.filter((user) => {
    // const userFullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const userName = user.username;
    const email = user.email;
    return (
      userName.includes(query.toLowerCase()) ||
      email.includes(query.toLowerCase())
    );
  });
};

export const filterDepartments = (
  // TODO: type it with response type
  departments: Array<SingleDepartmentType>,
  query: string
) => {
  const tempFilteredDepartments = departments?.filter((department) => {
    const departmentName = department.departmentName?.toLowerCase();
    const adminFirstName = department.adminFirstName?.toLowerCase();
    const adminLastName = department.adminLastName?.toLowerCase();

    return (
      departmentName?.includes(query.toLowerCase()) ||
      adminFirstName?.includes(query.toLowerCase()) ||
      adminLastName?.includes(query.toLowerCase())
    );
  });

  return tempFilteredDepartments;
};

export function clearAppState() {
  useUser.getState().clearUser();
  useManageDepartmentsPage.getState().clearState();
  localStorage.removeItem(refreshTokenKey);
}

export function getCircleColor(index: number) {
  // const color =
  //   circleColorPalette[Math.floor(Math.random() * circleColorPalette.length)];

  const colors = [
    "#4c516d",
    "#7285a5",
    "#4f96a3",
    "#b0dfe5",
    "#007bb8",
    "#008080",
    "#1c05b3",
    "#0438f2",
    "#00308f",
    "#004f98",
    "#0b6623",
    "#043927",
    "#708238",
    "#4b5320",
    "#b43757",
    "#9966cb",
    "#8d4585",
    "#702963",
    "#311432",
    "#784b84",
  ];

  return colors[index % colors.length];
}

export function verifyResourceUrl(url: string, fallback: string) {
  if (url) {
    return `${baseUrlFileAccess}media/${url}`;
  }

  return fallback;
}
