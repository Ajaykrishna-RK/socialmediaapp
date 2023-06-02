import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material"
import Navbar from "../navbar/index"
import { useSelector } from "react-redux";
import UserWidget from "../../scenes/widgets/UserWidget";
import MyPostWidget from "../../scenes/widgets/MyPostWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget";
import FriendListWidget from "../../scenes/widgets/FriendListWidget";
import AdvertWidget from "../../scenes/widgets/AdvertWidget";


const HomePage = ()=>{ 
  const [user, setUser] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const token = useSelector((state) => state.token);
  const { _id} = useSelector((state) => state.user);










    return(
      <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id}  />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? "-1.7rem" : "2rem"}
        >
          {/* <MyPostWidget picturePath={picturePath} /> */}
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )} 
       
      </Box>
    </Box>
    )
}
export default HomePage