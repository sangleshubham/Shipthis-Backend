import { Router } from "express";
import { getHello,getMovies, login, register } from "../controller/controller.js";

let route = Router()

// authentication

route.get('/login' , login)
route.post('/register', register)


// API
route.get('/',getHello)

route.get('/movies', getMovies)


export default route
