import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogOut, setSearched, clearState } from "../../state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { useEffect, useState } from "react";
import SearchWidget from "../../scenes/widgets/SearchWidget";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const searchPost = useSelector((state) => state.searchPost);

  const isNonMobileScreens = useMediaQuery("(min-width : 1000px)");

  const theme = useTheme();

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullname = `${user?.firstName}`;

  const token = useSelector((state) => state.token);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(false);
  //   const SearchResults = async () => {
  //     const response = await fetch(
  //       `http://localhost:3001/users/search/${search}`,
  //       {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //    const data  = await response.json()
  //   dispatch( setSearched({
  //  searchPost:data
  //   }) )

  //   };

  const SearchResults = async () => {
    try{
      const response = await fetch(
        `http://localhost:3001/users/search/${search}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(
        setSearched({
          searchPost: data,
        })
      );
    }catch(err){
      console.log(err)
    }
 
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setData(true);
  };

  return (
    <div>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem,2rem,2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              ":hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            Social Gram
          </Typography>

          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase
                value={search}
                onChange={handleSearch}
                placeholder="search..."
              />

              <IconButton onClick={SearchResults}>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            {/* <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} /> */}
            <FormControl variant="standard" value="hai">
              <Select
                value={fullname}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullname}>
                  <Typography>{fullname}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogOut())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <div>
   {!isMobileMenuToggled && <IconButton
          onClick={() => setIsMobileMenuToggled(true)}
        >
          <Menu />
        </IconButton> }
          </div>
       
        )}
        {/* mobile menu */}

        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* Close Icon */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(false)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* menu Items */}

            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
        
              <FormControl variant="standard" value="hai">
                <Select
                  value="hello"
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullname}>
                    <Typography>{fullname}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogOut())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>

      {data && search && <SearchWidget searchPost={searchPost} />}
    </div>
  );
};
export default Navbar;
