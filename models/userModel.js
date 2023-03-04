import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'

let user = mongoose.Schema( {

    username : {
        type: String,
        required: [true, "Failed to set email"],
        unique: true,
        lowercase: true, // convert email to lower case and then insert in database
        validate: [
          (userEmail) => {
            // validate :  ( validation function , error message )
            return validator.isEmail(userEmail);
          },
          " Pls enter valid email",
        ],
      },
    password : {
        type: String,
        required: [true, "Failed to set password"], // [value , 'error message']
        minlength: [8, "Minimum length is 8"],
      },
    age: { 
        type : Number,
        required : [true, "Failed to set age"],
        validate: [
            (age) => {
              // validate :  ( validation function , error message )
              return age > 0 && age < 130
            },
            " Pls enter valid age",
          ],
    }

})

user.pre("save", async function (next) {
    // we use normal function so we can access 'this' keyword
    const salt = await bcrypt.genSalt(); // get salt
    this.password = await bcrypt.hash(this.password, salt); // hash password // {salt}{password} eg. pass = Yzng76Password@123  // Yzng76 is salt
    next();
  });


export default mongoose.model('user', user)


