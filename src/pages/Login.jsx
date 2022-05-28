import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { setAuth } from '../state/slices/appSlice';
import LoginGif from '../assets/images/LoginGif.gif';

const formValidationSchema = Yup.object({
  username: Yup.string().required('Required!'),
  password: Yup.string().required('Password Required!'),
});
function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  const loginForm = useFormik({
    initialValues: {
      username: 'Hello',
      password: 'Hello',
      hidden: true,
    },
    onSubmit: () => {
      if (loginForm?.values?.username === 'Hello' && loginForm?.values?.password === 'Hello') {
        dispatch(
          setAuth({
            isLoggedIn: true,
          }),
        );
        enqueueSnackbar('Login successfully', {
          variant: 'success',
        });
      }
    },
    validationSchema: formValidationSchema,
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [isLoggedIn]);
  const [values, setValues] = useState(loginForm.initialValues);
  const handleClickShowPassword = () => {
    setValues({ ...values, hidden: !values.hidden });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const intputStyle = {
    backgroundColor: (theme) => theme.palette.common.white,
    borderRadius: 1,
  };
  return (
    <Grid
      container
      direction="row"
      sx={() => ({
backgroundColor: '#4de6d8',
        height: { md: '100vh', xs: 'none' },
      })}
    >
      <Grid xs={12} flexGrow={1} display="flex" ml={7} mt={3}>
        {/* <img height="50px" width="120px" src={} alt=" logo" /> */}
      </Grid>
      <Grid
          item
          xs={12}
          md={7}
          height={500}
          ml={25}
      >
        <img height="110%" width="80%" src={LoginGif} alt="gears" />
      </Grid>
        <Grid
        md={3}
        xs={12}
        sx={{
          backgroundColor: '#0bb7a7',
          borderRadius: 2,
          maxHeight: 350,
          padding: 8,
          mt: 15,
        }}
        >
            <Grid item xs={12} display="flex" justifyContent="center" mb={8}>
              <Typography
                sx={{ fontWeight: 'bold' }}
                color="white"
                variant="h5"
                noWrap
              >
                Sign In
              </Typography>
            </Grid>
            <Grid item xs={12} mb={8}>
              <TextField
              sx={intputStyle}
                id="username"
                type="text"
                size="small"
                name="username"
                variant="outlined"
                placeholder="Username"
                fullWidth
                error={loginForm?.errors?.username && loginForm?.touched?.username}
                value={loginForm?.values?.username}
                helperText={loginForm?.errors?.username}
                onChange={loginForm?.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} mb={12}>
              <TextField
              sx={intputStyle}
                variant="outlined"
                id="outlined-password"
                fullWidth
                size="small"
                type={values?.hidden ? 'password' : 'text'}
                name="password"
                value={loginForm?.values?.password}
                onChange={loginForm?.handleChange}
                error={loginForm?.touched?.password && loginForm?.errors?.password}
                helperText={loginForm?.errors?.password}
                placeholder="Password"
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className="icon"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.hidden ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                sx={{
                  padding: (theme) => theme.spacing(1, 8, 1, 8),
                  backgroundColor: '#0bb7a7',
                }}
                color="primary"
                type="submit"
                variant="contained"
                onClick={() => loginForm.handleSubmit()}
              >
                Login
              </Button>
            </Grid>
        </Grid>
    </Grid>
  );
}
export default Login;
