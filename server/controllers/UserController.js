const {User} = require('../models/models')
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const generateJwt = (id, username, role) => {
    return jwt.sign(
        {id, username, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next){
        
            const{username, password, role} = req.body
            if(!username || !password) {
                return next(ApiError.badRequest('Incorrect e-mail or password'))
            }
            const candidate = await User.findOne({where: {username}}) //есть ли пользователь с таким e-mail?
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5) //если candidate не сработал(т.е такого пользователя нет), хешируем пароль из req.body и создаём нового юзера
            const user = await User.create({username, role, password: hashPassword})
            const token = generateJwt(user.id, user.username, user.role)
    
            return res.json({token}) //возвращаем на клиент
        
    }

    async login(req, res, next){
        const {username, password} = req.body
        const user = await User.findOne({where: {username}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password) //сравниваем хеш введёного пароля с хешем пароля юзера в БД
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.username, user.role)
        return res.json({token})
    }

    async check(req, res){
        const token = generateJwt(req.user.id, req.user.username, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()