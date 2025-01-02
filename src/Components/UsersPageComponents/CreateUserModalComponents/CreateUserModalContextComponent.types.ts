export type UserDetailsType = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
};

export type CreateUserModalContextType = {
    userDetails: UserDetailsType;
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetailsType>>;
    allocatedStorage: {
        assigned: number;
        total: number;
    };
    setAllocatedStorage: React.Dispatch<
        React.SetStateAction<{
            assigned: number;
            total: number;
        }>

    >;
    thisUserConsumedStorage: number;
};