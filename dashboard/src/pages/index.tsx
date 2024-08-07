
// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = () => {
  return '/apps/dashboard/overview'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  if (auth.user && auth.user.role) {
    const homeRoute = getHomeRoute()

    // Redirect user to Home URL
    router.replace(homeRoute)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps


  return <Spinner sx={{ height: '100%' }} />
}

export default Home
