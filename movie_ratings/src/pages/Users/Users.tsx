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
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CardContent,
  FormControl,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

class User {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: number;
  department: string;

  constructor(
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    phone: number,
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UsersCard() {

  const history = useHistory();

  const [state, setState] = React.useState({
    cardElevation: 2,
    username: "",
    firstname: "",
    lastname: "",
    showPassword: false,
    password: "",
    email: "",
    department: "",
    phone: 0,
    users: Array<User>(),
    departments: Array<string>(),
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleClose = (method: string) => {
    if (method === "save") {
      let user = new User(
        state.username,
        state.firstname,
        state.lastname,
        state.password,
        state.email,
        state.phone,
        state.department
      );
      axios.post("/user-services/user", user).then((res) => {
        if (res.data.success) {
          refresh();
        }
      });
    }
    setOpen(false);
  };

  const handleDeleteClick = (username: string) => {
    axios.delete("/user-services/user/" + username).then((res) => {
      if (res.data.success) {
        refresh();
      }
    });
  };

  const handleChange = (prop: any) => (event: any) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleDeptChange = (event: SelectChangeEvent) => {
    setState({ ...state, department: event.target.value as string });
  };

  const refresh = () => {
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
            phone: number;
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
  };

  React.useEffect(() => {
    refresh();
    axios.get("/department-services/department").then((res) => {
      setState((s) => ({
        ...s,
        departments: res.data.map((dept: { department: any }) => {
          return dept.department;
        }),
      }));
    });
  }, []);

  const redirect = (val: any) => {
    history.push(val);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Users Management
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{
          paddingLeft: "2rem",
          marginTop: "2rem",
          width: "96%",
        }}
      >
        <Paper
          component="form"
          sx={{
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
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: "7rem", right: "3.5rem" }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Want to add a new user?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please provide the below details to add a user.
          </DialogContentText>
          <TextField
            id="outlined-basic"
            label="Username"
            fullWidth
            sx={{ marginTop: "2rem" }}
            value={state.username}
            onChange={handleChange("username")}
          />
          <TextField
            id="outlined-basic"
            label="Firstname"
            fullWidth
            sx={{ marginTop: "2rem" }}
            value={state.firstname}
            onChange={handleChange("firstname")}
          />
          <TextField
            id="outlined-basic"
            label="Lastname"
            fullWidth
            sx={{ marginTop: "2rem" }}
            value={state.lastname}
            onChange={handleChange("lastname")}
          />
          <TextField
            id="outlined-basic"
            label="E-Mail ID"
            fullWidth
            sx={{ marginTop: "2rem" }}
            value={state.email}
            onChange={handleChange("email")}
          />
          <TextField
            id="outlined-basic"
            label="Phone Number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
            sx={{ marginTop: "2rem" }}
            value={state.phone}
            onChange={handleChange("phone")}
          />
          <FormControl sx={{ marginTop: "2rem" }} variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={state.showPassword ? "text" : "password"}
              value={state.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: "2rem" }}>
            <InputLabel id="demo-simple-select-label">Title</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.department}
              label="Title"
              onChange={handleDeptChange}
            >
              {state.departments.map((el, idx) => (
                <MenuItem value={el} key={idx}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("cancel")}>Cancel</Button>
          <Button onClick={() => handleClose("save")}>Save</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
        <BottomNavigation
          showLabels
          onChange={(event, newValue) => {
            redirect(newValue);
          }}
        >
          <BottomNavigationAction label="Users" value="/users" icon={<GroupIcon />} />
          <BottomNavigationAction label="Movies" value="/movies" icon={<MovieIcon />} />
          <BottomNavigationAction label="Logout" value="/" icon={<LogoutIcon />} />
        </BottomNavigation>
      </Box>
    </div>
  );
}
