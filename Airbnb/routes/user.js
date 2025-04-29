const express = require('express')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const pool = require('../db/db')
const result = require('../utils')
const config = require('../config')
const router = express.Router()

router.post('/registration', (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body
    const encryptedPassword = cryptoJs.SHA256(password).toString()
    const sql = `INSERT INTO user(firstName,lastName,email,password,phoneNumber) VALUES(?,?,?,?,?) `
    pool.query(sql, [firstName, lastName, email, encryptedPassword, phone], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const encryptedPassword = cryptoJs.SHA256(password).toString()
    const sql = `SELECT * FROM user WHERE email =? AND password=?;`
    pool.query(sql, [email, encryptedPassword], (error, data) => {
        console.log(data)
        if (data) {

            if (data.length != 0) {
                const user = data[0]
                const payload = {
                    id: user.id
                }
                const token = jwt.sign(payload, config.secret).toString();
                const userData = {
                    name: user.name,
                    email: user.email,
                    token: token
                }
                res.send(result.createSuccessResult(userData))
            }
            else
                res.send(result.createErrorResult('Invalid email or password'))
        } else
            res.send(result.createErrorResult(error))
    })
})

router.get('/profile', (req, res) => {
    const sql = `SELECT firstName,lastName,phoneNumber, email FROM user WHERE id = ?`
    pool.query(sql, req.headers.id, (error, data) => {
        res.send(result.createResult(error, data))
    })
})


router.put('/profile', (req, res) => {
    const { firstName, lastName, phone } = req.body
    id = req.headers.id
    const sql = `UPDATE user set firstName=? , lastName=? , phoneNumber=? where id =?`
    pool.query(sql, [firstName, lastName, phone,req.headers.id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})



module.exports = router