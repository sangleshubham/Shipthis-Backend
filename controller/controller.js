
import movieModel from "../models/movieModel.js"

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
