import UUser from "../model/UserModel.js";

// Read

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UUser.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UUser.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => UUser.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// update / add or remove friend

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await UUser.findById(id);
    const friend = await UUser.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => UUser.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


// Search Users 

export const SearchUser = async(req,res) =>{
try{
  let data = await UUser.find({
    "$or":[
      {firstName:{$regex:req.params.key}}
    ]
  })

  res.status(200).json(data);

}catch(err){
  res.status(404).json({ message: err.message });
}

}