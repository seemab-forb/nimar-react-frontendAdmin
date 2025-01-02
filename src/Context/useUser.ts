import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { refreshTokenKey } from "../Utils/constants";
import type { UserStateType } from "./useUser.types";
import type { UserDetailType } from "../API/ResponseTypes/useLoginUser.types";



export const initialUserState: UserDetailType = {
  userType: null,
  profilePic: "",
  firstLogin: false,
  UUID: 0,
  username: "",
  firstName: "",
  lastName: "",
  lastLogin: "",
  email: "",
  accessToken: "",
  refreshToken: localStorage.getItem(refreshTokenKey) || "",
  allocatedStorage: 0,
  consumedStorage: 0,
  userPermissions: [],
  userGroups: [],
  userCircles: [],
  userDepartment: {
    logo: "",
    departmentName: "",
    departmentId: 0,
    departmentAbbreviation: "",
  },
  postsCount: 0,
};





export const useUser = create<UserStateType>((set) => ({

  ...initialUserState,


  setUser: (useProperties) => {
    set({ ...useProperties });
  },

  clearUser: () => {
    localStorage.removeItem(refreshTokenKey);

    set({
      ...initialUserState,
      refreshToken: "",
    });
  },

  updateAccessToken(accessToken) { set({ accessToken }); },
  setAllocatedStorage(allocatedStorage) { set({ allocatedStorage }); },
  setConsumedStorage(consumedStorage) { set({ consumedStorage }); },
  syncConsumedStorage() {
    console.log("nothing");
  },
}));




if (import.meta.env.DEV) {
  mountStoreDevtool("UserAuthHook", useUser);
}
