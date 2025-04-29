const express = require('express')
const db = require('../db/db')
const pool= require('../db/db')
const utils = require('../utils')

const multer = require('multer')

const upload = multer({dest: 'images' })

const router = express.Router()

router.get('/:image',(req , res)=>{
    const img = req.params.image
    const sql = `SELECT id,title,details,image from category WHERE image = ?;`
    pool.query(sql,[img],(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})

router.post('/',upload.single('icon'),(req,res)=>{
    const {title, details } = req.body
    const fileName = req.file.filename
    const sql = `INSERT INTO category(title,details,image) VALUES(?,?,?)`
    pool.execute(sql,[title,details,fileName],(error,data)=>{
        res.send(utils.createResult(error,data))
    })
})

module.exports = router