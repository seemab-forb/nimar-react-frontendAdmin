import type { UserDetailType } from "../API/ResponseTypes/useLoginUser.types";



export type UserStateMethods = {
  setUser: (user: UserDetailType) => void;
  clearUser: () => void;
  updateAccessToken: (accessToken: string) => void;
  setConsumedStorage: (consumedStorage: number) => void;
  setAllocatedStorage: (allocatedStorage: number) => void;
  syncConsumedStorage: () => void;
};



export type UserStateType = UserDetailType & UserStateMethods;
