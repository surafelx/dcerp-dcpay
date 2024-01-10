export default {
  dataEndPoint: "https://agrisunethioopia.com/api/v1",
  meEndpoint: "https://agrisunethioopia.com/api/v1/auth/me",
  loginEndpoint: "https://agrisunethioopia.com/api/v1/auth/login",
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'dcPayrollToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}

