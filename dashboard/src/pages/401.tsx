// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

import { useAuth } from 'src/hooks/useAuth'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))


const Error404 = () => {
  const [isLoading, setIsLoading] = useState(true);

  // ** Hooks
  const auth = useAuth()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timeoutId);
  }, []);


  return (
    <>
      {isLoading ? (
        <Spinner />
      ) :
        (
          <>
            <Box className='content-center'>
              <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <BoxWrapper>
                  <Typography variant='h1'>401</Typography>
                  <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
                    You are not authorized! 🔐
                  </Typography>
                  <Typography variant='body2'>You don&prime;t have permission to access this page. Go Home!</Typography>
                </BoxWrapper>
                <Img height='487' alt='error-illustration' src='/images/pages/401.png' />
                <Button onClick={() => auth.logout()} href='/apps/dashboard/overview/' component={Link} variant='contained' sx={{ px: 5.5 }}>
                  Back to Login
                </Button>
              </Box>
              <FooterIllustrations />
            </Box>
          </>

        )
      }
    </>

  )
}

Error404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error404
