import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import UserImage from "../components/UserImage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UsersList() {
  const adminToken = useSelector((state) => state.adminToken);
  const admin = useSelector((state) => state.admin);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  const [userDetails, setUserDetails] = useState();
  const [userLength, setUserLength] = useState();
  const [paginationCount,setPaginationCount] = useState(0)
  console.log(paginationCount,'=')

  const fetchAllusers = async () => {
    const response = await fetch(`http://localhost:3001/admin/users?p=${paginationCount}`, {
      method: "GET",
      headers: { AdminAuth: `Bearer ${adminToken}` },
    });
    const datas = await response.json();
    setUserDetails(datas);
  };

  const fetchUsersLength = async () => {
    const response = await fetch(`http://localhost:3001/admin/users/length`, {
      method: "GET",
      headers: { AdminAuth: `Bearer ${adminToken}` },
    });
    const datas = await response.json();
    setUserLength(datas);
  };

  useEffect(() => {
    fetchUsersLength()
    fetchAllusers();
  }, [paginationCount]);

  return (
    <div>
      <Box m={3}>
      <h3 style={{textAlign:"end"}}> <span style={{fontWeight:"lighter"}}>Number of Users :</span>  {userLength}</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell>Image</TableCell>
                <TableCell>FirstName</TableCell>
                <TableCell>LastName</TableCell>
                <TableCell>Email</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {userDetails && userDetails.map((userDetail) => (
                <TableRow
                  key={userDetail._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                <TableCell>  <Link> { <UserImage image={userDetail.picturePath}/>}</Link></TableCell>
           
              
                  <TableCell>{userDetail.firstName} </TableCell>
                  <TableCell>{userDetail.lastName}</TableCell>
                  <TableCell>{userDetail.email}</TableCell>
             
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{justifyContent:"end",alignItems:"end",display:"flex"}}>
        
     {paginationCount === 0 ? <Button onClick={()=>setPaginationCount(paginationCount  - 1)} disabled>previous</Button> :<Button onClick={()=>setPaginationCount(paginationCount  - 1)}>previous</Button>  }   
     {userDetails && userDetails.length === 0 ?  <Button onClick={()=>setPaginationCount(paginationCount +1)} disabled>next</Button>:  <Button onClick={()=>setPaginationCount(paginationCount +1)}>next</Button>}     
        </Box>
      </Box>
    </div>
  );
}

export default UsersList;
