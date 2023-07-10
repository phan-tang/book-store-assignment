interface LoginData {
    access_token: string;
    user: string;
}

interface TokenData {
    access_token: string;
}

interface LogoutData {
    message: string;
}

export { LoginData, TokenData, LogoutData }