import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer";
import helmet  from "helmet";
import morgan from "morgan";
import path from "path"
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import {  Register, updateUser } from "./controllers/Auth.js";
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import adminRoutes from "./routes/admin.js"
import {createPost} from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";
import Post from "./model/PostModel.js";
import UUser from "./model/UserModel.js";
import {users,posts} from "./data/index.js"

// middleware Configuration
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended : true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,"public/assets")))


// file Storage
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage})



// register Route With files

app.post("/auth/register",upload.single("picture"),Register)
app.patch("/auth/register/:userId",verifyToken,upload.single("picture"),updateUser)
app.post("/posts",verifyToken, upload.single("picture"),createPost)

// Admin

app.use("/admin",adminRoutes)
// ROUTES
app.use("/auth",authRoutes)


// user routes

app.use("/users",userRoutes)
app.use("/posts",postRoutes)

// mongoose Set up

const PORT = process.env.PORT || 6001

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=> console.log("Server Started"))

// Add Data One Time
// UUser.insertMany(users)
// Post.insertMany(posts) 
})
.catch((err)=>{
    console.log(err,"error :Data base not connected")
})