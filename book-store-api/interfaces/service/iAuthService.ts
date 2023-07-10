import { ILoginForm, ITokenResource, IUser, IUserResource } from "../model";

interface IAuthService {
    login(data: ILoginForm): Promise<ITokenResource>;
    register(data: IUser): Promise<IUserResource>;
    getAccessToken(data: any): Promise<ITokenResource>;
    logout(data: any): Promise<void>;
}

export default IAuthService;