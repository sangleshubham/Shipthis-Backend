import movieModel from "../models/movieModel.js";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

// controllers
export async function getHello(req, res) {
  return res.send({
    message: "Service is up",
  });
}

export async function getMovies(req, res) {

  // 1. get paginated list - 15 items a list
  // 2. if age < 18 no TV-MA rated movies
  let user = (await req.user)
  if(!user)
  {
    // not autheticated
    res.send({message: 'failed'}).status(401)
    return 
  }

      const page = parseInt(req.query.page)
      const limit = 15
      const age = (await req.user).age
      // console.log("session details " , await req.user , age)

      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      const results = {}
  
      if (endIndex < await movieModel.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }
      try {
        if(age < 18)
        {
          results.results = await movieModel.find(  { rating : {$ne: "TV-MA"} } ).limit(limit).skip(startIndex).exec()
        }
        else {
          results.results = await movieModel.find( ).limit(limit).skip(startIndex).exec()
        }
        res.send ( results)
      } catch (e) {
        res.status(500).json({ message: e.message })
      }


}


export async function register(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let age = parseInt(req.body.age);
  console.log(req.body)
  console.log(username, password, age);
  try {
    const userData = await userModel.create({ username, password, age });

    console.log(userData);

    res.send({
      message: "Success",
    });
  } catch (e) {
    console.log(e.message);

    res.send({
      message: "Failed",
    });
  }
}
