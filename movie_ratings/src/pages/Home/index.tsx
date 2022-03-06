import './style.css';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { FormControl, TextField } from '@mui/material';

export function HomePage() {
  const history = useHistory();
  const [state, setState] = React.useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop: any) => (event: any) => {
    setState({ ...state, [prop]: event.target.value });
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

  const handleLogin = () => {
    let username = state.username;
    let password = state.password;
    console.log(username,password);
    history.push("/users");
  }

  return (
    <Card sx={{ width: "25%", margin: "auto", marginTop: "200px" }} elevation={3}>
      <CardContent>
        <Typography sx={{ fontSize: 24, textAlign: "center", borderBottom: "1px solid", paddingBottom:"14px" }} color="text.secondary" gutterBottom>
          Login
        </Typography>

        <TextField id="outlined-basic" label="Username" fullWidth sx={{ marginTop: "2rem" }} value={state.username} onChange={handleChange('username')} />
        <FormControl sx={{ marginTop: "2rem" }} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={state.showPassword ? 'text' : 'password'}
            value={state.password}
            onChange={handleChange('password')}
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
      </CardContent>
      <CardActions>
        <Button size="large" variant='contained' sx={{ marginBottom: "1rem" }} fullWidth onClick={handleLogin}>Login</Button>
      </CardActions>
    </Card>
  );
}
