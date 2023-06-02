import React from 'react'
import { setAdminLogin } from '../../state/index';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Formik } from 'formik';

import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const adminSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  });


  const initialValues = {
    email: "",
    password: "",
  };

function AdminLogin() {
const dispatch = useDispatch()
const navigate = useNavigate()
const admin  = useSelector((state)=>state.admin)
console.log(admin,"adi")

    const AdminLogin = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:3001/auth/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
       
       
        onSubmitProps.resetForm();
        if (loggedIn) {
          dispatch(
            setAdminLogin({
              admin: loggedIn.admin,
              adminToken: loggedIn.Admintoken,
            })
          );
          navigate("/admin/page");
        }
      };

const handleFormSubmit = async(values,onSubmitProps) =>{
   await AdminLogin(values,onSubmitProps)
}


      const { palette } = useTheme();
const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <div>


<Box>
     <Box width="100%" backgroundColor={palette.background.alt}
            p="1rem 6%"
            textAlign="center"
            >
            <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
        
          >
            Sociopedia
          </Typography>
            </Box>
           <Box width={isNonMobileScreens ? "50%" :"93%"}
           p="2rem"
           m="2rem auto"
           borderRadius="1.5rem"
           backgroundColor={palette.background.alt}
           >
<Typography fontWeight="500" variant="h5" sx={{mb:"1.5rem"}}>
Welcome to AdminPage of Socipedia
</Typography>

<Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={adminSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
       
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
           

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
         LOGIN
            </Button>
           
          </Box>
        </form>
      )}
    </Formik>
           </Box>



        </Box>


    














    </div>
  )
}

export default AdminLogin