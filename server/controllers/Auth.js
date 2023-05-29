import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UUser from "../model/UserModel.js";

// Register User

export const Register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt  = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password,salt)

const newUser = new UUser({
    firstName,
    lastName,
    email,
    password:passwordHash,
    picturePath,
    friends,
    location,
    occupation,
    viewedProfile:Math.floor(Math.random() * 1000),
    impressions:Math.floor(Math.random() * 1000)
})

const savedUser = newUser.save()

res.json(savedUser)


} catch (err) {
res.status(500).json({error:err.message})
  }
};


// login


export const Login = async(req,res)=>{
try{
const {email,password}  = req.body

const user = await UUser.findOne({email:email})

if(!user) return res.status(400).json({message:"USer Does Not Exist"})

const isMatch = await bcrypt.compare(password,user.password)
if(!isMatch) return res.status(400).json({message:"invalid crendentials"})

const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
delete user.password

res.status(200).json({token,user})

}catch (err) {
res.status(500).json({error:err.message})
  }
}