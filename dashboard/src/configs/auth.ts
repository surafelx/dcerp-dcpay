export default {
  dataEndPoint: "htpps://tomari.media/api/v1",
  meEndpoint: "htpps://tomari.media/api/v1/auth/me",
  loginEndpoint: "htpps://tomari.media/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}

