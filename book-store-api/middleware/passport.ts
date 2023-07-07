import passport from "passport";
import passportJwt from "passport-jwt";
import { mongoose } from '../config/database';
import { User } from "../models";

let ExtractJwt = passportJwt.ExtractJwt;
let JwtStrategy = passportJwt.Strategy;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: '55edc224f5617ffaf1c530048993a48be675aa417a5586ddaa90059b2808238a'
}

passport.use(new JwtStrategy(options, function (payload, done) {
    let user = mongoose.isObjectIdOrHexString(payload.sub) ? User.findById(payload.sub) : null;
    return user ? done(null, user) : done(null, false);
}));

export { passport };