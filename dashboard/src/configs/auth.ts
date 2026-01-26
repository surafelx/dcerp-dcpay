export default {
  dataEndPoint: "https://api.agrisunethiopia.com/api/v1",
  meEndpoint: "https://api.agrisunethiopia.com/api/v1/auth/me",
  loginEndpoint: "https://api.agrisunethiopia.com/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}

