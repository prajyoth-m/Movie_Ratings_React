import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import axios from "axios";
import { CardContent, Stack } from "@mui/material";

class User {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: BigInteger;
  department: string;

  constructor(
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    phone: BigInteger,
    department: string
  ) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.department = department;
  }
}

export default function UsersCard() {
  const [state, setState] = React.useState({
    cardElevation: 2,
    users: Array<User>(),
  });

  const handleDeleteClick = (username: string) => {
    console.log("delete this user " + username);
  };

  React.useEffect(() => {
    axios.get("/user-services/users").then((res) => {
      let data = res.data;
      setState((s) => ({
        ...s,
        users: data.map(
          (usr: {
            username: string;
            firstname: string;
            lastname: string;
            password: string;
            email: string;
            phone: Uint8Array;
            department: string;
          }) => {
            return new User(
              usr.username,
              usr.firstname,
              usr.lastname,
              usr.password,
              usr.email,
              usr.phone,
              usr.department
            );
          }
        ),
      }));
    });
  }, []);

  return (
    <div>
      <div
        style={{
          marginLeft: "2rem",
          marginTop: "2rem",
          marginRight: "2rem",
          width: "100%",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "95%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <DirectionsIcon />
          </IconButton>
        </Paper>
      </div>
      <Stack
        direction="row"
        spacing={4}
        sx={{ marginTop: "2rem", marginLeft: "2rem" }}
      >
        {state.users.map((el, idx) => (
          <Card
            key={idx}
            sx={{
              minWidth: 300,
              boxShadow: 4,
              ":hover": {
                boxShadow: 20,
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {el.username.substring(0, 1).toUpperCase()}
                </Avatar>
              }
              action={
                <div>
                  <IconButton aria-label="edit">
                    <EditIcon fontSize="medium" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      handleDeleteClick(el.username);
                    }}
                  >
                    <DeleteRoundedIcon fontSize="medium" />
                  </IconButton>
                </div>
              }
              title={el.username + " " + el.lastname}
              subheader={el.department}
            />
            <CardContent>
              <ul>
                <li>
                  Phone:
                  {el.phone}
                </li>
                <li>Email: {el.email}</li>
                <li>Username: {el.username}</li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
}
