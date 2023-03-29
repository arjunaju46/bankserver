// import express and store in a variable 
const express = require("express")


// import data service 

const ds = require('./service/dataservice')

// import jswt
const jwt=require("jsonwebtoken")




// app creation 
const app = express()

// to convert all datas from json to js
app.use(express.json())


// middileware creation

const jwtMiddileware=(req,res,next)=>{
// access data from req body
const token=req.headers['token']
try{

// verify the token with secret key
const data=jwt.verify(token,"aju123")
next()
}
catch{
    res.status(422).json({
        staus: false,
        message: "please login",
        statuscode: 404
    
    })

}
}



// register post

app.post("/register", (req, res) => {
    const result = ds.register(req.body.acno, req.body.uname, req.body.psw)
res.status(result.statuscode).json(result)

})

app.post("/login", (req, res) => {
    const result = ds.login(req.body.acno,req.body.psw)
res.status(result.statuscode).json(result)

})


app.post("/deposit",jwtMiddileware, (req, res) => {
    const result = ds.deposit(req.body.acno,req.body.psw,req.body.amnt)
res.status(result.statuscode).json(result)

})

app.post("/withdrew",jwtMiddileware, (req, res) => {
    const result = ds.withdrew(req.body.acno,req.body.psw,req.body.amnt)
res.status(result.statuscode).json(result)

})

app.get("/transaction",jwtMiddileware, (req, res) => {
    const result = ds.getTransaction(req.body.acno)
res.status(result.statuscode).json(result)

})









// register post
// login    get 
// deposit   patch
// withdrew  patch
// transation  get
// delete    delete







// resolve api

// app.get("/",(req,res)=>{
//     res.send('get method working.....')
// })

// app.post("/",(req,res)=>{
//     res.send('get method working.....')
// })
// app.put("/",(req,res)=>{
//     res.send('get method working.....')
// })
// app.patch("/",(req,res)=>{
//     res.send('get method working.....')
// })
// app.delete("/",(req,res)=>{
//     res.send('get method working.....')
// })






// port set

app.listen(3000, () => {
    console.log("server start at 3000");
})
