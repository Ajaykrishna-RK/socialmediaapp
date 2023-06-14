import Post from "../model/PostModel.js";
import UUser from "../model/UserModel.js";

// CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await UUser.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Read

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletePost = await Post.findByIdAndDelete(userId);
    res.status(200).json(deletePost);
    console.log(deletePost, "delete");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update like post

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatePost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
      },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const Comments = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comments,userId } = req.body;
    const post = await Post.findById(postId);

    post.comments.push({userId:userId,comments:comments});
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const DeleteComments = async (req, res) => {
  try {
    const { postId, commentId} = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

const deletedComment = post.comments.splice(commentId,1)
await post.save()
res.status(200).json(post.comments);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
