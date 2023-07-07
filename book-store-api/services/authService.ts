import { injectable } from 'inversify';
import { IAuthService } from '../interfaces/service';
import { Token, User } from '../models';
import { ILoginForm, ITokenResource, IGetTokenForm, IUser, IUserResource } from '../interfaces/model';

import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import BaseService from './baseService';

@injectable()
class AuthService extends BaseService implements IAuthService {

    constructor() {
        super();
    }

    async login(data: ILoginForm): Promise<ITokenResource> {
        try {
            let user = await User.findOne({ 'email': data.email });
            if (!user || !await bcrypt.compare(data.password, user.password)) {
                return { data: null };
            }
            let payload = { sub: user.id, is_admin: user.is_admin };
            let accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN as string, { expiresIn: '10m' });
            let refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH_TOKEN as string);
            await Token.create({ refresh_token: refreshToken });
            return { data: { access_token: accessToken, refresh_token: refreshToken } };
        } catch (error) {
            throw error;
        }
    }

    async register(data: IUser): Promise<IUserResource> {
        try {
            if (!await this.checkUniqueTrue(User, 'email', data.email)) {
                return ({ data: null });
            }
            let salt = 10;
            let newUser = await User.create({
                ...data, salt, is_admin: false, password: await bcrypt.hash(data.password, salt)
            });
            return { data: newUser };
        } catch (error) {
            throw error;
        }
    }

    async getAccessToken(data: IGetTokenForm): Promise<ITokenResource> {
        try {
            let { refresh_token } = data;
            let checkToken = await Token.findOne({ refresh_token });
            let tokenData = checkToken ? jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN as string) as JwtPayload : null;
            let accessToken = tokenData ? jwt.sign({ sub: tokenData.sub, is_admin: tokenData.is_admin }, process.env.JWT_SECRET_ACCESS_TOKEN as string, { expiresIn: '20m' }) : null;
            return { data: accessToken ? { access_token: accessToken, refresh_token } : null };
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;