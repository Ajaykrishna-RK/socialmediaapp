import { Button, IconButton, InputBase, Typography, useTheme } from '@mui/material'
import FlexBetween from '../components/FlexBetween'
import React from 'react'
import WidgetWrapper from '../components/WidgetWrapper'
import { DarkMode, LightMode, Search } from '@mui/icons-material'
import { setAdminLogOut, setMode } from '../state/index'
import { useDispatch } from 'react-redux'
import UsersList from './UsersList'

function AdminPage() {
    const dispatch = useDispatch()

    const theme = useTheme();

    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

  return (
    <div>

<FlexBetween padding="1rem 6%" backgroundColor={alt}>
    
    <Typography  
    
    fontWeight="bold"
  variant='h4'
    color="primary"
    sx={{
      ":hover": {
        color: primaryLight,
        cursor: "pointer",
      },
    }}>
  SocialGram Admin Page
    </Typography> 
    <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            
            >
              <InputBase
               background={neutralLight}
                placeholder="search..."
              />

              <IconButton >
                <Search />
              </IconButton>
      

            </FlexBetween>
            <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            </FlexBetween>

    <Button onClick={()=>dispatch(setAdminLogOut())}>
        Logout
    </Button>
   

</FlexBetween>


<UsersList/>

    </div>
  )
}

export default AdminPage