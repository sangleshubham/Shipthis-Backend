import { Router } from "express";
import { getHello,getMovies } from "../controller/controller.js";

let route = Router()

// authentication

route.get('/login' , async (req, res)=> {
    res.send({
        message : "Login"
    })
})
route.post('/register', async (req, res)=> {
    res.send({
        message : "Register"
    })
})


// API
route.get('/',getHello)

route.get('/movies', getMovies)


export default route
