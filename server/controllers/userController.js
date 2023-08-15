const bcrypt = require('bcrypt');
const {User} = require('../models/model');
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

const generateJwt = (id, email) => {
    return jwt.sign({id, email}, "SECRET_KEY", {
        expiresIn: '24h'
    })
}

class UserController {
    async registration(req, res, next) {
        const {email, name, password} = req.body;

        if(!email || !password) {
            return next("Unccorect email or password")
        }
        const candidate = await User.findOne({where: {email}});
        if(candidate) {
            return next(ApiError.badRequest("There is already a user with this email"))
        }
        const hashPass = await bcrypt.hash(password, 5);
        let date = new Date();
        let currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const user = await User.create({email, name, password: hashPass, registration: currentDate});
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.internal("User is not found"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) {
            return next(ApiError.internal("You input unccorect password"))
        }
        if(user.block === 'Block') {
            return next(ApiError.internal("You are blocked"))
        }
        let date = new Date();
        let currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        await User.update({authorization: currentDate}, {where: {email: email}})
        const token = generateJwt(user.id, user.email)
        return res.json({token});
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }
}

module.exports = new UserController();