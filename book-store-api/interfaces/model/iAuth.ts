declare module "jsonwebtoken" {
    export interface JwtPayload {
        is_admin: boolean;
    }
}

interface ILoginForm {
    email: string;
    password: string;
}

interface ITokenResource {
    data: null | {
        access_token: string | null;
        refresh_token: string | null;
    },
    user?: string;
    role?: boolean;
}
interface IToken {
    refresh_token: string;
    expires_in: Date;
}

export { ILoginForm, ITokenResource, IToken };