import { IGetTokenForm, ILoginForm, ITokenResource, IUser, IUserResource } from "../model";

interface IAuthService {
    login(data: ILoginForm): Promise<ITokenResource>;
    register(data: IUser): Promise<IUserResource>;
    getAccessToken(data: IGetTokenForm): Promise<ITokenResource>;
}

export default IAuthService;