export interface LoginFormValues {
    email: string;
    password: string;
}

export interface RegisterFormValues {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserState {
    username: string;
    password: string;
    rePassword: string;
    isLogin: boolean;
    role: string;
    accountType: string;
}
