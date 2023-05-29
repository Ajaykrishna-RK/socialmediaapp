import mongoose from "mongoose";


const UUserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
   lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
 password:{
        type:String,
        required:true,
    },
 picturePath:{
        type:String,
      default : "",
    },
    friends:{
        type:Array,
      default : [],
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number
},
{timestamps : true}
)

const UUser = mongoose.model("UUser",UUserSchema)

export default UUser

