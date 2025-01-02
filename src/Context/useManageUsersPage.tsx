import { create } from "zustand";

export enum CreateUserModalModeType {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

type UserManageUsersPageType = {
  isUsersModalOpen: boolean;
  setUsersModalOpen: (isOpen: boolean) => void;
  toggleIsUsersModalOpen: () => void;
  userId: number | null;
  setUserId: (id: number | null) => void;
  createUserModalMode: CreateUserModalModeType;
  setCreateUserModalMode: (mode: CreateUserModalModeType) => void;
};

const useManageUsersPage = create<UserManageUsersPageType>()((set) => ({
  isUsersModalOpen: false,
  setUsersModalOpen: (isOpen) => set(() => ({ isUsersModalOpen: isOpen })),
  toggleIsUsersModalOpen: () =>
    set((state) => ({ isUsersModalOpen: !state.isUsersModalOpen })),
  userId: null,
  setUserId: (id) => set(() => ({ userId: id })),
  createUserModalMode: CreateUserModalModeType.CREATE,
  setCreateUserModalMode: (mode) => set(() => ({ createUserModalMode: mode })),
}));

export default useManageUsersPage;
