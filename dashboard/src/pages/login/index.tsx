// ** React Imports
import { useState, ReactNode } from 'react'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Next Imports
import Link from 'next/link'


import CardContent from '@mui/material/CardContent'

// import DialogSetupApp from 'src/views/dc-pay/setup-dialog/DialogSetupApp'


// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'



// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const schema = yup.object().shape({
  email: yup.string().email('Email must be a valid email.').required('Email is a required field.'),
  password: yup.string().required('Password is required.')
})


const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const defaultValues = {
  password: '',
  email: ''
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [rememberMe,] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [generalError, setGeneralError] = useState<any>('')

  // ** Hooks
  const auth = useAuth()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    console.log('is Submitting')
    auth.login({ email, password, rememberMe }, (error: any) => {
      if (error?.response?.data?.errors[0].param == 'password' && error?.response?.data?.errors[0].msg !== 'Invalid Email or Password.') {
        setError('password', {
          type: 'manual',
          message: `${error?.response?.data?.errors[0].msg || 'Email or Password is Invalid.'}`
        })
      }
      if (error?.response?.data?.errors[0].param == 'email' && error?.response?.data?.errors[0].msg !== 'Invalid Email or Password.') {
        setError('email', {
          type: 'manual',
          message: `${error?.response?.data?.errors[0].msg || 'Email or Password is Invalid.'}`
        })
      }

      if (error?.response?.data?.errors[0].msg == 'Invalid Email or Password.') {
        setGeneralError('Invalid Email or Password.')
      }

    })
  }


  return (
    <Box className='content-center' sx={{ background: `url('/images/pages/background.png') center center/cover no-repeat fixed`, minHeight: '100vh' }}>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(12, 9, 8)} !important` }}>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img alt="DDFC Logo" height='100' src="/images/logos/ddfc.png" />
              </div>
              <div>
                <Typography
                  variant='h6'
                  sx={{
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '1.2rem !important',
                    textAlign: 'center'
                  }}
                >

                  Dire Dawa Food Complex S.Co
                </Typography>
              </div>
            </div>

          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              sx={{
                textAlign: 'center'
              }}
              variant='body2'>Enter your email and password to login.</Typography>
          </Box>

          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label='Email'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='admin@asuns.org'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon icon='mdi:account-outline' />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              {errors.email && <Alert sx={{ my: 4 }} severity='error'>{errors.email.message}</Alert>}
            </FormControl>
            <FormControl sx={{ mb: 4 }} fullWidth>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Password
              </InputLabel>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label='Password'
                    placeholder='●●●●●●●●'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    startAdornment={
                      <InputAdornment position='start'>
                        <Icon icon='mdi:lock-outline' />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />

              {errors.password && <Alert sx={{ my: 4 }} severity='error'>{errors.password.message}</Alert>}
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <LinkStyled href='/pages/auth/forgot-password-v1'>Forgot Password?</LinkStyled>
            </Box>
            {generalError && <Alert sx={{ my: 4 }} severity='error'>{generalError}</Alert>}
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
              Login
            </Button>
          </form>
          <Box sx={{ mb: 6, display: 'flex', gap: '5px', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
            <Typography
              sx={{
                textAlign: 'center'
              }}
              variant='body2'>Powered by</Typography>
            <img alt="Asun Logo" height="25px" src="/images/logos/asun-logo.png" />
          </Box>

        </CardContent>
      </Card>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage