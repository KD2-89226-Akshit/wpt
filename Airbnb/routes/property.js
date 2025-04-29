const express = require('express')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const pool = require('../db/db')
const result = require('../utils')
const config = require('../config')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'images'})
router.post('/',upload.single('icon'),(req , res)=>{
    

    const {categoryId , title, details, address,contactNo,ownerName, isLakeView, isTV ,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent} = req.body
    const sql =`INSERT INTO property(categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent,profileImage) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    pool.query(sql,[categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent,req.file.filename],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

router.get('/',(req, res)=>{
    const sql = `SELECT id, title,details,rent,profileImage FROM property`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})



module.exports = router