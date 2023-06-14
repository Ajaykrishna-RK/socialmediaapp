import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { setPost, setDeleted, setComments, deleteCommentAction } from "../../state/index";
import Comments from "../../components/Comments";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  id,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [addComments, setAddComments] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [deletedComment,setDeletedComment] = useState('')
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const post = useSelector((state) => state.posts);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/comments/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comments: commentData ,userId:loggedInUserId}),
        }
      );
      const comments = await response.json();
      dispatch(setComments({ comments: comments }));
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
   
  };

  const DeletePost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const deletedData = await response.json();
      dispatch(setDeleted({ deleted: deletedData }));
    } catch (err) {
      console.log(err);
    }
  };





  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      <Box
        sx={{ display: "flex", alignItems: "right", justifyContent: "right" }}
      >
        {id === postUserId ? (
          <IconButton onClick={DeletePost}>
            <DeleteIcon />
          </IconButton>
        ) : (
          ""
        )}
      </Box>

      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box>
          {addComments ? (
            <Box>
              <form onSubmit={handleCommentSubmit}>
                <InputBase
                  placeholder="Add Comments"
                  onChange={(e) => setCommentData(e.target.value)}
                />
                <Button type="submit">Add</Button>
              </form>
            </Box>
          ) : (
            <Button onClick={() => setAddComments(true)}>Add Comments</Button>
          )}
          <Box mt="0.5rem" >
            {comments.map((comment, i) => (
              
  
  <Comments userId={comment.userId} loggedInUserId={loggedInUserId} comment={comment} index={i} postId={postId}/>
            
            ))}
            <Divider />
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
