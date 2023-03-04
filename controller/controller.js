
import movieModel from "../models/movieModel.js"
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js"

// controllers
export async function getHello(req, res){
    return res.send({
        message : "Service is up"
    })
}

export async function getMovies(req, res) {
    movieModel.findOne().then((record)=> {
        console.log("record is ", record)
    })




}



export async function login (req, res){


    res.send({
        message : "Login"
    })
}

export async function register (req, res){

    let username = req.body.username
    let password = req.body.password
    let age = req.body.age
    console.log(username , password, age)
    try{

        const userData = await userModel.create({username , password, age})

        console.log(userData)
        
        res.send({
            message : "Success"
        })
    }
    catch(e) {
        console.log(e.message)

        res.send({
            message : "Failed"
        })
    }

}



