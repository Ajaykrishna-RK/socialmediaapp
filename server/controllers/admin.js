import Post from "../model/PostModel.js"
import UUser from "../model/UserModel.js"


export const getAllUserDetails = async (req,res)=>{

    try{
const AllUsers = await UUser.find()
res.json(AllUsers)
    }catch(err){

    }


}


// export const getUserById = async(req,res)=>{
//     try{


//     }catch(err){

//     }
// }



export const getAllUserPosts = async (req,res)=>{
    try{
const getUsersPosts = await Post.find()
res.json(getUsersPosts)
    }catch(err){

    }
}

