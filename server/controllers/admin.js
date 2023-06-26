import Post from "../model/PostModel.js";
import UUser from "../model/UserModel.js";

export const getAllUserDetails = async (req, res) => {
  try {
    const page = req.query.p || 0 
    let usersPerPage = 4 

    const AllUsers = await UUser.find().skip(page * usersPerPage).limit(usersPerPage)
    res.json(AllUsers);
  } catch (err) {}
};

export const getUserLength = async (req,res)=>{
  try{
    const usersLength = (await UUser.find()).length
    res.json(usersLength)
  }catch(err){

  }
}

// export const getUserById = async(req,res)=>{
//     try{

//     }catch(err){

//     }
// }

export const getAllUserPosts = async (req, res) => {
  try {
    const getUsersPosts = await Post.find();
    res.json(getUsersPosts);
  } catch (err) {}
};
