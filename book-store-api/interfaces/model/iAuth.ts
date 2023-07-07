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
    }
}

interface IGetTokenForm {
    refresh_token: string;
}

export { ILoginForm, ITokenResource, IGetTokenForm };