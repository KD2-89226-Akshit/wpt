const express = require('express')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const pool = require('../db/db')
const result = require('../utils')
const config = require('../config')
const router = express.Router()


router.post('/',(req,res)=>{
    const {propertyId, total,fromDate,toDate} = req.body
    const sql = `insert into bookings(userId, propertyId,total,fromDate,toDate) values(?, ?,?,?,?)`
    pool.query(sql,[req.headers.id, propertyId,total,fromDate,toDate],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.get('/',(req,res)=>{
    const sql =`select * from bookings`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports = router