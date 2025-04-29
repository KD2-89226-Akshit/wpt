const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')
const userRouter = require('./routes/user')
const propertyRouter = require('./routes/property')
const bookingRouter = require('./routes/Booking')
const categoryRouter = require('./routes/category')


const app = express()

app.use(express.json())

app.use(cors())
app.use((request , response,next)=>{
    if(
        request.url === '/users/login' ||
        request.url === '/users/registration' ||
        request.url.startsWith('/image')
    ){
        next()
    }
    else{
        //const authToken = request.headers
        const token = request.headers.token
        //const token = authtoken.split(' ')[1];
        //console.log("$", token);
        const payload = jwt.verify(token, config.secret);
        request.headers.id = payload.id;
        next();
    }
})


app.use('/users',userRouter)

app.use('/property',propertyRouter)

app.use('/category',categoryRouter)
app.use('/booking',bookingRouter)

app.listen(4000,'localhost',()=>{
    console.log('server started on port 4000')
})