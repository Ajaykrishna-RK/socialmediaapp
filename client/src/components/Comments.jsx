import React, { useEffect, useState } from "react";
import UserImage from "./UserImage";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteCommentAction } from "../state/index";

function Comments({ userId, loggedInUserId, comment,index,postId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const main = palette.neutral.main;

  const primary = palette.primary.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;


  const deleteComment = async (commentId)=>{
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      const deletedData = await response.json()
      dispatch(deleteCommentAction({deleted:deletedData}))
      
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <div
        style={{
          justifyContent: "start",
          alignItems: "start",
          display: "flex",
        }}
      >
         <div 
         style={{cursor:"pointer"}}
          onClick={() => {

            navigate(`/profile/${userId}`);
            navigate(0);
          }}

         >
          <Typography sx={{fontSize:"12px",fontWeight:'bold'}}>{user.firstName}</Typography>
          <UserImage   image={user.picturePath} comment={true} />
        </div>
        <div>
        <Box >
    
        <Typography sx={{ color: main, mt: "25px", pl: "1rem" ,fontSize:"15px"}}>
          {comment.comments}
        </Typography>
      
      </Box>
        </div>
       
      </div>
      <div style={{justifyContent:"end",alignItems:"end",display:"flex"}}>
{loggedInUserId === comment.userId && (
          <Button  sx={{marginTop:'-30px'}} onClick={() => deleteComment(index)}>delete</Button>
        )}
  </div> 
         <Divider />
    </div>
  );
}

export default Comments;
