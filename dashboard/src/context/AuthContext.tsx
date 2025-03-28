// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  navigation: null,
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [navigation, setNavigation] = useState<UserDataType | null>(defaultProvider.navigation)
  const [loading, setLoading] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      try {
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
        if (storedToken) {
          await axios
            .get(authConfig.meEndpoint, {
              headers: {
                Authorization: storedToken
              }
            })
            .then(async (response: any) => {
              window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
              setUser({ ...response.data.userData })
              setNavigation(response.data.navigation)
            })
            .catch(() => {
              setUser(null)
              window.localStorage.removeItem('userData')
              window.localStorage.removeItem(authConfig.storageTokenKeyName)
              router.replace('/login')
              window.localStorage.removeItem('refreshToken')
              window.localStorage.removeItem('accessToken')
              setUser(null)
              if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
                router.replace('/login')
              }
              router.replace('/login')
            })
        } else {
          setLoading(false)
        }
      } catch (err) {
        console.log("Authorization", err)
      }

    }
    initAuth()
  }, [router])



  const values = {
    user,
    navigation,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

