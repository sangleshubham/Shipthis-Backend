import { Router } from "express";
import { getHello,getMovies, register } from "../controller/controller.js";
import passport from "passport"
import initialize from '../passportConfig.js'
import userModel from '../models/userModel.js'
import {checkAuthetication, checkNotAuthenticated} from '../middleware/authMiddlewere.js'


async function gerUserByEmail(username)
{
    return await userModel.findOne({username })
}
async function gerUserByID(id){
    return await userModel.findOne({_id : id})
}

initialize(passport, gerUserByEmail, gerUserByID)

let route = Router()

// authentication

route.post('/login',checkNotAuthenticated, passport.authenticate('local', {successRedirect : '/' , failureRedirect : '/login'}) , getHello)
route.post('/register', checkNotAuthenticated, register)


// API
route.get('/', checkAuthetication , getHello)

route.get('/movies' , checkAuthetication,  getMovies)


export default route
