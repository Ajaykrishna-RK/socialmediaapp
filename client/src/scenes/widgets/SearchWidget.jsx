import React from 'react'
import WidgetWrapper from "../../components/WidgetWrapper";
import { Box, Typography,useTheme } from '@mui/material';
import Friend from '../../components/Friend';


function SearchWidget({searchPost}) {
    const { palette } = useTheme();
  return (
    <>
    
    
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
     Results
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {searchPost ? (
            <>
{ searchPost.map((results) => (
    <Friend
      key={results._id}
      friendId={results._id}
      name={`${results.firstName} ${results.lastName}`}
      subtitle={results.occupation}
      userPicturePath={results.picturePath}
    />
  ))}
  </>
        ) :(
            <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: "1.5rem" }}
          >
         Results
          </Typography>
        )}
      
      </Box>
    </WidgetWrapper>
    
    
    
    
    
    
    
    
    </>
  )
}

export default SearchWidget