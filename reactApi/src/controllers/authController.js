const crypto = require('crypto')
const jwt = require("jsonwebtoken");

const User = require('../models/User')

module.exports = {
    login: async(req, res) => {
        var { email, password } = req.body;
        
        
        if (!email || !password) {
            return res.status(404).json({
                status: 'error',
                errors: 'incomplete_fields',
            });
        }
        email = email.toLowerCase()

        return User.findOne({ email })
                    .populate({
                        path: 'movements'
                    })
                        .then(user=>{
                            if (!user) {
                                return res.send({ 'status': 'error', 'error': 'Email inexistente.' })
                            }

                            return crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                                const encryptedPass = key.toString('base64')
                                if (user.password != encryptedPass) {
                                    return res.send({ 'status': 'error', 'msg': 'password_error' })
                                }

                                movementsFiltered = []

                                user.movements.map(operation => {
                                    filteredOperation = {
                                        _id: operation._id,
                                        concept: operation.concept,
                                        amount: operation.amount,
                                        type: operation.type,
                                        date: JSON.stringify(operation.date).slice(1,11),
                                        createdAt: operation.createdAt
                                    }
                                    movementsFiltered.push(filteredOperation)
                                })

                                var userFiltered = {
                                    _id: user._id,
                                    email: user.email,
                                    movements: movementsFiltered,
                                    role: user.role
                                }

                                
                                return signToken(user)
                                .then(token => {
                                    userFiltered = {
                                        ...userFiltered,
                                        token
                                    };
                                    return res.header("auth-token", token)
                                        .json({
                                            status: 'ok',
                                            user:JSON.stringify(userFiltered),
                                        });
                                    })
                            })
                        })
    },

    register: async(req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(404).json({
                    status: 'error',
                    errors: 'incomplete_fields',
                });
            }

            return registerUser(email, password, (created) => {
                if (!created) {
                    return res.status(404).json({
                        status: 'error',
                        errors: 'user_not_created',
                    });
                }

                return res.json({
                    status: 'ok'
                });
            })

        } catch (error) {
            console.log(`%c ${error}`, "background: #222; color: #bada55");
            return res.status(404).json({
                status: 'error',
                errors: 'internal_error',
            });
        }
    },
};

async function registerUser(email, password, callback) {
    email = email.toLowerCase()

    return crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        return crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPass = key.toString('base64')
            return User.findOne({ email })
                .exec()
                .then(user => {
                    if (user) {
                        return callback(false)
                    }
                    return createUser({ email, password: encryptedPass, salt: newSalt })
                        .then(
                            created => {
                                return callback(created)
                            }
                        )
                        .catch(err => {
                            return callback(false)
                        })
                })
                .catch(err => {
                    return false
                })
        })
    })
}

async function createUser(user) {
    try {
        let newUser = new User(user)
        let userSaved = await newUser.save()
        return true
    } catch {
        return false
    }
}

async function signToken(user) {
    var token;
    token = await jwt.sign({ user }, process.env.TOKEN_SECRET)
    return token
}
