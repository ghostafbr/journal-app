import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'The email must have an @.'],
  password: [
    (value) => value.length >= 6,
    'The password must have more than 6 characters',
  ],
  displayName: [(value) => value.length >= 1, 'The name is required.'],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmited, setformSubmited] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isChekingAuth = useMemo(() => status === 'checking', [status]);
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (evt) => {
    evt.preventDefault();
    setformSubmited(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title='Register'>
      <h1>FormValid {isFormValid ? 'Valid' : 'Bad'}</h1>
      <form
        onSubmit={onSubmit}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Full name'
              type='text'
              placeholder='full name'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='email'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='password'
              type='password'
              placeholder='********'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            ></TextField>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
            display={!!errorMessage ? '' : 'none'}
          >
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                disabled={isChekingAuth}
                type='submit'
                variant='contained'
                fullWidth
              >
                Create account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
