export default {
  dataEndPoint: "https://surafel.work/api/v1",
  meEndpoint: "https://surafel.work/api/v1/auth/me",
  loginEndpoint: "https://surafel.work/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}

