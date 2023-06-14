import { Box } from "@mui/material";

const UserImage = ({image,size = "60px",comment})=>{
    return(
        <>
      

        {comment ?   <Box width={40} height={40} >
            <img 
            style={{objectFit:"cover",borderRadius:"50%"}}
            width={30}
            height={30}
            src={`http://localhost:3001/assets/${image}`} alt=""/>

        </Box> :   
          <Box width={size} height={size} >
            <img 
            style={{objectFit:"cover",borderRadius:"50%"}}
            width={size}
            height={size}
            src={`http://localhost:3001/assets/${image}`} alt=""/>

        </Box>  }
        </>
       


    )
}

export default UserImage
