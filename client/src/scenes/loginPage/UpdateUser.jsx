import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

const registerSchema = yup.object().shape({});

function UpdateUser() {
  const { userId } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userData, setUserData] = useState(null);
  const theme = useTheme();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!userData) {
    return null;
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    picturePath,
    impressions,
    friends,
  } = userData;

  const initialValuesRegister = {
    firstName: firstName,
    lastName: lastName,
    // email: "",
    // password: "",
    location: location,
    occupation: occupation,
    picture: picturePath,
  };

  console.log(initialValuesRegister);
  const updateUserApi = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    // if (values.picture ) {
    // Only append the picture if a new image has been selected
    const variabe = new File(
      [values.picture?.name.split(".")[0]],
      values.picture?.name,
      {}
    );
    // formData.append("picturePath", values.picture);
    formData.append("picturePath", variabe);

    console.log(variabe, "updatefile");

    // }

    const savedUserResponse = await fetch(
      `http://localhost:3001/auth/register/${userId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    if (savedUserResponse.status === 400) {
      alert("Check the Entered Details");
      return;
    }

    console.log(userId, "update user");
    navigate("/home");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await updateUserApi(values, onSubmitProps);
    console.log(values, "==");
  };

  return (
    <>
      <Box>
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={
                        Boolean(touched.lastName) && Boolean(errors.lastName)
                      }
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      label="Location"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      name="location"
                      error={
                        Boolean(touched.location) && Boolean(errors.location)
                      }
                      helperText={touched.location && errors.location}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="Occupation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.occupation}
                      name="occupation"
                      error={
                        Boolean(touched.occupation) &&
                        Boolean(errors.occupation)
                      }
                      helperText={touched.occupation && errors.occupation}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <Box
                      gridColumn="span 4"
                      border={`1px solid ${palette.neutral.medium}`}
                      borderRadius="5px"
                      p="1rem"
                    >
                      <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                          setFieldValue("picture", acceptedFiles[0])
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.primary.main}`}
                            p="1rem"
                            sx={{ "&:hover": { cursor: "pointer" } }}
                          >
                            <input {...getInputProps()} />
                            {values.picture && (
                              <FlexBetween>
                                <Typography>
                                  {typeof values.picture === "string"
                                    ? values.picture
                                    : typeof values.picture.name === "string"
                                    ? values.picture.name
                                    : ""}{" "}
                                </Typography>
                              </FlexBetween>
                            )}
                          </Box>
                        )}
                      </Dropzone>
                    </Box>
                  </Box>
                  <Button
                    onClick={handleFormSubmit}
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
                    Save Changes
                  </Button>
                </form>
              </>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}

export default UpdateUser;
